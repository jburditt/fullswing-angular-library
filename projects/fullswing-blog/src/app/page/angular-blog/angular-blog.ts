import { Component } from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';
import { BlogService } from '../../blog/blog.service';
import { CodeBlockComponent } from '../../code-block/code-block';

@Component({
  imports: [MarkdownComponent, CodeBlockComponent],
  templateUrl: './angular-blog.html'
})
export class AngularBlogPage {
  constructor(blogService: BlogService) {
    blogService.addCategories(['Angular']);
    blogService.setAuthor('Jebb Burditt');
    blogService.setDate(new Date(2025, 10, 14));
  }
}
