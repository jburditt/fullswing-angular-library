import { Component } from '@angular/core';
import { CodeBlockComponent } from '../../code-block/code-block';
import { MarkdownComponent } from 'ngx-markdown';
import { BlogPage } from '../../blog/blog.service';

@Component({
  imports: [CodeBlockComponent, MarkdownComponent],
  templateUrl: './azure-static-app.html',
  preserveWhitespaces: true
})
export class AzureStaticAppPage extends BlogPage {
  constructor() {
    super('/page/azure-static-app');
  }
}
