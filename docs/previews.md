# Pull request previews

Every pull request gets a deployed preview at `https://placona.co.uk/pr-<number>/`,
posted as a sticky comment on the PR. Closing the PR deletes it.

## Why the deploy had to change

GitHub Pages serves from exactly one source. The site was published with
`actions/deploy-pages` (source: "GitHub Actions"). `rajyan/preview-pages` publishes
by pushing to a **branch**, because underneath it uses
`JamesIves/github-pages-deploy-action`. Those two cannot both be the Pages source,
so production moved to the same `gh-pages` branch the previews use:

```
gh-pages branch
  /            production   <- pushed by deploy-pages.yml on push to main
  /pr-12/      preview      <- pushed by preview-pages.yml on pull_request
  /pr-13/      preview
```

Production deploys use `clean-exclude: pr-*`, so publishing the site does not
delete open previews.

## Cutover, in order

This sequence never leaves the site unserved. **Do not switch the Pages source
before step 2 has run** — the `gh-pages` branch does not exist yet, and pointing
Pages at an empty branch takes the site down.

1. **Merge this PR.** Nothing changes for visitors. The Pages source is still
   "GitHub Actions", and `deploy-workflow-source` still publishes the live site.
2. **Let the workflow run on `main`.** It now also pushes the built site to a new
   `gh-pages` branch. Confirm the branch exists and its root contains
   `index.html` and `CNAME`.
3. **Switch the Pages source.** Settings → Pages → Build and deployment →
   Source: *Deploy from a branch* → Branch: `gh-pages` → Folder: `/ (root)`.
   The custom domain is preserved because `CNAME` ships in `public/` and lands at
   the branch root on every deploy.

   Before switching, confirm the branch root contains **`.nojekyll`**. Serving
   from a branch makes Pages run Jekyll, and Jekyll skips any path beginning with
   an underscore — which is every stylesheet and script, in `_astro/`. The file
   ships in `public/` and the deploy asserts it, but check it once by hand,
   because a site that has lost its CSS still returns HTTP 200 and looks fine to
   any uptime check.
4. **Turn off the old path.** Settings → Secrets and variables → Actions →
   Variables → new repository variable `PAGES_SOURCE` = `branch`. This skips the
   `deploy-workflow-source` job, which would otherwise start failing now that the
   Pages source is no longer "GitHub Actions". The site is unaffected either way;
   this just keeps the workflow green.

To roll back, set the Pages source back to "GitHub Actions" and delete the
`PAGES_SOURCE` variable.

## Previews and SEO

A preview is a complete copy of a site that depends on its search ranking, so two
things happen before a preview is published:

- **Every page is rewritten to `noindex, nofollow`.** A `robots.txt` inside
  `/pr-N/` would do nothing; only the one at the domain root is honoured.
- **Root-absolute paths are rebased onto the preview prefix.** Astro emits
  `/_astro/...`, `/images/...` and `/about/`. Left alone, a preview would pull
  production's stylesheet and navigate straight back to production, which makes
  the preview useless for reviewing a visual change. Absolute URLs are left
  alone, so `canonical` and `og:url` still point at the real site.
