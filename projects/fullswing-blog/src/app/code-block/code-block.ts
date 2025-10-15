import { Component, computed, input } from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'fs-code',
  imports: [MarkdownComponent, MatExpansionModule],
  template: '<h3>{{ title() }}</h3><markdown lineNumbers clipboard ngPreserveWhitespaces ngNonBindable [src]="src()">'
})
export class CodeBlockComponent {
  title = input();
  src = input.required<string>();
}
