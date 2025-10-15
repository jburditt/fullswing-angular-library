import { Component, computed, input } from '@angular/core';
//import { DisqusModule } from 'ngx-disqus';
import { MarkdownComponent } from 'ngx-markdown';
import { MatExpansionModule } from '@angular/material/expansion';
import { BlogService } from './blog.service';

@Component({
  imports: [MarkdownComponent/*, DisqusModule*/, MatExpansionModule],
  templateUrl: './blog.html',
  styleUrl: './blog.css'
})
export class Blog {
  id = input.required();
  src = computed(() => `blog/${this.id()}.md`);

  constructor(blogService: BlogService) {
    blogService.addCategory('Angular');
    
  }
}
