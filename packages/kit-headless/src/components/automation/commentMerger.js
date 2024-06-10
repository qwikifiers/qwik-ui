import { log } from 'console';
import * as fs from 'fs';
myFileReader('../select/select-root.tsx');
async function myFileReader(path) {
  let esp_comment = '';
  const cms = {};
  const sourceCode = fs.readFileSync(path, 'utf-8');
  const component = /\/(\w+)\//.exec(path)[1];
  // large arr should not be a problem since only the first lines of file will be passed down
  const comments = sourceCode.toString().split('\n');
  function pairer(index, line) {
    return { desc: line, prop: comments[index + 1] };
  }
  for (let index = 0; index < comments.length; index++) {
    const line = comments[index];
    const singleLine = /^\s*\/[*]{2}(.*)[*]{1,2}\//;
    const starter = /\/[*]{2}$/;
    if (singleLine.test(line)) {
      const hell_reloaded = singleLine.exec(line)[1];
      if (cms.hasOwnProperty(component)) {
        cms[component].push(pairer(index, line));
        continue;
      }
      cms[component] = [pairer(index, line)];
      continue;
    }
    if (starter.test(line)) {
      index += 1;
      let nextLine = comments[index];
      let strg = '';
      do {
        nextLine = comments[index];
        strg += nextLine;
        index += 1;
      } while (!/[*][/]$/.test(nextLine) | (index > comments.length));
      strg = strg.replaceAll('\n', '');

      if (cms.hasOwnProperty(component)) {
        cms[component].push({ desc: strg, prop: comments[index] });
        continue;
      }
      cms[component] = [pairer(index, line)];
      continue;
    }
  }
  console.log(cms);
}
const magical_regex = /\/[*]{2}(\w|\W)*?[*][/]\n(\w|\W)*?;\n/g;
// TODO: fix case of multiple comment but start is not white space
