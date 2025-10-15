  import { Component, OnInit } from '@angular/core';
  import { Router, Route } from '@angular/router';

  @Component({
    template: `
      <h2>SiteMap</h2>
      <ul>
        @for (route of allRoutes; track route) {
          <li><a href="#">{{ route }}</a></li>
        }
      </ul>
    `,
  })
  export class SiteMapComponent {
    allRoutes: string[] = [];

    constructor(private router: Router) {
        this.traverseRouter('', this.router.config);
    }

    private traverseRouter(parentPath: string, config: Route[]): void {
      for (const route of config) {
        const currentPath = route.path ? `${parentPath}/${route.path}` : parentPath;
        this.allRoutes.push(currentPath);

        if (route.children) {
          this.traverseRouter(currentPath, route.children);
        }
      }
    }
}
