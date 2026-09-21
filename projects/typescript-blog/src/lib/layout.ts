import { escapeHtml, formatDate, getCategoryDisplayName, slugify } from './html.js';

export interface LayoutOptions {
  route: string;
  assetPrefix: string;
  pageTitle: string;
  title: string;
  content: string;
  author?: string;
  date?: Date;
  categories?: string[];
}

function renderCategoryPills(categories: string[]): string {
  if (categories.length === 0) {
    return '';
  }

  return `
    <ul class="category-pills" aria-label="Categories">
      ${categories.map(category => `
        <li class="category-pill category-pill--${slugify(category)}">${escapeHtml(getCategoryDisplayName(category))}</li>
      `).join('')}
    </ul>
  `;
}

export function renderLayout(options: LayoutOptions): string {
  const { assetPrefix, pageTitle, title, content, author, date, categories = [] } = options;
  const headingMeta = author || date ? `
    <p class="page-meta">
      ${author ? `<span>${escapeHtml(author)}</span>` : ''}
      ${author && date ? '<span aria-hidden="true">•</span>' : ''}
      ${date ? `<time datetime="${date.toISOString()}">${escapeHtml(formatDate(date))}</time>` : ''}
    </p>
  ` : '';

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(pageTitle)}</title>
    <link rel="icon" href="${assetPrefix}brand.svg" type="image/svg+xml" />
    <link rel="stylesheet" href="${assetPrefix}assets/site.css" />
  </head>
  <body>
    <div class="shell">
      <header class="site-header">
        <a class="brand" href="${assetPrefix}">
          <img src="${assetPrefix}brand.svg" alt="Fullswing" width="48" height="48" />
          <span>
            <strong>Fullswing</strong>
            <small>TypeScript Blog</small>
          </span>
        </a>
        <nav aria-label="Primary">
          <a href="${assetPrefix}">Home</a>
          <a href="${assetPrefix}sitemap/">Sitemap</a>
          <a href="https://github.com/jburditt" rel="noopener noreferrer">GitHub</a>
        </nav>
      </header>
      <main>
        <article class="page-card">
          ${renderCategoryPills(categories)}
          <h1>${escapeHtml(title)}</h1>
          ${headingMeta}
          <div class="page-content">
            ${content}
          </div>
        </article>
      </main>
      <p id="copy-status" class="visually-hidden" role="status" aria-live="polite"></p>
    </div>
    <script type="module" src="${assetPrefix}assets/site.js"></script>
  </body>
</html>`;
}
