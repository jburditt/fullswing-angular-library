import { Component } from '@angular/core';
import { CodeBlockComponent } from '../../code-block/code-block';
import { BlogPage } from '../../blog/blog.service';

@Component({
  imports: [CodeBlockComponent],
  templateUrl: './angular-blog.html'
})
export class AngularBlogPage extends BlogPage {
  constructor() {
    super('/page/angular-blog');
  }
}
