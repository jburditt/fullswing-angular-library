# How to create a simple Angular blog

Today, I set out to set up a basic headless Angular blog with minimal features. I wanted it to be fast and lightweight, but still have the power of Angular components. The end product was an static generated Angular app that supports markdown, code syntax highlighting, mermaid diagrams, and comments. There is no content management, instead, you add markdown files and add the filename "slug" to the Angular prerender id routes.

## Optional features
- Static Site Generation
- Zoneless
- Markdown
- Comments

## Installation

1. Create a new a new standalone Angular application `ng new angular-blog`. I suggest enabling static site generation (SSG/SSR) and zoneless, to keep your blog lightweight and fast.
2. Follow the steps here to install [ngx-markdown](https://www.npmjs.com/package/ngx-markdown).
3. Edit app.html to be your template used for all your pages and blogs
4. Create page.component `ng generate component src/app/page`
5. Create blog.component `ng generate component src/app/blog`
```html
<div class="red pill">Angular</div>
<markdown [src]="src()"></markdown>
<div class="spacer10"></div>
<img src="/avatar.png" alt="Jebb Burditt" class="profile" />
<br /> &nbsp;
<div class="flexbox" style="position:relative">
  <span class="small-text" style="position:absolute; bottom: 0">Jebb Burditt</span>
  <span class="spacer"></span>
  <span class="small-text" style="position:absolute; bottom: 0; right:0">{{ today | date }}</span>
</div>
```
6. (optional) Install Disqus for commenting `npm i ngx-disqus --force`. Follow the instructions to setup a new site on [Disqus](www.disqus.com) and [ngx-disqus](https://github.com/MurhafSousli/ngx-disqus). 

## How to add content
1. 

## Versions used on Oct 14, 2025
- Angular 20.2
- ngx-markdown 3.0.1
- marked 16.4.0
- clipboard 2.0.11
