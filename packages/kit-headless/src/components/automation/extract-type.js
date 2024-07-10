import * as fs from 'fs';
import * as util from 'util';
async function myFileReader(path, component_name, output) {
  const sourceCode = fs.readFileSync(path, 'utf-8');
  const cms = extractPublicTypes(component_name, sourceCode);
  const strg = `export const output=${util.inspect(cms)}`;
  try {
    fs.writeFileSync(output, strg);
  } catch (err) {
    console.error(err);
  }
}

export function extractPublicTypes(component_name, strg) {
  const getPublicTypes = /type Public[\w\W]*?{([\w|\W]*?)}(;| &)/gm;
  const cms = {};
  let groups;
  while ((groups = getPublicTypes.exec(strg)) !== null) {
    const comments = groups[1];
    if (cms.hasOwnProperty(component_name)) {
      cms[component_name].push({ comments });
      continue;
    }
    cms[component_name] = [{ comments }];
  }
  return cms;
}
myFileReader('../select/select-root.tsx', 'select-root', './output.js');
