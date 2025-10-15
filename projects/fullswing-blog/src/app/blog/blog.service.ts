import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BlogService {
  public blog = signal<Blog>(new Blog());

  public addCategory(categoryType: CategoryType) {
    let cat = category[categoryType];
    this.blog().categories.push(cat);
  }

  public addCategories(categoryTypes: CategoryType[]) {
    for (let categoryType of categoryTypes) {
      let cat = category[categoryType];
      this.blog().categories.push(cat);
    }
  }

  public setAuthor(author: string) {
    this.blog().author = author;
  }

  public setDate(date: Date) {
    this.blog().date = date;
  }
}

export class Blog {
  categories: Array<Category> = [];
  author: string | undefined;
  date: Date | undefined;
}

type CategoryMapping = {
  [key in CategoryType]: Category;
}

class Category {
  key: CategoryType | undefined;
  colour: string = "red";

  constructor(key: CategoryType, colour: string = "red") {
    this.key = key;
    this.colour = colour;
  }}

const category: CategoryMapping = {
  Angular: new Category('Angular', 'hot-red'),
  TypeScript: new Category('TypeScript', 'bright-blue'),
  JavaScript: new Category('JavaScript', 'electric-pink'),
  Azure: new Category('Azure', 'light-blue'),
  GitHub: new Category('GitHub', 'gray-700')
}

export type CategoryType = "Angular" | "TypeScript" | "JavaScript" | 'Azure' | 'GitHub';
