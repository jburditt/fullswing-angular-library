import { inject, Injectable, signal } from '@angular/core';
import { Blog, category, Category, CategoryType, RepositoryService } from '../db/db';

export class BlogPage {
  constructor(route: string) {
    const blogService = inject(BlogService);
    const repositoryService = inject(RepositoryService);
    const blog = repositoryService.getPage(route);
    console.log("route", route);
    console.log("page", blog);
    blogService.setBlog(blog);
  }
}

@Injectable({ providedIn: 'root' })
export class BlogService {
  public title = signal<string | null>(null);
  public categories = signal<Array<Category>>([]);
  public author = signal<string | null>(null);
  public date = signal<Date | null>(null);

  public setBlog(blog: Blog) {
    if (!blog)
      throw "Blog not found";
    if (blog.title)
      this.setTitle(blog.title);
    if (blog.categories?.length > 0)
      this.setCategories(blog.categories);
    if (blog.author)
      this.setAuthor(blog.author);
    if (blog.date)
      this.setDate(blog.date);
  }

  public setTitle(title: string) {
    this.title.set(title);
  }

  public addCategory(categoryType: CategoryType) {
    let cat: Category = category[categoryType];
    this.categories.update(value => [...value, cat]);
  }

  public setCategories(categoryTypes: CategoryType[]) {
    let categories: Category[] = [];
    for (let categoryType of categoryTypes) {
      let cat: Category = category[categoryType];
      categories.push(cat);
    }
    //console.log("categories", this.categories());
    //this.categories.update(value => [...value, ...categories]);
    this.categories.set(categories);
  }

  public setAuthor(author: string) {
    this.author.set(author);
  }

  public setDate(date: Date) {
    this.date.set(date);
  }
}
