# How to create a simple Angular blog

Today, I set out to setup a very basic Angular blog with minimal features. As per usual, I packed in more than I planned because I love shiny new features; even when I can recognize that it is on the cusp of just adding clutter.

Optional features:
- Static Site Generation
- Zoneless
- Markdown
- Comments

Follow these steps:

1. Create a new a new standalone Angular application `ng new angular-blog`. At the time of writing, I installed version 20.2. I suggest enabling static site generation (SSG/SSR) and zoneless, to keep your blog lightweight and fast.
2. Follow the steps here to install [ngx-markdown](https://www.npmjs.com/package/ngx-markdown).
3. Edit app.html to be your template used for all your pages and blogs
4. Create page.component `ng generate component src/app/page`
5. Create blog.component `ng generate component src/app/blog`
6. (optional) Install Disqus for commenting `npm i ngx-disqus --force`. Follow the instructions to setup a new site on [Disqus](www.disqus.com) and [ngx-disqus](https://github.com/MurhafSousli/ngx-disqus). 
