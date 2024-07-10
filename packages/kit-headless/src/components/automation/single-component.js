import * as fs from 'fs';
import { extractPublicTypes } from '../automation/extract-type.js';
import { extractComments } from './extract-comment.js';
myFileReader('../select/select-root.tsx', 'select-root', './output.js');
async function myFileReader(path, component_name, output) {
  // we do what we can because we must
  const sourceCode = fs.readFileSync(path, 'utf-8');
  const comments = extractPublicTypes(component_name, sourceCode);
  const stg = comments[component_name][0].comments;
  const api = extractComments(component_name, comments[component_name][0].comments);
  console.log(comments, api);
}
