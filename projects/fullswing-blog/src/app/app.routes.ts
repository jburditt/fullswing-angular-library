import { Routes } from '@angular/router';
import { Blog } from './blog/blog';
import { App } from './app';
import { AzureStaticAppPage } from './page/azure-static-app/azure-static-app';
import { AngularBlogPage } from './page/angular-blog/angular-blog';
import { SiteMapComponent as SiteMapPage } from './sitemap/sitemap';

export const routes: Routes = [
  {
    path: '',
    component: App
  },
  {
    path: 'sitemap',
    component: SiteMapPage
  },
  {
    path: 'blog/:id',
    component: Blog
  },
  {
    path: 'page/azure-static-app',
    component: AzureStaticAppPage
  },
  {
    path: 'page/angular-blog',
    component: AngularBlogPage
  }
];
