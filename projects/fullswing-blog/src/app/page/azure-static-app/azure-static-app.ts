import { Component } from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';
import { Database } from '../../db/db';
import { BlogPage } from '../../blog/blog.service';

@Component({
  imports: [MarkdownComponent],
  templateUrl: './azure-static-app.html'
})
export class AzureStaticAppPage extends BlogPage {
  constructor() {
    super('/page/azure-static-app');
  }
}
