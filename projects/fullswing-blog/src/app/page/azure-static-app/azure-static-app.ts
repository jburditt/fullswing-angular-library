import { Component } from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';
import { BlogService, Category, CategoryKey } from '../../blog/blog.service';

@Component({
  imports: [MarkdownComponent],
  templateUrl: './azure-static-app.html'
})
export class AzureStaticAppPage {
  constructor(blogService: BlogService) {
    blogService.addCategory(CategoryKey.Angular);
  }
}
