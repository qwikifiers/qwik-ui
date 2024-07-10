import { readdirSync } from 'fs';
export function objectifier(path) {
  const jsx = {};
  const files = readdirSync(path, { recursive: true });
  for (let index = 0; index < files.length; index++) {
    const file = files[index];
    const isJSX = /.*tsx/.test(file);

    if (isJSX) {
      const title = /(.*)[/]/.exec(file)[1];
      getPathAndName(file);
      if (!jsx.hasOwnProperty(title)) {
        jsx[title] = [file];
        continue;
      }
      jsx[title].push(file);
    }
  }
}

function getPathAndName(strg) {
  const title = /(.*)[/]/.exec(strg)[1];
  const subTitle = /\/(.*)\.tsx/.exec(strg)[1];
  if (subTitle.includes('-')) {
  }
}
objectifier('..');
