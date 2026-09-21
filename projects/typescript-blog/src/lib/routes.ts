import path from 'node:path';

function getRouteSegments(route: string): string[] {
  if (route === '/') {
    return [];
  }

  return route.replace(/^\/+|\/+$/g, '').split('/').filter(Boolean);
}

export function getOutputPath(route: string, distDirectory: string): string {
  if (route === '/') {
    return path.join(distDirectory, 'index.html');
  }

  return path.join(distDirectory, ...getRouteSegments(route), 'index.html');
}

export function getAssetPrefix(route: string): string {
  const segments = getRouteSegments(route);
  return '../'.repeat(segments.length);
}

export function getRelativeHref(fromRoute: string, toRoute: string): string {
  const fromDirectory = getRouteSegments(fromRoute).join('/');
  const toDirectory = getRouteSegments(toRoute).join('/');
  const relativePath = path.posix.relative(fromDirectory || '.', toDirectory || '.');

  if (!relativePath || relativePath === '') {
    return './';
  }

  return `${relativePath.replace(/\/$/, '')}/`;
}
