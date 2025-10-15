import { RenderMode, ServerRoute } from '@angular/ssr';

export const routesIDs: string[] = [
  'doc-template'
];

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'blog/:id',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const ids = routesIDs;
      return ids.map(id => ({ id }));
    }
  }
];
