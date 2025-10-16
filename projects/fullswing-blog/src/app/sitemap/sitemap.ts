import { Component, OnInit } from '@angular/core';
import { Router, Route } from '@angular/router';
import { routesIDs } from '../app.routes.server';

class Site {
  route: string;
  title: string;
  constructor(route: string, title?: string) {
    this.route = route;
    this.title = title ?? route;
  }
}

@Component({
  template: `
    <h2>SiteMap</h2>
    <ul>
      @for (site of sites; track site.route) {
        <li><a href="{{ site.route }}">{{ site.route }}</a></li>
      }
    </ul>
  `,
})
export class SiteMapComponent {
  sites: Site[] = [];

  constructor(private router: Router) {
    this.traverseRouter('', this.router.config)
    let routes = routesIDs.map(route => new Site(`/blog/${route}`));
    console.log("routes", routes);
    // TODO figure out why this doesn't work
    //this.sites.concat(routes);
    for (let route of routes) {
      this.sites.push(route);
    }
  }

  private traverseRouter(parentPath: string, config: Route[]): void {
    for (const route of config) {
      const currentPath = route.path ? `${parentPath}/${route.path}` : parentPath;

      if (currentPath.startsWith('/page')) {
        let site = new Site(currentPath, undefined);
        this.sites.push(site);
      }

      if (route.children) {
        this.traverseRouter(currentPath, route.children);
      }
    }
  }
}
