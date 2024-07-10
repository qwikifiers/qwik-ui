import * as fs from 'fs';
import * as util from 'util';
import { extractPublicTypes } from '../automation/extract-type.js';
import { extractComments } from './extract-comment.js';
myFileReader('../select/select-root.tsx', 'select-root', './output.js');
async function myFileReader(path, component_name, output) {
  const sourceCode = fs.readFileSync(path, 'utf-8');
  const comments = extractPublicTypes(component_name, sourceCode);
  const total = [];
  for (const comment of comments) {
    const api = extractComments([comment.label], comment.string);
    const pair = { [comment.label]: api };
    total.push(pair);
  }
  console.log(util.inspect(total, false, 8));
}
