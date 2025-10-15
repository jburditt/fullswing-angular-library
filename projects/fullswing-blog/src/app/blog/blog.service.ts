import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BlogService {
  public title = signal<string | null>(null);
  public categories = signal<Array<Category>>([]);
  public author = signal<string | null>(null);
  public date = signal<Date | null>(null);

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

export class Blog {
  title!: string;
  categories: Array<Category> = [];
  author!: string;
  date!: Date;
}

type CategoryMapping = {
  [key in CategoryType]: Category;
}

class Category {
  key: CategoryType;
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
