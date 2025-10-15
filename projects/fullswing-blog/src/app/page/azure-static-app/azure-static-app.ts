import { Component } from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';
import { BlogService } from '../../blog/blog.service';
import { BlogPage } from '../../blog/blog';

@Component({
  imports: [MarkdownComponent],
  templateUrl: './azure-static-app.html'
})
export class AzureStaticAppPage extends BlogPage {
  constructor(blogService: BlogService) {
    super(blogService, {
      title: "Deploy Azure Static Web App [from Angular workspace]",
      categories: ['Angular', 'Azure', 'GitHub'],
      author: 'Jebb Burditt',
      date: new Date(2025, 10, 15)
    });
  }
}
