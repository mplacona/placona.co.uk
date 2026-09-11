---
title: "My local agent spent a quarter of its context before I said anything"
seoTitle: "Local Agent Context Audit: 9,700 Tokens Recovered"
description: "A measured audit of local coding-agent startup context: tool definitions, prefix caching, response reserve and the 9,700 tokens I recovered."
pubDate: "2026-09-11T16:46:00.000Z"
slug: "local-agent-context-audit"
categories: ["Technology"]
tags: ["local-llm", "coding-agents", "context-window", "homelab"]
draft: false
---

# My local agent spent a quarter of its context before I said anything

I opened a fresh session against my local model and looked at the context meter. Eighteen thousand tokens used. I had not typed a word.

Add the buffer the agent reserves for its own reply and a quarter of the window was gone at rest.

On a hosted frontier model I would never have looked. The window is enormous, the preamble is somebody else's problem, and a cached prefix is billed at a discount. None of that is true on my own hardware.

This is the same Mac mini I wrote about [when I put a router in front of it](https://placona.co.uk/my-mac-mini-fits-one-model/). The constraints that made a router necessary also make a fat preamble expensive.

## Context is not free on your own silicon

Three things cost you, and none of them show up as a bill.

**The window is what the machine allows.** My default model runs a 131k context. That is not a product tier I can upgrade. The weights are 19.08GB pinned into a Metal budget of about 33GB, and the KV cache for a long conversation grows into what is left. Context length and model choice are drawing on the same pool.

**Prefill is real compute.** On this server, reading prompts is 47% of total compute time: 26.6 hours of prefill against 30.3 hours of generation. A preamble is not a number on a meter. It is work the GPU does.

**You pay it every turn.** The system preamble is the most-repeated text in your entire workload. Whatever it costs, multiply by every request you will ever make.

That third one is what got me. An 18k preamble is not an 18k problem. It is 18k times every turn, forever, on a machine that is already spending half its life reading prompts.

## The prefix cache is the counter-argument

If your server has a prefix cache, a stable preamble is close to free after the first hit. Mine runs a 66% hit rate, and a repeated long prompt has come back 87 times faster.

So why bother?

Because the cache only helps while the prefix does not change. Every model switch, every restart, every config edit is a cold prefill of the whole preamble. On a machine that swaps models by design, that happens constantly.

And a cached prefix still occupies the window. Cheap to re-read is not the same as free to carry. The 18k is gone from your 131k either way.

The cache changes the cost from compute to capacity. It does not remove it.

## Read the categories before you guess

My agent splits its startup cost into buckets: system prompt, instruction files, skills, built-in tools, custom tools, MCP tools, extensions, and the response reserve.

The split matters more than the total.

| Category | Tokens |
|---|---|
| System prompt | 657 |
| Instruction files | 623 |
| Skills | 1.1k |
| Built-in tools | 641 |
| Custom tools | 12.2k |
| Extensions | 1.3k |

The custom-tools row dwarfed the rest.

If your agent does not give you this breakdown, get one before you change anything. Otherwise you are changing settings to see what happens.

## My first answer was wrong

I had recently added a hook file to bridge the agent into my terminal multiplexer. Fifty-four kilobytes of TypeScript, written the same day the number bothered me. Obvious culprit.

It was not. It registers event listeners and nothing else. No tools, no prompt text. Source code that runs in the agent process never reaches the model.

So I went looking for an analytics integration I had connected weeks earlier, found its cached tool definition on disk, measured it at 8,000 tokens, and told myself that was the answer.

Also wrong. The cache was orphaned. The config that created it was gone, and I proved it the wrong way round: by trying to remove the entry and finding there was nothing to remove.

The proof had been on screen the whole time. The context viewer lists MCP tools as their own category. There was no MCP row. Nothing was loaded.

**A cache file on disk is not proof that something is loaded.** It is proof that something was loaded once.

**Read your own instrument.** The absent row answered the question before I went spelunking. I was hunting a suspect I already had in mind.

## Measure the definitions, not the names

Custom tools meant tools registered by installed packages. About 30 of them. I read the source and measured each one: description, prompt snippet, parameter schema.

| Tool | Tokens |
|---|---|
| Subagent orchestration | ~4,500 |
| Web search | ~1,078 |
| Fetch content | ~745 |
| Search content retrieval | ~412 |
| Source check | ~355 |
| Seven memory tools combined | ~563 |
| Six file and shell tools combined | ~364 |

One tool was over a third of the bucket. Its parameter schema alone carried 184 fields and roughly 3,400 tokens of field descriptions.

That package shipped a setting to control description length. I measured all three modes before touching it:

```
default    ~1,128 tokens
compact    ~2,345 tokens
full       ~1,924 tokens
```

The mode called "compact" is the largest of the three. Switching to it would have cost me 1,200 tokens while I congratulated myself on a saving.

I would have shipped that if I had trusted the name.

The same package had a third mode that loads a description from a file you write. That was the real lever: 1,128 tokens down to 693, measured before and after.

## Duplicate tools cost a small model twice

One package had been quietly registering its own shell, read, grep, find and list tools alongside the built-in ones. Both sets shipped every request. It had a setting to replace the built-ins instead of sitting beside them, defaulted off, and I had never turned it on.

The token saving was modest, under 300.

The other saving matters more on a local model. A 35B that activates about 3B parameters per token has less room for disambiguation than a frontier model does. Handing it two shell tools with near-identical descriptions and asking it to pick is a tax on every tool call, paid in wrong choices rather than tokens.

This is where local and hosted genuinely diverge. On a big hosted model, thirty overlapping tools is untidy. On a quantised local model it is a correctness problem. Deduplicate for accuracy, and take the tokens as a bonus.

## Ask your transcripts what you actually use

Before cutting a tool, I wanted evidence rather than instinct. My agent keeps session transcripts as JSONL, so I parsed every one and counted real tool calls.

```
    52  bash
    36  read
    12  subagent
    12  list
     8  edit
     6  web_search
     4  fetch_content
```

Twenty-seven sessions. Two of the web tools had never been called once. Not rarely. Never.

Both were individually disableable in a config the package already supported. That is 767 tokens of prefill, every turn, for capability I have not used in months.

This was the cheapest optimisation I found. The default assumption is that an installed package is a used package. The transcripts said otherwise.

The same pass told me what to leave alone. The subagent tool is the most expensive thing I run, and I have called it 12 times. It stays.

## Not everything is a dial

That 184-field parameter schema has no setting. Tool schemas are the contract between a package and the model. You take them as shipped or you remove the package.

Sort what you find into three piles:

- Configurable, and you do not use it. Cut it.
- Configurable, and you do use it. Trim carefully and measure.
- Fixed. Keep the package or drop it.

Most of my remaining cost is in the third pile, attached to a tool I want. That is a trade, not a problem.

## The biggest lever was not a tool at all

While counting tokens in tool definitions, I was ignoring the largest number on the screen.

My agent reserves 16,384 tokens as headroom for its own reply. That is 13% of the window, larger than every tool definition combined, and it is one line in a settings file.

It is not waste. It is the room the model has to answer before compaction fires. Halve it and you get 8,000 tokens of working context back, at the cost of compacting sooner and risking a truncated reply on long output.

Locally the trade is easier to reason about than it looks. At roughly 48 tok/s, 16k of reserve is about five and a half minutes of sustained generation. I have never once needed that in a coding session. I halved it.

If you write long documents through your agent, leave it alone. The point is not the setting. It is that I spent an hour on tool definitions worth a few hundred tokens each while an 8,000 token decision sat one row below them.

## Where it landed

| Change | Tokens |
|---|---|
| Two never-used tools disabled | ~767 |
| One dead proxy tool disabled | ~65 |
| Custom description for the biggest tool | ~435 |
| Built-in tools deduplicated | ~273 |
| Response reserve halved | ~8,192 |

About 9,700 tokens, roughly 7% of the window, most of it from the one change that had nothing to do with tools.

The order that worked:

1. Get a breakdown by category. Do not optimise a total.
2. Verify what is actually loaded. Caches lie.
3. Measure definitions from source. Names lie too.
4. Count real tool calls in your transcripts before cutting.
5. Deduplicate overlapping tools, for accuracy before tokens.
6. Separate configurable from fixed.
7. Sort by size, not by how interesting the problem is.

None of this made the model better. It gave the model more room to work, and fewer near-identical tools to choose between, on a machine where both are finite.

The Mac mini can hold one large model at a time. I had also asked it to carry 18k of preamble before the session began.
