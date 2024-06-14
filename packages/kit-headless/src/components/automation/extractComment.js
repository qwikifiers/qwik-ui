import * as fs from 'fs';
import * as util from 'util';
myFileReader('../select/select-root.tsx', 'select-root', './output.js');
async function myFileReader(path, component_name, output) {
  // we do what we can because we must
  const magical_regex =
    /^\s*?\/[*]{2}\n?([\w|\W|]*?)\s*[*]{1,2}[/]\n[ ]*([\w|\W]*?): ([\w|\W]*?)$/gm;
  const cms = {};
  const sourceCode = fs.readFileSync(path, 'utf-8');
  let groups;

  while ((groups = magical_regex.exec(sourceCode)) !== null) {
    const trimStart = /^ *|(\* *)/g;
    const comment = groups[1].replaceAll(trimStart, '');
    const prop = groups[2];
    const type = groups[3];
    if (cms.hasOwnProperty(component_name)) {
      cms[component_name].push({ comment, prop, type });
      continue;
    }
    cms[component_name] = [{ comment, prop, type }];
  }
  const idk = `export const output=${util.inspect(cms)}`;
  console.log(cms);
  try {
    fs.writeFileSync(output, idk);
  } catch (err) {
    console.error(err);
  }
}
