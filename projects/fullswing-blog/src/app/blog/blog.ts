import { Component, computed, input } from '@angular/core';
//import { DisqusModule } from 'ngx-disqus';
import { MarkdownComponent } from 'ngx-markdown';
import { MatExpansionModule } from '@angular/material/expansion';
import { BlogService, CategoryType } from './blog.service';

export class BlogPage {
  title: string;
  categories: Array<CategoryType> = [];
  author?: string;
  date?: Date;

  constructor(blogService: BlogService, initialValue: BlogPage) {
    this.title = initialValue.title;
    this.categories = initialValue.categories;
    this.author = initialValue.author;
    this.date = initialValue.date;
    if (this.title)
      blogService.setTitle(this.title);
    if (this.categories.length > 0)
      blogService.addCategories(this.categories);
    if (this.author)
      blogService.setAuthor(this.author);
    if (this.date)
      blogService.setDate(this.date);
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
    super(blogService, { categories: ['Angular'], title: 'Not implemented yet' });
  }
}
