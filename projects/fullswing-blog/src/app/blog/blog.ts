import { Component, computed, input } from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
  selector: 'app-blog',
  imports: [MarkdownComponent],
  templateUrl: './blog.html',
  styleUrl: './blog.css'
})
export class Blog {
  id = input.required();
  src = computed(() => `blog/${this.id()}.md`);
}
