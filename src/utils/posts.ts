import type { CollectionEntry } from 'astro:content';

export type YearGroup = { year: number; posts: CollectionEntry<'blog'>[] };

/** Posts must already be sorted newest first. */
export function groupPostsByYear(posts: CollectionEntry<'blog'>[]): YearGroup[] {
  const groups: YearGroup[] = [];
  for (const post of posts) {
    const year = post.data.pubDate.getFullYear();
    const current = groups[groups.length - 1];
    if (current && current.year === year) {
      current.posts.push(post);
    } else {
      groups.push({ year, posts: [post] });
    }
  }
  return groups;
}

/** Most frequent categories across the archive, for the homepage topic pills. */
export function topCategories(posts: CollectionEntry<'blog'>[], limit = 6): string[] {
  const counts = new Map<string, number>();
  for (const post of posts) {
    for (const category of post.data.categories ?? []) {
      counts.set(category, (counts.get(category) ?? 0) + 1);
    }
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, limit).map(([name]) => name);
}

/** Other posts sharing a category with `post`, newest first, excluding itself. */
export function relatedPosts(
  post: CollectionEntry<'blog'>,
  allPosts: CollectionEntry<'blog'>[],
  limit = 3
): CollectionEntry<'blog'>[] {
  const categories = new Set(post.data.categories ?? []);
  if (categories.size === 0) return [];
  return allPosts
    .filter((candidate) => candidate.id !== post.id && candidate.data.categories?.some((c) => categories.has(c)))
    .slice(0, limit);
}
