import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { discoverBlogs } from '../src/lib/discovery.js';

const VALID_METADATA = {
  route: '/blog/example',
  title: 'Example',
  categories: ['TypeScript'],
  author: 'Test Author',
  date: '2025-10-31',
};

test('discoverBlogs should reject orphan markdown files', async () => {
  const root = await mkdtemp(join(tmpdir(), 'typescript-blog-discovery-'));
  const blogDirectory = join(root, 'blog');
  await mkdir(blogDirectory, { recursive: true });
  await writeFile(join(blogDirectory, 'example.md'), '# Example\n', 'utf8');

  await assert.rejects(
    () => discoverBlogs(blogDirectory),
    /blog markdown files are missing same-basename sidecars: example/
  );
});

test('discoverBlogs should reject non-ISO dates in metadata', async () => {
  const root = await mkdtemp(join(tmpdir(), 'typescript-blog-discovery-'));
  const blogDirectory = join(root, 'blog');
  await mkdir(blogDirectory, { recursive: true });
  await writeFile(join(blogDirectory, 'example.md'), '# Example\n', 'utf8');
  await writeFile(
    join(blogDirectory, 'example.json'),
    JSON.stringify({ ...VALID_METADATA, date: 'Oct 31, 2025' }),
    'utf8'
  );

  await assert.rejects(
    () => discoverBlogs(blogDirectory),
    /Use ISO date format YYYY-MM-DD/
  );
});
