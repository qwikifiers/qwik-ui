import * as fs from 'fs';
import * as util from 'util';
export default function singleComponent(path: string) {
  console.log('HI andrew ', path);
  const component_name = /\/([\w-]*).tsx/.exec(path);
  if (component_name === null || component_name[1] === null) {
    // may need better behavior
    return;
  }
  const sourceCode = fs.readFileSync(path, 'utf-8');
  const comments = extractPublicTypes(sourceCode);
  const parsed = [];
  for (const comment of comments) {
    const api = extractComments(comment.string);
    const pair = { [comment.label]: api };
    parsed.push(pair);
  }
  const componentAPI = { [component_name[1]]: parsed };
  console.log(util.inspect(componentAPI, false, 8));
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
