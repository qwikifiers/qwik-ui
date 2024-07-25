import * as fs from 'fs';
import * as util from 'util';
import { extractPublicTypes } from '../automation/extract-type.js';
import { extractComments } from './extract-comment.js';
myFileReader('../select/select-root.tsx', 'select-root', './output.js');
async function myFileReader(path, output) {
  const component_name = /\/([\w-]*).tsx/.exec(path);
  const sourceCode = fs.readFileSync(path, 'utf-8');
  const comments = extractPublicTypes(component_name, sourceCode);
  const parsed = [];
  for (const comment of comments) {
    const api = extractComments([comment.label], comment.string);
    const pair = { [comment.label]: api };
    parsed.push(pair);
  }
  const componentAPI = { [component_name[1]]: parsed };
  console.log(util.inspect(componentAPI, false, 8));
}
