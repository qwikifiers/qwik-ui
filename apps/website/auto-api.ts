import * as fs from 'fs';
import { resolve } from 'path';
import * as util from 'util';
import { ViteDevServer } from 'vite';
export default function autoAPI() {
  return {
    name: 'watch-monorepo-changes',
    configureServer(server: ViteDevServer) {
      const watchPath = resolve(__dirname, '../../packages/kit-headless');
      server.watcher.on('change', (file: string) => {
        if (file.startsWith(watchPath)) {
          console.log(`File changed: ${file}`);
          singleComponent(file);
        }
      });
    },
  };
}
function singleComponent(path: string) {
  const component_name = /\/([\w-]*).tsx/.exec(path);
  if (component_name === null || component_name[1] === null) {
    // may need better behavior
    return;
  }
  const lol = getOutputPath(path, component_name[1]);
  console.log('PATH: ', lol);
  handleIntialDir(lol);

  const sourceCode = fs.readFileSync(path, 'utf-8');
  const comments = extractPublicTypes(sourceCode);
  const parsed = [];
  for (const comment of comments) {
    const api = extractComments(comment.string);
    const pair = { [comment.label]: api };
    parsed.push(pair);
  }
  const componentAPI = { [component_name[1]]: parsed };
}
function extractPublicTypes(strg: string) {
  const getPublicTypes = /type Public([A-Z][\w]*)*[\w\W]*?{([\w|\W]*?)}(;| &)/gm;
  const cms = [];
  let groups;
  while ((groups = getPublicTypes.exec(strg)) !== null) {
    const string = groups[2];
    cms.push({ label: groups[1], string });
  }
  return cms;
}
function extractComments(strg: string) {
  const magical_regex =
    /^\s*?\/[*]{2}\n?([\w|\W|]*?)\s*[*]{1,2}[/]\n[ ]*([\w|\W]*?): ([\w|\W]*?)$/gm;

  const cms = [];
  let groups;

  while ((groups = magical_regex.exec(strg)) !== null) {
    const trimStart = /^ *|(\* *)/g;
    const comment = groups[1].replaceAll(trimStart, '');
    const prop = groups[2];
    const type = groups[3];
    cms.push({ comment, prop, type });
  }
  return cms;
}

function getOutputPath(ogPath: string, componentName: string): string {
  return resolve(__dirname, `apps/website/src/routes/docs/headless/${componentName}`);
  return ogPath;
}
function handleIntialDir(path: string) {
  if (fs.existsSync(path + '/api.ts')) {
    console.log('YAYA');
    return;
  }

  console.log('NAYAYA');
}
