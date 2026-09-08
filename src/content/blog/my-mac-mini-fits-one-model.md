---
title: "My Mac mini fits one model. I run five."
seoTitle: "My Mac mini fits one model. I run five."
description: "How a small OpenAI-compatible router lets one 48GB M4 Pro Mac mini safely serve several otherwise mutually exclusive local models."
pubDate: "2026-09-07T17:00:00.000+01:00"
slug: "my-mac-mini-fits-one-model"
categories: ["AI", "Infrastructure"]
tags: ["local llm", "Apple Silicon", "oMLX", "Python", "homelab"]
draft: false
---

# My Mac mini fits one model. I run five.

My local LLM server has five useful models. The Mac mini can only hold one of the large ones at a time.

That is why there is a router in front of it.

The machine is an M4 Pro Mac mini with 48GB of RAM. oMLX runs on port 8000. Model files sit on a Thunderbolt SSD. The prefix cache stays on the internal disk, where the smaller latency-sensitive reads belong. Once a model is loaded, its weights are in RAM either way.

The router is a second service on port 8010. My laptop, phone and scheduled jobs use that address. It is about 200 lines of stdlib Python. A client asks for a model. The router makes sure the requested large model is the one oMLX can serve, then passes the request through.

Without it, a picker can advertise models that this machine cannot actually use.

## 48GB is not 48GB

macOS does not let Metal wire all 48GB. On this machine, the Metal cap is 37.44GB. oMLX refuses to start a prompt above 90% of that ceiling, leaving a working budget of about 33GB.

The default, Qwen3.6-35B-A3B at 4-bit, is 19.08GB and stays pinned. That leaves roughly 14GB for another model.

For months I had seven models in the picker. Four of them could not serve a prompt:

| Model | Size | What happened |
|---|---|---|
| gemma-4-26b 8-bit | 27.34GB | 507, projected 46.42GB |
| gemma-4-31B | 21.87GB | 507, projected 40.95GB |
| Qwen3.6-35B-A3B 6-bit | 27.55GB | 507, zero successful requests ever |
| Qwen3-Coder-30B-A3B | 16.80GB | Loaded, then rejected every prompt |

The Coder failure was the worst one. It loaded, held 16GB of wired memory, then the prefill guard rejected the first prompt. A failed request left the machine carrying a model until something evicted it.

The default model had served 85% of 9,398 lifetime requests. That was less a preference and more of "the only model that reliably answered" 😂.

