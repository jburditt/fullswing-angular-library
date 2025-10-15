import { Component, computed, input } from '@angular/core';
//import { DisqusModule } from 'ngx-disqus';
import { MarkdownComponent } from 'ngx-markdown';
import { MatExpansionModule } from '@angular/material/expansion';
import { BlogService, CategoryType } from './blog.service';

export class BlogPage {
  title?: string;
  categories: Array<CategoryType> = [];
  author?: string;
  date?: Date;

  constructor(blogService: BlogService, initialValue: BlogPage) {
    //blogService.setTitle(title);
    blogService.addCategories(['Angular']);
    blogService.setAuthor('Jebb Burditt');
    blogService.setDate(new Date(2025, 10, 14));
  }
}

@Component({
  imports: [MarkdownComponent/*, DisqusModule*/, MatExpansionModule],
  templateUrl: './blog.html',
  styleUrl: './blog.css'
})
export class Blog extends BlogPage {
  id = input.required();
  src = computed(() => `blog/${this.id()}.md`);

  constructor(blogService: BlogService) {
    super(blogService, { categories: ['Angular'] });
  }
}
