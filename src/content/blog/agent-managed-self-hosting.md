---
title: "Self-hosting my projects without doing every deployment myself"
seoTitle: "My agent-managed self-hosting stack"
description: "Two Hetzner VMs, a Mac mini and an agent-operated deployment workflow: what I moved, how I check it works, and the maintenance I still own."
pubDate: "2026-10-16T08:00:00.000Z"
slug: "agent-managed-self-hosting"
categories: ["Technology", "Infrastructure"]
tags: ["self-hosting", "coding-agents", "hetzner", "openship", "homelab"]
draft: false
---

I wanted control over where my projects run without becoming the person who clicks through every deployment, checks every container and remembers how each server was configured.

That is the setup I have been building. Some of my applications and websites now run on rented Hetzner VMs. Agents handle the operational work through SSH, APIs and documented procedures. I still own the outages, permissions and decisions about what should run there.

[LinkIntel](https://getlinkintel.com) moved from Vercel and managed [Supabase](https://supabase.com). [DevRel Bridge](https://devrelbridge.com) and devrel.md also run on Hetzner. Other projects still use managed hosting. There is enough shared infrastructure now that documenting and operating it consistently matters more than getting another application onto a cheap server.

## Where things actually run

Public production lives on two Hetzner Cloud machines. Neither is in my house.

The main machine is a CX33 in Helsinki: four vCPUs and 8 GB RAM, running Ubuntu 24.04 LTS. It hosts the [OpenShip](https://openship.io) control plane and LinkIntel's production and preview applications.

The smaller machine is a CAX11 in Falkenstein: two vCPUs and 4 GB RAM, also on Ubuntu 24.04. DevRel Bridge and devrel.md run there, along with DevRel Bridge's preview and devrel.md's [PostgreSQL](https://www.postgresql.org) database. OpenShip on Helsinki manages this machine too.

Two architectures mean checking [Docker](https://www.docker.com) image compatibility. An image that runs on the x86 host is not automatically usable on ARM. Two machines also do not give me high availability. They have different workloads, and the shared control plane is another dependency.

At home, my M4 Pro Mac mini has 14 CPU cores and 48 GB of unified memory. It runs [Hermes](https://github.com/NousResearch/hermes-agent), local models and my coding environment. I use [T3](https://t3.codes) for remote access to that environment. I have [written separately about fitting local models onto this machine](https://placona.co.uk/my-mac-mini-fits-one-model/); its role here is agent control and development.

There is also a Linux mini PC called porg, with an Intel N100 and about 16 GB RAM. It runs development databases and trusted devrel.md pull-request previews through [Dokploy](https://dokploy.com). It is not a production server, and it does not host every preview in the setup.

Keeping these roles explicit helps when an agent is deciding where a change belongs. A spare machine at home and a production deployment target are very different things.

## The stack after the move

The applications are containerised, with [Docker Compose](https://docs.docker.com/compose/) for supporting infrastructure and databases. OpenShip is the production control plane. Its [OpenResty](https://openresty.org)-based edge handles application routing and TLS. OpenShip has its own PostgreSQL and [Redis](https://redis.io) for control-plane state.

LinkIntel is a [Next.js](https://nextjs.org) application. It now talks directly to PostgreSQL through [pg](https://node-postgres.com) and [Kysely](https://kysely.dev), with [Better Auth](https://www.better-auth.com) handling authentication. The full Supabase API, Auth and Functions services are stopped.

There is a leftover worth being precise about: the database still uses the Supabase PostgreSQL image for its extensions. Calling this a completely vanilla Postgres installation would be wrong. The application no longer depends on the full Supabase service stack, but the image underneath the database still comes from it.

On the ARM machine, devrel.md has a separate PostgreSQL Alpine container. Production database volumes survive application deployments. Replacing an application container must not become an accidental database lifecycle decision.

Cloudflare handles DNS. The ARM machine uses Cloudflare proxying, Full (strict) TLS and Origin CA certificates, with origin access restricted to Cloudflare. Helsinki has a different edge setup using [Let's Encrypt](https://letsencrypt.org). I cannot copy a certificate procedure between them and assume it applies.

Private administration uses [Tailscale](https://tailscale.com). [Infisical](https://infisical.com) holds project-scoped secrets. Cloudflare R2 stores offsite backups, Better Stack checks public uptime, and OpenShip sends deployment and container failure events to Telegram.

## What the agent does

The useful part is being able to hand over an operational task with enough context for the agent to inspect the system and finish the work.

The self-hosting repository has a folder per server, containing a README, change log and non-secret configuration. Generated server notes also sync into Obsidian. A new session can read the runbook instead of reconstructing the fleet from whatever I remember to put in a prompt.

That documentation has already had a failure of its own. A sync from a stale worktree overwrote newer notes. The sync script was changed to refuse a checkout that is behind the main branch. Persistent context needs protection from stale writes too.

For a production change, the operating procedure starts with inspecting the current host, application and configuration. The agent needs a bounded change and a rollback route before deploying through the relevant workflow and OpenShip API. Risky network changes need an automatic revert so a broken connection does not also remove the way back in. Production cutovers happen one at a time.

After deployment, the agent checks the public health endpoint and the deployed commit SHA, inspects the effects, and updates the runbook and change log. OpenShip reporting a deployment as ready is insufficient. The public `/healthz` response tells me which build is actually serving requests.

LinkIntel, devrel.md and DevRel Bridge each reported a healthy running build when checked. I can use that to verify a deployment, but it tells me nothing about whether a backup ran last night.

I still have to handle actions that need me: account logins, payments, certain settings and business decisions. Permission controls also block some merges and changes to safety rules. An agent operating the stack does not get to grant itself every permission it wants.

## Some of the automation is just a timer

GitHub Actions and repository-specific runners drive deployments. OpenShip's automatic deployment feature is switched off.

The deployment path for devrel.md is a useful example. Its public source repository has no self-hosted runner attached. Deployment happens through a private repository, with a sandboxed [systemd](https://systemd.io) poller checking the main branch and CI status every two minutes.

A GitHub schedule had failed to fire. A normal timer became the primary trigger, with a manual workflow still available.

There is no reason to ask a language model to wake up every two minutes and decide whether to run a known check. An agent can investigate a failed trigger and help change the mechanism. The repeating work belongs in a script.

Build trust matters here too. The preview workflows use trusted changes from the same repository. Arbitrary code from a public fork does not belong on a privileged production runner.

Even a trusted preview needs scrutiny. LinkIntel's preview shares the production database and many production secrets. It gives me a place to preview application changes, with consequences for production data still attached. I cannot treat it as an isolated sandbox.

## Backing up the thing that deploys everything

Getting applications online had left operational work unfinished. An infrastructure audit found missing alerting, external checks and control-plane backups. I had to give the system that deploys the applications a recovery path of its own.

Application databases now have nightly [pg_dump](https://www.postgresql.org/docs/current/app-pgdump.html) jobs, encrypted with [age](https://github.com/FiloSottile/age) and stored in application-specific R2 buckets. Restore drills into disposable databases have tested those backups, and LinkIntel has a monthly restore-drill workflow.

OpenShip's state database, installation configuration and keys are backed up, encrypted locally and stored offsite in R2. Restoring its database from R2 produced a match with the source database. Recovering application data would only solve part of an outage if I had lost the system used to deploy the applications.

The home agent environment has separate nightly backups to my NAS, which have also passed a restore check. Those are backups of Hermes, not a substitute for production database backups.

External monitoring matters because an agent on a dead host cannot report that the host has disappeared. Better Stack checks the public services. Deployment events and backup or poller heartbeats provide other evidence of activity. Monitoring still has gaps, and some permissions need tightening. I would not describe this as a completed security audit.

## What I gain, and what I now own

I can see the resources available to each application and inspect the runtime directly. Deployment patterns can be reused across projects. An agent can read the configuration, make an authorised change and check the result through tools, without needing me to translate a sequence of dashboard clicks.

I also have fewer separate application-hosting services to coordinate for the workloads I moved. That makes the system easier for me to reason about. I have not measured hours saved or reconciled a current total bill, so I am leaving both claims out.

The machines are small. Builds compete with running applications for memory and CPU. Sharing hosts puts multiple services within the same failure boundary. A bad agent action can affect production just as a bad command from me can, sometimes faster.

Patching is mine. Recovery is mine. Checking that a restore works is mine, even when an agent executes the commands. Hetzner, Cloudflare and GitHub remain dependencies. I have changed which parts I operate, not removed providers from the system.

## What stays managed

KeyStrokes' landing page moved to Cloudflare Workers. MentionDrop still uses Vercel, Railway, hosted Supabase and Clerk. Payments, transactional email, CRM and analytics remain managed where that makes sense, using services such as Resend, Folk and [PostHog](https://posthog.com). I have no interest in taking on mail deliverability to make the architecture look more self-hosted.

I still have Vercel projects kept for rollback and redirects to tidy up. Alongside the services I deliberately keep managed, that leaves me with a partial migration and accounts and bills with other providers.

For the applications I have moved, the deployment and recovery procedures are now work an agent can carry out and verify. I can read the resulting state and the change log. When the next task needs an account decision or a permission the agent does not have, it comes back to me.
