import * as fs from 'fs';
import { resolve } from 'path';
import { ViteDevServer } from 'vite';
import Parser, { Query } from 'tree-sitter';
import TS from 'tree-sitter-typescript';

const parser = new Parser();

/**
 * Tree-Sitter query docs: https://tree-sitter.github.io/tree-sitter/using-parsers#query-syntax
 * Pay particular attention to the following sections: capturing nodes, wildcard nodes, and anchors.
 *
 * To have a way of being able to see the Tree-Sitter AST in real-time: the ideal setup comes included in Neovim. In ex mode, simply run
 * the command below and you'll have the file's AST viewer open in real-time: `:InspectTree`
 **/

const query = new Query(
  TS.tsx,
  `declaration: 
    (type_alias_declaration
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

// The object should have this general structure, arranged from parent to child
// componentName: [subComponent, subComponent, ...] & componentName comes from the directory
// subComponentName/type alias: [PublicType, PublicType, ...] & subComponent comes from the file under directory
// PublicType: [{ comment, prop, type }, { comment, prop, type }, ...] & PublicType comes from type inside file
// THE UPPER-MOST KEY IS ALWAYS USED AS A HEADING

export type ComponentParts = Record<string, SubComponents>;
type SubComponents = SubComponent[];
export type SubComponent = Record<string, PublicType[]>;
export type PublicType = Record<string, ParsedProps[]>;
type ParsedProps = {
  comment: string;
  prop: string;
  type: string;
};

/**
 * Note: For this code to run, you need to prefix the type with 'Public' (e.g., 'PublicMyType') in your TypeScript files
 * and save the file. This convention helps the parser identify and process the public types correctly.
 **/

function parseSingleComponentFromDir(
  path: string,
  ref: SubComponents,
): SubComponents | undefined {
  const componentNameMatch = /[\\/](\w[\w-]*)\.tsx$/.exec(path);
  if (!componentNameMatch) {
    // May need better behavior
    return;
  }
  const componentName = componentNameMatch[1];
  const sourceCode = fs.readFileSync(path, 'utf-8');
  const tree = parser.parse(sourceCode);
  const parsed: PublicType[] = [];

  const matches = query.matches(tree.rootNode);
  matches.forEach((match) => {
    const last: PublicType | undefined = parsed[parsed.length - 1];
    let subComponentName = '';
    const parsedProps: ParsedProps = { comment: '', prop: '', type: '' };
    match.captures.forEach((capture) => {
      // Statements are ordered as they appear in capture array
      if (capture.name === 'subComponentName' && subComponentName !== capture.node.text) {
        subComponentName = capture.node.text;
      }
      if (capture.name === 'comment') {
        // This removes the comment syntax
        const justText = capture.node.text.replace(/[/*]/g, '').trim();
        parsedProps.comment = justText;
      }
      if (capture.name === 'prop') {
        parsedProps.prop = capture.node.text;
      }
      if (capture.name === 'type') {
        parsedProps.type = capture.node.text;
        const lastKey = last ? Object.keys(last)[0] : '';
        if (subComponentName === lastKey) {
          last![lastKey].push(parsedProps);
        } else {
          parsed.push({ [subComponentName]: [parsedProps] });
        }
      }
    });
  });

  const completeSubComponent: SubComponent = { [componentName]: parsed };
  ref.push(completeSubComponent);
  return ref;
}

function writeToDocs(fullPath: string, componentName: string, api: ComponentParts) {
  if (fullPath.includes('kit-headless')) {
    const relDocPath = `../website/src/routes/docs/headless/${componentName}`;
    const fullDocPath = resolve(__dirname, relDocPath);
    const dirPath = resolve(fullDocPath, 'auto-api');

    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    const json = JSON.stringify(api, null, 2);
    const exportedApi = `export const api = ${json};`;

    try {
      fs.writeFileSync(resolve(dirPath, 'api.ts'), exportedApi);
      console.log('auto-api: successfully generated new JSON!');
    } catch (err) {
      console.error('Error writing API file:', err);
    }
  }
}

function loopOnAllChildFiles(filePath: string) {
  const childComponentMatch = /[\\/](\w[\w-]*)\.tsx$/.exec(filePath);
  if (!childComponentMatch) {
    return;
  }
  const parentDir = filePath.slice(0, filePath.lastIndexOf(childComponentMatch[0]));
  const componentMatch = /[\\/](\w+)$/.exec(parentDir);
  if (!fs.existsSync(parentDir) || !componentMatch) {
    return;
  }
  const componentName = componentMatch[1];
  const allParts: SubComponents = [];
  const store: ComponentParts = { [componentName]: allParts };

  fs.readdirSync(parentDir).forEach((fileName) => {
    if (/\.tsx$/.test(fileName)) {
      const fullPath = resolve(parentDir, fileName);
      parseSingleComponentFromDir(fullPath, store[componentName]);
    }
  });

  writeToDocs(filePath, componentName, store);
}
