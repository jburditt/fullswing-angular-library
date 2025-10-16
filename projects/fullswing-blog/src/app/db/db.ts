import { Injectable } from '@angular/core';
import dataJson from '../../../public/data.json';

export class Blog {
  title?: string;
  categories: Array<CategoryType> = [];
  author?: string;
  date?: Date;
  route: string;

  constructor(route: string) {
    this.route = route;
  }
}

type CategoryMapping = {
  [key in CategoryType]: Category;
}

export class Category {
  key: CategoryType;
  colour: string = "red";

  constructor(key: CategoryType, colour: string = "red") {
    this.key = key;
    this.colour = colour;
  }
}

export const category: CategoryMapping = {
  Angular: new Category('Angular', 'hot-red'),
  TypeScript: new Category('TypeScript', 'bright-blue'),
  JavaScript: new Category('JavaScript', 'electric-pink'),
  Azure: new Category('Azure', 'light-blue'),
  GitHub: new Category('GitHub', 'gray-700')
}

export type CategoryType = "Angular" | "TypeScript" | "JavaScript" | 'Azure' | 'GitHub';

export class Database {
  blogs: { [key: string]: Blog } = {};
  pages: { [key: string]: Blog } = {};

  constructor() {
    for (let blog of dataJson.blogs as unknown as Blog[]) {
      this.blogs[blog.route] = blog as Blog;
    }
    for (let page of dataJson.pages as unknown as Blog[]) {
      this.pages[page.route] = page as Blog;
    }
  }
}

@Injectable({ providedIn: 'root' })
export class RepositoryService {
  private db: Database = new Database();

  getBlog(route: string): Blog {
    return this.db.blogs[route];
  }

  getPage(route: string): Blog {
    return this.db.pages[route];
  }
}
