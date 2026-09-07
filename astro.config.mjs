import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';

const siteOrigin = new URL('https://placona.co.uk').origin;

/** Add safe new-tab behaviour to Markdown links leaving placona.co.uk. */
function externalLinksInNewTab() {
  return (tree) => {
    const visit = (node) => {
      if (node.type === 'element' && node.tagName === 'a' && typeof node.properties?.href === 'string') {
        let url;
        try {
          url = new URL(node.properties.href, siteOrigin);
        } catch {
          node.children?.forEach(visit);
          return;
        }
        if ((url.protocol === 'http:' || url.protocol === 'https:') && url.origin !== siteOrigin) {
          node.properties.target = '_blank';
          const existingRel = Array.isArray(node.properties.rel)
            ? node.properties.rel
            : typeof node.properties.rel === 'string'
              ? node.properties.rel.split(/\s+/)
              : [];
          node.properties.rel = [...new Set([...existingRel, 'noopener', 'noreferrer'])];
        }
      }
      node.children?.forEach(visit);
    };
    visit(tree);
  };
}

export default defineConfig({
  site: 'https://placona.co.uk',
  output: 'static',
  integrations: [mdx(), sitemap()],
  markdown: {
    processor: unified({ rehypePlugins: [externalLinksInNewTab] }),
    shikiConfig: {
      theme: 'github-dark'
    }
  }
});
