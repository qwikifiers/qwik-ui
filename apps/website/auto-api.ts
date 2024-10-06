import * as fs from 'fs';
import { resolve } from 'path';
import { ViteDevServer } from 'vite';
import { default as Parser, Query } from 'tree-sitter';
import { default as TS } from 'tree-sitter-typescript';
const parser = new Parser();

/**
TO WHOM IT MAY CONCERN:

if by some reason you need to refactor the query below and don't know where to starts, below are what I consider to be the must-know parts.

1) Tree-Sitter query docs: https://tree-sitter.github.io/tree-sitter/using-parsers#query-syntax
1b) Put particular attention to the following sections: capturing nodes, wildcard nodes, and anchors

2) Have a way of being able to see the tree-sitter AST in realtime. The ideal setup comes included in Neovim. In ex mode, simply run
the command below and you'll have the file's AST viewer open in realtime: InspectTree
**/

const query = new Query(
  TS.tsx,
  `declaration: (type_alias_declaration
  name: (type_identifier) @subComponentName
    (intersection_type
    (object_type

      (comment) @comment
      .
      (property_signature
          name: (_) @prop
          type: (type_annotation (_) @type)
      )
    )
  )
)
`,
);
parser.setLanguage(TS.tsx);
export default function autoAPI() {
  return {
    name: 'watch-monorepo-changes',
    configureServer(server: ViteDevServer) {
      const watchPath = resolve(__dirname, '../../packages/kit-headless');
      server.watcher.on('change', (file: string) => {
        if (file.startsWith(watchPath)) {
          loopOnAllChildFiles(file);
        }
      });
    },
  };
}
// the object should have this general structure, arranged from parent to child
// componentName:[subComponent,subcomponent,...] & componentName comes from the dir
// subComponentName/type alias:[publicType,publicType,...] & subcomponent comes from the file under dir
// publicType:[{ comment,prop,type },{ comment,prop,type },...] & publicType comes from type inside file
// THEY UPPER-MOST KEY IS ALWAYS USED AS A HEADING
export type ComponentParts = Record<string, SubComponents>;
type SubComponents = SubComponent[];
export type SubComponent = Record<string, PublicType[]>;
export type PublicType = Record<string, ParsedProps[]>;
type ParsedProps = {
  comment: string;
  prop: string;
  type: string;
};
function parseSingleComponentFromDir(
  path: string,
  ref: SubComponents,
): SubComponents | undefined {
  const component_name = /\/([\w-]*).tsx/.exec(path);
  if (component_name === null || component_name[1] === null) {
    // may need better behavior
    return;
  }
  const sourceCode = fs.readFileSync(path, 'utf-8');
  const tree = parser.parse(sourceCode);
  const parsed: PublicType[] = [];
  function topKey(obj: { [x: string]: any } | undefined) {
    return obj ? Object.keys(obj)[0] : '';
  }
  const matches = query.matches(tree.rootNode);
  matches.forEach((match) => {
    const last: PublicType = parsed[parsed.length - 1];
    let subComponentName = '';
    const parsedProps: ParsedProps = { comment: '', prop: '', type: '' };
    match.captures.forEach((lol) => {
      //statetements are ordered as they appear in array
      if (lol.name === 'subComponentName' && subComponentName != lol.node.text) {
        subComponentName = lol.node.text;
      }
      if (lol.name === 'comment') {
        parsedProps.comment = lol.node.text;
      }

      if (lol.name === 'prop') {
        parsedProps.prop = lol.node.text;
      }

      if (lol.name === 'type') {
        parsedProps.type = lol.node.text;
        if (subComponentName === topKey(last)) {
          last[topKey(last)].push(parsedProps);
        } else {
          parsed.push({ [subComponentName]: [parsedProps] });
        }
      }
    });
  });

  const completeSubComponent: SubComponent = { [component_name[1]]: parsed };
  ref.push(completeSubComponent);
  return ref;
}

function writeToDocs(fullPath: string, componentName: string, api: ComponentParts) {
  if (fullPath.includes('kit-headless')) {
    const relDocPath = `../website/src/routes//docs/headless/${componentName}`;
    const fullDocPath = resolve(__dirname, relDocPath);
    const dirPath = fullDocPath.concat('/auto-api');

    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath);
    }
    const json = JSON.stringify(api, null, 2);
    const hacky = `export const api=${json}`;

    try {
      fs.writeFileSync(dirPath.concat('/api.ts'), hacky);
      console.log('auto-api: succesfully genereated new json!!! :)');
    } catch (err) {
      return;
    }
  }
}
function loopOnAllChildFiles(filePath: string) {
  const childComponentRegex = /\/([\w-]*).tsx$/.exec(filePath);
  if (childComponentRegex === null) {
    return;
  }
  const parentDir = filePath.replace(childComponentRegex[0], '');
  const componentRegex = /\/(\w*)$/.exec(parentDir);
  if (!fs.existsSync(parentDir) || componentRegex == null) {
    return;
  }
  const componentName = componentRegex[1];
  const allParts: SubComponents = [];
  const store: ComponentParts = { [componentName]: allParts };
  fs.readdirSync(parentDir).forEach((fileName) => {
    if (/tsx$/.test(fileName)) {
      const fullPath = parentDir + '/' + fileName;
      parseSingleComponentFromDir(fullPath, store[componentName]);
    }
  });

  writeToDocs(filePath, componentName, store);
}
