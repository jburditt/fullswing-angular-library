import { Component } from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';
import { BlogService } from '../../blog/blog.service';

@Component({
  imports: [MarkdownComponent],
  templateUrl: './azure-static-app.html'
})
export class AzureStaticAppPage {
  constructor(blogService: BlogService) {
    blogService.addCategories(['Angular', 'Azure', 'GitHub']);
    blogService.setAuthor('Jebb Burditt');
    blogService.setDate(new Date(2025, 10, 15));
  }
}
