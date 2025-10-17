import { Component } from '@angular/core';
import { Blog, Category, RepositoryService } from '../db/db';
import { CommonModule } from '@angular/common';

@Component({
  template: `
    @for (category of categories; track category.key) {
      <div style="cursor:pointer" [ngClass]="categoryClass(category.key)" (click)="categoryToggle(category.key)">{{ category.key }}</div>
    }
    <br class="clear" />
    <div class="spacer10"></div>

    <h2>SiteMap</h2>

    <ul>
      @for (blog of filteredBlogs; track blog.route) {
        <li><a href="{{ blog.route }}">{{ blog.title }}</a> - {{ blog.date }}</li>
      }
    </ul>
  `,
  styles: `
    .pill:hover {
      background: color-mix(in srgb, var(--pill-accent) 1%, transparent);
    }
    .pill-active, .pill-active:hover {
      background: color-mix(in srgb, var(--pill-accent) 25%, transparent);
    }
  `,
  imports: [CommonModule]
})
export class SiteMapComponent {
  blogs: Blog[];
  filteredBlogs: Blog[];
  categories: Category[];
  categoryToggles: CategoryToggle[];

  constructor(public repositoryService: RepositoryService) {
    this.blogs = repositoryService.getAll();
    this.filteredBlogs = this.blogs;
    this.categories = this.repositoryService.getCategories();
    this.categoryToggles = this.categories.map((c) => new CategoryToggle(c.key, true));
  }

  protected categoryClass(key: string): string[] {
    return [
      this.categories.find(c => c.key == key)?.colour ?? "",
      "pill",
      this.categoryToggles.find(c => c.key == key)?.isActive ? "pill-active" : ""
    ];
  }

  protected categoryToggle(key: string) {
    let categoryToggle = this.categoryToggles.find(c => c.key == key);
    if (categoryToggle)
      categoryToggle.isActive = !categoryToggle.isActive;
    this.filteredBlogs = this.blogs.filter((b) => b.categories.every((c) => c in this.categoryToggles.filter((ct) => ct.isActive)));
  }
}

class CategoryToggle {
  key: string;
  isActive: boolean;
  constructor(key: string, isActive: boolean) {
    this.key = key;
    this.isActive = isActive;
  }
}
