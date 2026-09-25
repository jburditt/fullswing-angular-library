# fullswing-blog Specification

## Overview
fullswing-blog is a headless blog application built in an Angular workspace. It renders blog content from markdown files and supports advanced pages written directly as Angular components. For the `typescript-blog` migration, content metadata (title, categories, author, date, route) should live in JSON sidecar files that share the same basename as the content they describe, and that metadata should drive sitemap generation, filtering, and page header rendering.

## Goals
- Serve static and pre-rendered blog content quickly.
- Keep authoring simple for markdown-driven posts.
- Support richer, component-based pages when markdown is not sufficient.
- Expose category metadata for filtering and visual tags.
- Avoid maintaining a centralized metadata index file.

## Project Location
- Application root: `projects/fullswing-blog`
- Source root: `projects/fullswing-blog/src`
- Static content: `projects/fullswing-blog/public`

## Runtime Architecture

### Shell and Layout
- Root component: `src/app/app.ts`
- Shared layout template: `src/app/app.html`
- Shared stylesheet: `src/app/app.css`
- The shell renders:
  - Branding/logo and social links
  - Category pills for current page
  - Dynamic title, author, and date from `BlogService`
  - Route outlet for page body content

### Routing
Defined in `src/app/app.routes.ts`:
- `/` and `/sitemap` → sitemap page
- `/blog/:id` → markdown-backed blog page component
- `/page/azure-static-app` → Angular component page
- `/page/angular-blog` → Angular component page

### Server Rendering / Prerender
- Server route config: `src/app/app.routes.server.ts`
- Rendering mode: prerender
- `blog/:id` prerender params currently come from a hard-coded `routesIDs` list.

## Content Model

### Metadata Source
- Metadata should not come from a shared `data.json` file.
- Each content item should have a JSON metadata file with the same basename as the file or page it describes.
- Blog posts should be organized beneath year folders within `public/blog/`.
- Example markdown pairing:
  - `public/blog/2025/doc-template.md`
  - `public/blog/2025/doc-template.json`
- The JSON sidecar should contain:
  - `route`
  - `title`
  - `categories[]`
  - `author`
  - `date`

### Repository Layer
- Current file: `src/app/db/db.ts`
- `RepositoryService` currently builds blog/page collections and provides:
  - `getBlog(route)`
  - `getPage(route)`
  - `getBlogs()`
  - `getPages()`
  - `getAll()` sorted by date descending
  - `getCategories()`
- In `typescript-blog`, the equivalent repository layer should discover and load same-basename JSON metadata files instead of reading a centralized index.

### Category System
- Category type union and color mapping are defined in `src/app/db/db.ts`.
- Category display names are transformed by `CategoryPipe`.

## Rendering Flows

### Markdown Blog Flow
1. Route `/blog/:id` loads `Blog` component (`src/app/blog/blog.ts`).
2. Component computes the markdown source path from the post's path beneath `blog/`, such as `blog/2025/<id>.md`.
3. The metadata loader recursively discovers and resolves the matching JSON sidecar in the same year folder.
4. `BlogService` publishes metadata (title, categories, author, date) to shell.
5. `ngx-markdown` renders markdown from content discovered beneath `/public/blog/`.

### Component Page Flow
1. Static route loads page component under `src/app/page/*`.
2. Page component extends `BlogPage` helper from `blog.service.ts`.
3. The metadata loader resolves the JSON metadata file for that page using the same basename convention.
4. `BlogService` publishes metadata to shell.
5. Component template renders rich/static HTML and optional code blocks.

### Sitemap Flow
- Component: `src/app/sitemap/sitemap.ts`
- Reads all discovered metadata entries from the repository layer.
- Supports category toggles to filter visible links.

## Markdown and Code Features

### Markdown
Configured in `src/app/app.config.ts`:
- `provideMarkdown` with custom `marked` renderer
- GFM enabled
- Line breaks enabled
- Custom code renderer supporting line-number and line-highlight attributes

### Prism / Mermaid / Clipboard Assets
Configured in `angular.json` for `fullswing-blog` build:
- Prism core and language bundles
- Prism plugins: line numbers, line highlight, command line
- Mermaid
- Clipboard

### Embedded Code Blocks
- Component: `src/app/code-block/code-block.ts`
- Supports:
  - external source URL rendering
  - inline code via projected content
  - optional title
  - optional line highlight and line offset settings

## Static Assets and Content
- Content directory: `public/blog/<year>/*.md`, for example `public/blog/2025/*.md`
- Metadata sidecars: same-basename `.json` files in the same year folder as their markdown files
- Blog discovery must recursively scan year folders beneath `public/blog/` and preserve each post's relative path when resolving content and metadata.
- Images/assets: `public/logo.jpg`, `public/avatar.png`, etc.

## How New Content Is Added
For a new markdown post:
1. Add a year folder under `public/blog/`, if it does not already exist, such as `public/blog/2025/`.
2. Add the markdown file to that year folder, such as `public/blog/2025/my-post.md`.
3. Add a JSON metadata file with the same basename in the same folder, such as `public/blog/2025/my-post.json`.
4. Ensure the route in the metadata matches `/blog/<basename>`; the year folder remains an organizational path, not part of the public route.
5. Add matching `id` to prerender `routesIDs` in `app.routes.server.ts`.

For a new component page:
1. Create page component under `src/app/page/<page-name>/`.
2. Add explicit route entry in `app.routes.ts`.
3. Add a JSON metadata file with the same basename as the page it describes.
4. If using `/blog/:id` style prerendering, update server prerender params accordingly.

## Constraints to Preserve for TypeScript-Blog Migration
- Must keep a metadata-driven model, but metadata should come from same-basename JSON files rather than a centralized index.
- Must recursively discover markdown posts and same-basename metadata sidecars in year folders beneath `public/blog/`.
- Must preserve route-to-content mapping for both markdown posts and richer pages.
- Must keep sitemap generation and category-based filtering.
- Must keep markdown rendering with syntax highlighting, line numbers, and line highlight support.
- Must support static generation/prerender-friendly output.
- Should preserve existing URL structure where feasible:
  - `/blog/:id`
  - `/page/<name>`
  - `/sitemap`

## Known Gaps / Risks in Current Implementation
- Prerender IDs are hard-coded and can drift from the available metadata files.
- Content files and JSON metadata sidecars can drift if one exists without the other.
- The generator must support recursive discovery of year-organized blog content; flat-directory discovery is insufficient.
- Date values are string-based in JSON metadata, while sorting logic assumes date-like values.

## Initial Migration Notes (Step 1 Context)
This spec captures the fullswing-blog behavior and the target metadata model so a new `typescript-blog` project can replicate functionality without Angular while using same-basename JSON metadata files instead of a centralized `data.json` index.

## To-Do
- No longer need route property in blog.json files
- Add typescript skills
- Add best practices instructions
- Add spec-kit and documentation
- Add unit and playwright tests (with axe)
