import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const sourceRoot = path.resolve('_posts');
const outputRoot = path.resolve('src/content/blog');

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(fullPath) : [fullPath];
  });
}

function yaml(value) {
  return JSON.stringify(value ?? '');
}

function sanitiseDuplicateFrontmatter(raw) {
  const match = raw.match(/^(---\r?\n)([\s\S]*?)(\r?\n---\r?\n)/);
  if (!match) return raw;
  const seen = new Set();
  const header = match[2].split(/\r?\n/).filter((line) => {
    const key = line.match(/^([A-Za-z0-9_-]+):/);
    if (!key) return true;
    if (seen.has(key[1])) return false;
    seen.add(key[1]);
    return true;
  }).join('\n');
  return `${match[1]}${header}${match[3]}${raw.slice(match[0].length)}`;
}

function normaliseBody(body) {
  return body
    .replaceAll('{% post_url 2020/2020-03-15-modern-android-development %}', '/modern-android-development/')
    .replaceAll('{% include youtubePlayer.html id="p3gcD0Jdqe0" %}', '<iframe title="YouTube video" src="https://www.youtube-nocookie.com/embed/p3gcD0Jdqe0" loading="lazy" allowfullscreen></iframe>')
    .replace(/\{:target="_blank"\}/g, '')
    .replace(/\{\{\s*'([^']+)'\s*\|\s*relative_url\s*\}\}/g, '$1');
}

fs.rmSync(outputRoot, { recursive: true, force: true });
fs.mkdirSync(outputRoot, { recursive: true });

const files = walk(sourceRoot).filter((file) => file.endsWith('.md'));
for (const sourcePath of files) {
  const parsed = matter(sanitiseDuplicateFrontmatter(fs.readFileSync(sourcePath, 'utf8')));
  const filename = path.basename(sourcePath, '.md');
  const slug = filename.replace(/^\d{4}-\d{2}-\d{2}-/, '');
  const data = parsed.data;
  const title = data.title ?? slug.replaceAll('-', ' ');
  const description = data.excerpt ?? '';
  const date = data.date ?? `${filename.slice(0, 10)}T00:00:00.000Z`;
  const categories = Array.isArray(data.categories) ? data.categories : data.categories ? [data.categories] : [];
  const tags = Array.isArray(data.tags) ? data.tags : data.tags ? [data.tags] : [];
  const image = data.image ? `image: ${yaml('/' + String(data.image).replace(/^\//, ''))}\n` : '';
  const frontmatter = `---\ntitle: ${yaml(title)}\ndescription: ${yaml(description)}\npubDate: ${yaml(new Date(date).toISOString())}\nslug: ${yaml(slug)}\ncategories: ${yaml(categories)}\ntags: ${yaml(tags)}\n${image}draft: false\n---\n\n`;
  fs.writeFileSync(path.join(outputRoot, `${slug}.md`), frontmatter + normaliseBody(parsed.content));
}

console.log(`Migrated ${files.length} published posts to ${outputRoot}`);
