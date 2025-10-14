import { DatePipe } from '@angular/common';
import { Component, computed, input, ChangeDetectionStrategy } from '@angular/core';
import { DisqusModule } from 'ngx-disqus';
import { MarkdownComponent } from 'ngx-markdown';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-blog',
  imports: [MarkdownComponent, DatePipe, DisqusModule, MatExpansionModule],
  templateUrl: './blog.html',
  styleUrl: './blog.css',
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class Blog {
  id = input.required();
  src = computed(() => `blog/${this.id()}.md`);
  today = new Date();
}
