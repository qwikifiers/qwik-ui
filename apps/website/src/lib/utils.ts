export function removeDocsFromPath(pathname: string): string {
  const basePath = '/docs/';
  if (pathname.startsWith(basePath)) {
    return pathname.slice(basePath.length);
  } else {
    return pathname;
  }
}
