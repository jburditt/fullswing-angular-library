import { Routes } from '@angular/router';
import { Blog } from './blog/blog';
import { App } from './app';

export const routes: Routes = [
  {
    path: '',
    component: App
  },
  {
    path: 'blog/:id',
    component: Blog
  }
];
