import { readdirSync } from 'fs';
export function objectifier() {
  const jsx = {};
  const files = readdirSync('..', { recursive: true });
  for (let index = 0; index < files.length; index++) {
    const file = files[index];
    const isJSX = /.*tsx/.test(file);

    if (isJSX) {
      const title = /(.*)[/]/.exec(file)[1];
      if (!jsx.hasOwnProperty(title)) {
        jsx[title] = [file];
        continue;
      }
      jsx[title].push(file);
    }
  }
}