I considered raising [`iogpu.wired_limit_mb`](https://osxdaily.com/2025/05/07/how-to-increase-vram-allocation-on-apple-silicon-mac/). Published guidance for a 48GB Mac suggests 40GB, leaving 8GB for the OS. The measurement on this machine made that a bad idea:

```
free 0.1GB
compressed 28.4GB
swap 12.3GB used of 13.3GB
```

Two large models had 35.67GB of weights resident, technically below the cap, and the machine was already under memory pressure. Raising the wired limit does not add RAM. It allows more memory to become wired, which cannot be paged out. I left `iogpu.wired_limit_mb` at 0.

The limit is real. The router i mentioned exists because of it.

## The router has one job

oMLX does not evict a large model to make room for another. I tested the obvious workaround too. Unpinning the default did not help: oMLX loaded both models, memory reached 35.02GB, and the prefill guard rejected the prompt.

The router puts switching in the request path, where every client can use it.

It is an OpenAI-compatible pass-through. It relays every method and path. For model-bearing inference requests, it reads `model`. Prompts, tool calls, response formats, headers and streaming go upstream as received.

It does not choose a model, balance traffic, cache completions, retry requests or enforce policy. Clients still choose. The router only handles the part oMLX will not: making the selected large model resident before forwarding the original request.

The list of switchable models is deliberately small. The large models are mutually exclusive. The fast Qwen3-4B and the Gemma 4 12B vision model stay outside that logic.

When a request names the already-active large model, it goes straight through. When it names another one, the router takes a swap lock, waits for the outgoing model to be safe to remove, unpins and unloads it, pins the requested model, and forwards the untouched request. oMLX loads the newly pinned model while serving it.

Switching costs a model load, about 6 to 8 seconds. A request for the active model adds nothing measurable.

## The lifecycle mattered more than the swap

The first version unloaded the outgoing model immediately. A second client switching models during a long generation made oMLX abort the first request:

`Aborted 2 requests: model is being unloaded`

That is unacceptable on a machine used from more than one place.

The router now counts in-flight requests by model. A swap waits for the outgoing model to drain, checking again as requests finish. It waits for up to 15 minutes, logs a warning, then proceeds rather than waiting forever. The timeout is a known failure mode, not a claim that concurrent requests are solved.

I tested this with a 600-token generation and a competing switch six seconds later. The running generation completed all 600 tokens. The swap ran afterwards. Both requests succeeded.

That drain rule is the important part of the build. Unload and load are easy. Deciding when it is safe to unload is the actual work.

The [router, launchd plist and deployment notes are public](https://gist.github.com/mplacona/ca785647c4b94404ab4078a58bbf4b47). They are useful handoff material for a person, or an AI agent, configuring a compatible oMLX machine. It is not a one-shot setup. The target machine still needs inspecting; its exact model IDs need checking through `/v1/models`; and `OMLX_BIG_MODELS` should contain only the large models that cannot coexist. Every client needs to use the router. Authentication and network boundaries still belong to the machine's owner and need preserving or configuring locally.

## Every route has to use it

The router only helps requests that reach port 8010. I found the other failure modes by leaving routes around it.

First, the proxy worked on localhost but timed out over Tailscale. The macOS firewall allow-list named a Homebrew Python 3.14.6 path. Homebrew updated to 3.14.7 and that path changed. The router now runs under `/usr/bin/python3`, which is already allow-listed and does not move. Keeping it stdlib-only made that change simple.

Then an HTTPS forwarding rule for my phone still pointed straight at oMLX. The client URL did not change, but the upstream target did. A request for a non-resident large model could finally take the same route as every other client.

I also repointed [Hermes](https://hermes-agent.nousresearch.com/), [Hindsight](https://hindsight.vectorize.io/) and the scripts that call the local server. The router needs to sit in front of all the traffic that expects model switching.

The server still listens directly on port 8000, so bypassing the router remains possible. Nothing I use is currently doing it. Moving the server behind a localhost-only listener would be a stricter version of the boundary, but changing the oMLX port through its live admin API caused an outage. I am not treating that as a casual cleanup.

## Why keep the other large models?

The default is still Qwen3.6-35B-A3B at 4-bit. In a warm, single-model test with the same 250-token prompt, it sustained about 48 tok/s. Qwen3.8-27B with MTP sustained about 22 tok/s. The 35B is faster here because it is MoE and activates about 3B parameters per token.

That makes it a good default. Qwen3.8 and Qwen3-Coder still need a clean way to become resident when I explicitly ask for them. The router gives them that without leaving two large models fighting for memory.

Benchmarks were useful mostly for removing bad options. Short generations flattered multi-token prediction: Qwen3.8 reported 63.7 tok/s on a 128-token reply and about 22 tok/s on a 220-token reply. A cold-load run once calculated to 646 tok/s. Neither number describes normal use.

## The other number I watch

Prefill is 47% of compute time on this server: 26.6 hours reading prompts, against 30.3 hours generating replies.

The prefix cache has a 66% hit rate. A repeated long prompt has returned 87 times faster. That has had more effect on the setup than a model swap. I have not tested ANE prefill yet.

## Where it landed

Five models in the picker. One large model resident. One router in the path for every client I use.

I did not add RAM or defeat the guard. I made model switching explicit, put it behind one small boundary, and tested what happens when a request is still running or a client takes the wrong route.

## Get the router

The code, launchd plist and setup notes are in [the public `omlx-router` gist](https://gist.github.com/mplacona/ca785647c4b94404ab4078a58bbf4b47). It is a usable starting point for a compatible oMLX machine, but check its model IDs, authentication and network boundaries before putting it in front of your own server.
