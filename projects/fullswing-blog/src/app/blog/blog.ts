import { Component, computed, inject, input, OnDestroy, OnInit } from '@angular/core';
//import { DisqusModule } from 'ngx-disqus';
import { MarkdownComponent } from 'ngx-markdown';
import { MatExpansionModule } from '@angular/material/expansion';
import { BlogService, CategoryType } from './blog.service';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

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

  protected update(blogService: BlogService, value: BlogPage) {
    if (this.title)
      blogService.setTitle(this.title);
    if (this.categories.length > 0)
      blogService.setCategories(this.categories);
    if (this.author)
      blogService.setAuthor(this.author);
    if (this.date)
      blogService.setDate(this.date);
  }
}

export class BlogPage extends BlogBase {
  constructor(initialValue: BlogMeta) {
    super(initialValue);
    const blogService = inject(BlogService);
    this.update(blogService, this);
  }
}

@Component({
  imports: [MarkdownComponent/*, DisqusModule*/, MatExpansionModule],
  templateUrl: './blog.html',
  styleUrl: './blog.css'
})
export class Blog implements OnInit, OnDestroy {
  id = input.required();
  src = computed(() => `blog/${this.id()}.md`);
  getMetaFile: Subscription | undefined;

  constructor(private http: HttpClient, private blogService: BlogService) {
    //super();
  }

  ngOnInit(): void {
    this.loadMetaFile(`${this.id()}.json`);
  }

  ngOnDestroy(): void {
    this.getMetaFile?.unsubscribe();
  }

  protected loadMetaFile(filePath: string) {
    this.getMetaFile = this.http.get(`/blog/${filePath}`).subscribe((response: any) => {
      // TODO add this.blogService.setBlog(response)
      if (response.title)
         this.blogService.setTitle(response.title);
      if (response.categories.length > 0)
        this.blogService.setCategories(response.categories);
      if (response.author)
        this.blogService.setAuthor(response.author);
      if (response.date)
        this.blogService.setDate(response.date);
    });
  }
}
