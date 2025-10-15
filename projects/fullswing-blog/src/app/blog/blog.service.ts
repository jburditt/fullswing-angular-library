import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BlogService {
  public blog = signal<Blog>(new Blog());

  public addCategory(categoryType: CategoryType) {
    let cat = category[categoryType];
    this.blog().categories.push(cat);
  }
}

export class Blog {
  categories: Array<Category> = [];
}

type CategoryMapping = {
  [key in CategoryType]: Category;
}

export class Category {
  key: CategoryType | undefined;
  colour: string = "red";

  constructor(key: CategoryType, colour: string = "red") {
    this.key = key;
    this.colour = colour;
  }}

export const category: CategoryMapping = {
  Angular: new Category('Angular', 'red'),
  TypeScript: new Category('TypeScript', 'blue'),
  JavaScript: new Category('JavaScript', 'violet')
}

type CategoryType = "Angular" | "TypeScript" | "JavaScript"
