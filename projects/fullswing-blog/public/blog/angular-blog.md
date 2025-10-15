# How to create a simple Angular blog

Today, I set out to set up a basic headless Angular blog with minimal features. I wanted it to be fast and lightweight, but still have the power of Angular components. The end product was an static generated Angular app that supports markdown, code syntax highlighting, mermaid diagrams, and comments. There is no content management, instead, you add markdown files and add the filename "slug" to the Angular prerender id routes.

## Features
- Blog content using markdown files
- Markdown package supports markdown, line numbers and highlighting, command line, mermaid diagrams, and emojis
- Add code snippets directly from your open source GitHub

## Optional features
- Static Site Generation
- Zoneless
- Markdown
- Comments

## Installation

1. Create a new a new standalone Angular application `ng new angular-blog`. I suggest enabling static site generation (SSG/SSR) and zoneless, to keep your blog lightweight and fast.
2. Follow the steps here to install [ngx-markdown](https://www.npmjs.com/package/ngx-markdown).
3. Edit app.html to be your template used for all your pages and blogs
### app.html
```html
@for (category of this.blogService.blog().categories; track category.key) {
   <div class="{{ category.colour }} pill">{{ category.key }}</div>
 }
 <div class="clear"></div>
 <router-outlet />
 <div class="spacer10"></div>
 @if (this.blogService.blog().author) {
   <img src="/avatar.png" alt="Avatar" class="profile" />
   <br /> &nbsp;
 }
 <div class="flexbox" style="position:relative">
   @if (this.blogService.blog().author) {
     <span class="small-text bottom">{{ this.blogService.blog().author }}</span>
   }
   @if (this.blogService.blog().date) {
     <span class="spacer"></span>
     <span class="small-text bottom right">{{ this.blogService.blog().date | date }}</span>
   }
 </div>

 <div style="padding-top:50px"></div>
 <mat-accordion>
   <mat-expansion-panel>
     <mat-expansion-panel-header>
       <mat-panel-title>Comments</mat-panel-title>
     </mat-expansion-panel-header>
     <disqus [identifier]="src()" />
   </mat-expansion-panel>
 </mat-accordion>
```
### app.ts
```typescript
import { Component } from '@angular/core';
 import { RouterOutlet } from '@angular/router';
 import { BlogService } from './blog/blog.service';
 import { DatePipe } from '@angular/common';

 @Component({
   selector: 'app-root',
   imports: [RouterOutlet, DatePipe],
   templateUrl: './app.html',
   styleUrl: './app.css'
 })
 export class App {
   constructor(public blogService: BlogService) { }
 }
```

### app.css
```css
 :host {
    --bright-blue: oklch(51.01% 0.274 263.83);
    --electric-violet: oklch(53.18% 0.28 296.97);
    --french-violet: oklch(47.66% 0.246 305.88);
    --vivid-pink: oklch(69.02% 0.277 332.77);
    --hot-red: oklch(61.42% 0.238 15.34);
    --orange-red: oklch(63.32% 0.24 31.68);
    --light-blue: oklch(47.646% 0.18015 265.073 / 0.712);
    --gray-900: oklch(19.37% 0.006 300.98);
    --gray-700: oklch(36.98% 0.014 302.71);
    --gray-400: oklch(70.9% 0.015 304.04);

    --vertical-gradient: linear-gradient(
      180deg,
      var(--bright-blue) 0%,
      var(--light-blue) 30%,
      white 100%
    );

    --horizontal-gradient: linear-gradient(
      90deg,
      var(--orange-red) 0%,
      var(--vivid-pink) 50%,
      var(--electric-violet) 100%
    );
  }

  main {
    width: 100%;
    min-height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    box-sizing: inherit;
    position: relative;
  }

  .content {
    display: flex;
    justify-content: space-around;
    width: 100%;
    max-width: 700px;
    margin-bottom: 3rem;
  }

  .left-side {
    display: block;
    max-width: 700px;
  }

  .divider {
    width: 1px;
    background: var(--vertical-gradient);
    margin-inline: 0.5rem;
  }

  @media screen and (max-width: 650px) {
    .content {
      flex-direction: column;
      width: max-content;
    }

    .divider {
      height: 1px;
      width: 100%;
      background: var(--horizontal-gradient);
      margin-block: 1.5rem;
    }
  }
```

4. Create page.component `ng generate component src/app/page`
5. Create blog.component `ng generate component src/app/blog`
### blog.html
```html
<markdown [src]="src()"></markdown>
```
### blog.ts
```typescript
import { Component, computed, input } from '@angular/core';
 import { DisqusModule } from 'ngx-disqus';
 import { MarkdownComponent } from 'ngx-markdown';
 import { MatExpansionModule } from '@angular/material/expansion';
 import { BlogService } from './blog.service';

 @Component({
   imports: [MarkdownComponent, DisqusModule, MatExpansionModule],
   templateUrl: './blog.html',
   styleUrl: './blog.css'
 })
 export class Blog {
   id = input.required();
   src = computed(() => `blog/${this.id()}.md`);

   constructor(blogService: BlogService) {
      
   }
 }
```
6. (optional) Install Disqus for commenting `npm i ngx-disqus --force`. Follow the instructions to setup a new site on [Disqus](www.disqus.com) and [ngx-disqus](https://github.com/MurhafSousli/ngx-disqus). 

## How to add content
1. 

## Versions used on Oct 14, 2025
- Angular 20.2
- ngx-markdown 3.0.1
- marked 16.4.0
- clipboard 2.0.11
