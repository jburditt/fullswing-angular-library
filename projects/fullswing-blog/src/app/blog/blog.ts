import { Component, computed, inject, input } from '@angular/core';
//import { DisqusModule } from 'ngx-disqus';
import { MarkdownComponent } from 'ngx-markdown';
import { MatExpansionModule } from '@angular/material/expansion';
import { BlogService, CategoryType } from './blog.service';
import { HttpClient } from '@angular/common/http';

export interface BlogMeta {
  title: string;
  categories: Array<CategoryType>;
  author?: string;
  date?: Date;
}

class BlogBase implements BlogMeta {
  title: string;
  categories: Array<CategoryType> = [];
  author?: string;
  date?: Date;

  constructor(initialValue: BlogMeta) {
    this.title = initialValue.title;
    this.categories = initialValue.categories;
    this.author = initialValue.author;
    this.date = initialValue.date;
  }

  protected update(value: BlogPage) {
    const blogService = inject(BlogService);
    if (this.title)
      blogService.setTitle(this.title);
    if (this.categories.length > 0)
      blogService.addCategories(this.categories);
    if (this.author)
      blogService.setAuthor(this.author);
    if (this.date)
      blogService.setDate(this.date);
  }
}

export class BlogPage extends BlogBase {
  constructor(initialValue: BlogMeta) {
    super(initialValue);
    this.update(this);
  }
}

export class BlogPageWithMetaFile extends BlogBase {
  constructor(filePath: string) {
    super({ title: "", categories: [] });
    this.title = "Loading...";
    const http = inject(HttpClient);
    http.get("/blog/" + filePath).subscribe((response: any) => {
      this.title = response.title;
      this.categories = response.categories;
      this.author = response.author;
      this.date = response.date;
      this.update(this);
    });
  }
}

@Component({
  imports: [MarkdownComponent/*, DisqusModule*/, MatExpansionModule],
  templateUrl: './blog.html',
  styleUrl: './blog.css'
})
export class Blog extends BlogPageWithMetaFile {
  id = input.required();
  src = computed(() => `blog/${this.id()}.md`);

  constructor() {
    super("doc-template.json");
  }
}
