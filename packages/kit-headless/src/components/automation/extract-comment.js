import * as fs from 'fs';
import * as util from 'util';
myFileReader('../select/select-root.tsx', 'select-root', './output.js');
async function myFileReader(path, component_name, output) {
  // we do what we can because we must
  const sourceCode = fs.readFileSync(path, 'utf-8');
  const cms = extractComments(component_name, sourceCode);
  const idk = `export const output=${util.inspect(cms)}`;
  try {
    fs.writeFileSync(output, idk);
  } catch (err) {
    console.error(err);
  }
}
export function extractComments(component_name, strg) {
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
