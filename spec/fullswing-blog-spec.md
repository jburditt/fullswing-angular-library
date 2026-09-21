# fullswing-blog Specification

## Overview
fullswing-blog is a headless blog application built in an Angular workspace. It renders blog content from markdown files and supports advanced pages written directly as Angular components. Content metadata (title, categories, author, date, route) is centralized in `public/data.json` and is used for sitemap, filtering, and page header rendering.

## Goals
- Serve static and pre-rendered blog content quickly.
- Keep authoring simple for markdown-driven posts.
- Support richer, component-based pages when markdown is not sufficient.
- Expose category metadata for filtering and visual tags.

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
- File: `public/data.json`
- Structure:
  - `blogs[]`: markdown-backed posts
  - `pages[]`: component-backed pages
- Common fields:
  - `route`
  - `title`
  - `categories[]`
  - `author`
  - `date`

### Repository Layer
- File: `src/app/db/db.ts`
- `RepositoryService` loads `data.json` into in-memory maps and provides:
  - `getBlog(route)`
  - `getPage(route)`
  - `getBlogs()`
  - `getPages()`
  - `getAll()` sorted by date descending
  - `getCategories()`

### Category System
- Category type union and color mapping are defined in `src/app/db/db.ts`.
- Category display names are transformed by `CategoryPipe`.

## Rendering Flows

### Markdown Blog Flow
1. Route `/blog/:id` loads `Blog` component (`src/app/blog/blog.ts`).
2. Component computes markdown source path: `blog/<id>.md`.
3. Component loads metadata by route (`/blog/<id>`) via `RepositoryService`.
4. `BlogService` publishes metadata (title, categories, author, date) to shell.
5. `ngx-markdown` renders markdown from `/public/blog/*.md`.

### Component Page Flow
1. Static route loads page component under `src/app/page/*`.
2. Page component extends `BlogPage` helper from `blog.service.ts`.
3. `BlogPage` resolves metadata via `RepositoryService.getPage(route)`.
4. `BlogService` publishes metadata to shell.
5. Component template renders rich/static HTML and optional code blocks.

### Sitemap Flow
- Component: `src/app/sitemap/sitemap.ts`
- Reads all entries from `RepositoryService.getAll()`.
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
- Content directory: `public/blog/*.md`
- Images/assets: `public/logo.jpg`, `public/avatar.png`, etc.
- Blog metadata index: `public/data.json`

## How New Content Is Added (Current Behavior)
For a new markdown post:
1. Add markdown file to `public/blog/`.
2. Add route metadata entry to `public/data.json` in `blogs[]`.
3. Ensure route is reachable through `/blog/:id` using filename/id convention.
4. Add matching `id` to prerender `routesIDs` in `app.routes.server.ts`.

For a new component page:
1. Create page component under `src/app/page/<page-name>/`.
2. Add explicit route entry in `app.routes.ts`.
3. Add metadata entry in `public/data.json` in `pages[]`.
4. If using `/blog/:id` style prerendering, update server prerender params accordingly.

## Constraints to Preserve for TypeScript-Blog Migration
- Must keep metadata-driven model (`data.json` equivalent).
- Must preserve route-to-content mapping for both markdown posts and richer pages.
- Must keep sitemap generation and category-based filtering.
- Must keep markdown rendering with syntax highlighting, line numbers, and line highlight support.
- Must support static generation/prerender-friendly output.
- Should preserve existing URL structure where feasible:
  - `/blog/:id`
  - `/page/<name>`
  - `/sitemap`

## Known Gaps / Risks in Current Implementation
- Prerender IDs are hard-coded and can drift from `data.json`.
- Some markdown files exist in `public/blog` that are not indexed in `data.json`.
- Date values are string-based in `data.json`, while sorting logic assumes date-like values.

## Initial Migration Notes (Step 1 Context)
This spec captures the current fullswing-blog behavior and structure so a new `typescript-blog` project can replicate functionality without Angular, while preserving content model, URL structure, and rendering features.
