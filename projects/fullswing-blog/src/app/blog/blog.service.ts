import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BlogService {
  public blog = signal<Blog>(new Blog());

  public addCategory(categoryKey: CategoryKey) {
    let category = Category.get(categoryKey);
    this.blog().categories.push(category);
  }
}

export class Blog {
  categories: Array<Category> = [];
}

export class Category {
  key: CategoryKey | undefined;
  colour: string = "red";

  constructor(key: CategoryKey, colour: string = "red") {
    this.key = key;
    this.colour = colour;
  }

  static get(key: CategoryKey): Category {
    switch (key) {
      case CategoryKey.Angular:
        return new Category(CategoryKey.Angular, "red");
      case CategoryKey.TypeScript:
        return new Category(CategoryKey.TypeScript, "blue");
      case CategoryKey.JavaScript:
        return new Category(CategoryKey.JavaScript, "violet");
    }
  }
}

export enum CategoryKey {
  Angular,
  TypeScript,
  JavaScript
}
