import { Component, computed, inject, input, OnInit } from '@angular/core';
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

  protected update(blogService: BlogService, value: BlogPage) {
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
    const blogService = inject(BlogService);
    this.update(blogService, this);
  }
}

@Component({
  imports: [MarkdownComponent/*, DisqusModule*/, MatExpansionModule],
  templateUrl: './blog.html',
  styleUrl: './blog.css'
})
export class Blog implements OnInit {
  id = input.required();
  src = computed(() => `blog/${this.id()}.md`);

  constructor(private http: HttpClient, private blogService: BlogService) {
    //super();
  }

  ngOnInit(): void {
    this.loadMetaFile(`${this.id()}.json`);
  }

  // TODO unsubscribe
  protected loadMetaFile(filePath: string) {
    this.http.get(`/blog/${filePath}`).subscribe((response: any) => {
      console.log("test", response);
      // let blogPage = new BlogPage({
      //   title: response.title,
      //   categories: response.categories,
      //   author: response.author,
      //   date: response.date
      // });
      // //this.update(blogService, this);
      if (response.title)
         this.blogService.setTitle(response.title);
      // if (blogPage.categories.length > 0)
      //   this.blogService.addCategories(blogPage.categories);
      // if (blogPage.author)
      //   this.blogService.setAuthor(blogPage.author);
      // if (blogPage.date)
      //   this.blogService.setDate(blogPage.date);
    });
  }
}
