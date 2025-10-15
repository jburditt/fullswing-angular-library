import { Routes } from '@angular/router';
import { Blog } from './blog/blog';
import { App } from './app';
import { AzureStaticAppPage } from './page/azure-static-app/azure-static-app';

export const routes: Routes = [
  {
    path: '',
    component: App
  },
  {
    path: 'blog/:id',
    component: Blog
  },
  {
    path: 'page/azure-static-app',
    component: AzureStaticAppPage
  }
];
