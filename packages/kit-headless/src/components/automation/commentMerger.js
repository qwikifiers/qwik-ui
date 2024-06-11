import * as fs from 'fs';
myFileReader('../select/select-root.tsx', 'select-root');
async function myFileReader(path, component_name) {
  // we do what we can because we must
  const magical_regex = /^\s*?\/[*]{2}\n?([\w|\W|]*?)\s*[*]{1,2}[/]\n[ ]*([\w|\W]*?;)$/gm;
  const cms = {};
  const sourceCode = fs.readFileSync(path, 'utf-8');
  let groups;

  while ((groups = magical_regex.exec(sourceCode)) !== null) {
    const bad = /^ *|(\* *)/g;
    const comment = groups[1].replaceAll(bad, '');
    const prop = groups[2];
    if (cms.hasOwnProperty(component_name)) {
      cms[component_name].push({ comment, prop });
      continue;
    }
    cms[component_name] = [{ comment, prop }];
  }

  console.log(cms);
  return cms;
}
