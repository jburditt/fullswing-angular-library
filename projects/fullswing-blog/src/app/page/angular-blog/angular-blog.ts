import { Component } from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';
import { BlogService } from '../../blog/blog.service';
import { CodeBlockComponent } from '../../code-block/code-block';
import { BlogPage } from '../../blog/blog';

@Component({
  imports: [MarkdownComponent, CodeBlockComponent],
  templateUrl: './angular-blog.html'
})
export class AngularBlogPage extends BlogPage {
  constructor(blogService: BlogService) {
    super(blogService, {
      title: "How to create a simple Angular blog",
      categories: ['Angular'],
      author: 'Jebb Burditt',
      date: new Date(2025, 10, 14)
    });
  }
}
