import { readdir } from 'node:fs/promises';
import { basename, join } from 'node:path';
import { loadMetadata } from './metadata.js';
import { BlogEntry, PageEntry } from './types.js';

function getSortedBasenames(entries: string[], extension: string): string[] {
  return entries
    .filter(entry => entry.endsWith(extension))
    .map(entry => basename(entry, extension))
    .sort();
}

function getOrphans(primary: string[], secondary: string[]): string[] {
  const secondarySet = new Set(secondary);
  return primary.filter(entry => !secondarySet.has(entry));
}

function formatOrphanMessage(kind: 'blog markdown' | 'blog metadata' | 'page renderer' | 'page metadata', orphans: string[]): string {
  return `${kind} files are missing same-basename sidecars: ${orphans.join(', ')}`;
}

export async function discoverBlogs(blogDirectory: string): Promise<BlogEntry[]> {
  const entries = await readdir(blogDirectory, { withFileTypes: true });
  const fileNames = entries.filter(entry => entry.isFile()).map(entry => entry.name);
  const markdownBasenames = getSortedBasenames(fileNames, '.md');
  const metadataBasenames = getSortedBasenames(fileNames, '.json');

  const orphanMarkdown = getOrphans(markdownBasenames, metadataBasenames);
  const orphanMetadata = getOrphans(metadataBasenames, markdownBasenames);

  if (orphanMarkdown.length > 0) {
    throw new Error(formatOrphanMessage('blog markdown', orphanMarkdown));
  }

  if (orphanMetadata.length > 0) {
    throw new Error(formatOrphanMessage('blog metadata', orphanMetadata));
  }

  const blogs = await Promise.all(
    markdownBasenames.map(async id => {
      const metadataPath = join(blogDirectory, `${id}.json`);
      const markdownPath = join(blogDirectory, `${id}.md`);
      const metadata = await loadMetadata(metadataPath, `/blog/${id}`);
      return {
        ...metadata,
        kind: 'blog' as const,
        id,
        markdownPath,
        metadataPath,
      };
    })
  );

  return blogs;
}

export async function discoverPages(sourcePagesDirectory: string, compiledPagesDirectory: string): Promise<PageEntry[]> {
  const entries = await readdir(sourcePagesDirectory, { withFileTypes: true });
  const fileNames = entries.filter(entry => entry.isFile()).map(entry => entry.name);
  const rendererBasenames = getSortedBasenames(
    fileNames.filter(entry => !entry.endsWith('.d.ts')),
    '.ts'
  );
  const metadataBasenames = getSortedBasenames(fileNames, '.json');

  const orphanRenderers = getOrphans(rendererBasenames, metadataBasenames);
  const orphanMetadata = getOrphans(metadataBasenames, rendererBasenames);

  if (orphanRenderers.length > 0) {
    throw new Error(formatOrphanMessage('page renderer', orphanRenderers));
  }

  if (orphanMetadata.length > 0) {
    throw new Error(formatOrphanMessage('page metadata', orphanMetadata));
  }

  const pages = await Promise.all(
    rendererBasenames.map(async name => {
      const metadataPath = join(sourcePagesDirectory, `${name}.json`);
      const modulePath = join(compiledPagesDirectory, `${name}.js`);
      const metadata = await loadMetadata(metadataPath, `/page/${name}`);
      return {
        ...metadata,
        kind: 'page' as const,
        name,
        metadataPath,
        modulePath,
      };
    })
  );

  return pages;
}
