import { component$ } from '@builder.io/qwik';
import { type ContentHeading } from '@builder.io/qwik-city';
import { resolveTripleslashReference } from 'typescript';
type TableOfContentProps = { headings: ContentHeading[] };
type Node = { level: number; children: [Node] };
type Tree = Array<Node>;
export const TableOfContent = component$<TableOfContentProps>((props) => {
  const flat = props.headings;
  const tree = getTree(props.headings);
  const JSX = RecursiveJSX(props.headings, 0);

  return <div>{JSX}</div>;
});
type RecursiveJSXProps = { flatNodes: Array<Node>; mIndex: number };
function RecursiveJSX(flatNodes: Array<Node>, mIndex = 0) {
  console.log('INDEX: ', mIndex, ' TO: ', flatNodes.length - 1);
  console.log('CN: ', flatNodes[mIndex]);
  console.log('NN: ', flatNodes[mIndex + 1]);
  console.log('CC: ', flatNodes[mIndex].children);

  const currNode: Node = flatNodes[mIndex];
  const nextNode: Node | undefined = flatNodes[mIndex + 1];
  const base_case = nextNode === undefined && currNode.children.length === 0;
  const recursive_nested_case = currNode.children.length > 0;
  if (base_case || mIndex >= flatNodes.length - 1) {
    console.log('ENDING');

    return <li>{currNode.level}</li>;
  }
  // nested uls would be easy
  // nvm, nested uls got hands
  if (recursive_nested_case) {
    console.log('NESTED');

    return (
      <>
        <li>
          {currNode.level}
          <ul>
            {currNode.children.map((node) => {
              mIndex += 1;
              return <li>{node.level}</li>;
            })}
          </ul>
        </li>
        {mIndex + 1 <= flatNodes.length - 1 && RecursiveJSX(flatNodes, mIndex + 1)}
      </>
    );
  }
  console.log('SIMPLE');
  return (
    <>
      <li>{currNode.level}</li>
      {mIndex + 1 <= flatNodes.length - 1 && RecursiveJSX(flatNodes, mIndex + 1)}
    </>
  );
}
function deltaToStrg(
  currNode: Node,
  nextNode: Node,
): 'same level' | 'down one level' | 'up one level' {
  const delta = currNode.level - nextNode.level;
  if (delta >= 1) {
    return 'up one level';
  }
  if (delta <= -1) {
    return 'down one level';
  }

  return 'same level';
}
function getTree(nodes: Tree) {
  let currNode = nodes[0];
  currNode.children = [];
  let tree = [currNode];
  let childrenMap = new Map<number, Tree>();
  childrenMap.set(currNode.level, currNode.children);
  for (let index = 1; index < nodes.length; index++) {
    const nextNode = nodes[index];
    nextNode.children = [];
    childrenMap.set(nextNode.level, nextNode.children);
    const deltaStrg = deltaToStrg(currNode, nextNode);
    switch (deltaStrg) {
      case 'up one level':
        const grandParent = childrenMap.get(currNode.level - 2);
        grandParent?.push(nextNode);
        break;
      case 'same level':
        const parent = childrenMap.get(currNode.level - 1);
        parent?.push(nextNode);
        break;
      case 'down one level':
        currNode.children.push(nextNode);
        break;
      default:
        break;
    }
    currNode = nextNode;
  }
  return tree;
}

const lol = [
  {
    text: 'Select',
    id: 'select',
    level: 1,
    children: [
      [Object],
      [Object],
      [Object],
      [Object],
      [Object],
      [Object],
      [Object],
      [Object],
      [Object],
      [Object],
      [Object],
    ],
  },
  { text: '✨ Features', id: '-features', level: 2, children: [] },
  {
    text: 'Building blocks',
    id: 'building-blocks',
    level: 2,
    children: [[Object]],
  },
  { text: '🎨 Anatomy', id: '-anatomy', level: 3, children: [] },
  {
    text: 'Why use a headless select?',
    id: 'why-use-a-headless-select',
    level: 2,
    children: [[Object], [Object], [Object]],
  },
  {
    text: 'Native select pain points',
    id: 'native-select-pain-points',
    level: 3,
    children: [],
  },
  {
    text: 'Native effort',
    id: 'native-effort',
    level: 3,
    children: [],
  },
  { text: 'Philosophy', id: 'philosophy', level: 3, children: [] },
  {
    text: 'Passing data',
    id: 'passing-data',
    level: 2,
    children: [[Object], [Object], [Object], [Object], [Object], [Object], [Object]],
  },
  {
    text: 'Basic example',
    id: 'basic-example',
    level: 3,
    children: [],
  },
  {
    text: 'Mapping over data',
    id: 'mapping-over-data',
    level: 3,
    children: [],
  },
  {
    text: 'Object example',
    id: 'object-example',
    level: 3,
    children: [],
  },
  {
    text: 'Passing a distinct value',
    id: 'passing-a-distinct-value',
    level: 3,
    children: [],
  },
  {
    text: 'Handling selection changes',
    id: 'handling-selection-changes',
    level: 3,
    children: [],
  },
  { text: 'Forms', id: 'forms', level: 3, children: [] },
  { text: 'Validation', id: 'validation', level: 3, children: [] },
  {
    text: 'Component state',
    id: 'component-state',
    level: 2,
    children: [[Object], [Object], [Object], [Object], [Object], [Object], [Object]],
  },
  {
    text: 'Uncontrolled / Initial value',
    id: 'uncontrolled--initial-value',
    level: 3,
    children: [],
  },
  {
    text: 'Controlled / Reactive value',
    id: 'controlled--reactive-value',
    level: 3,
    children: [],
  },
  {
    text: 'Programmatic changes',
    id: 'programmatic-changes',
    level: 3,
    children: [],
  },
  {
    text: 'Disabled items',
    id: 'disabled-items',
    level: 3,
    children: [],
  },
  {
    text: 'Dynamically adding users',
    id: 'dynamically-adding-users',
    level: 3,
    children: [],
  },
  {
    text: 'Item Indicators',
    id: 'item-indicators',
    level: 3,
    children: [],
  },
  {
    text: 'Multiple selections',
    id: 'multiple-selections',
    level: 3,
    children: [],
  },
  {
    text: 'Menu behavior',
    id: 'menu-behavior',
    level: 2,
    children: [[Object], [Object], [Object], [Object], [Object]],
  },
  { text: 'Typeahead', id: 'typeahead', level: 3, children: [] },
  {
    text: 'Handling listbox open / close',
    id: 'handling-listbox-open--close',
    level: 3,
    children: [],
  },
  { text: 'Looping', id: 'looping', level: 3, children: [] },
  {
    text: 'Grouped items',
    id: 'grouped-items',
    level: 3,
    children: [],
  },
  { text: 'Scrolling', id: 'scrolling', level: 3, children: [] },
  { text: 'Placeholder', id: 'placeholder', level: 2, children: [] },
  { text: 'CSR', id: 'csr', level: 2, children: [] },
  { text: 'Example CSS', id: 'example-css', level: 2, children: [] },
  {
    text: 'Keyboard Interaction',
    id: 'keyboard-interaction',
    level: 2,
    children: [[Object]],
  },
  { text: 'Multi Select', id: 'multi-select', level: 3, children: [] },
  {
    text: 'API',
    id: 'api',
    level: 2,
    children: [[Object], [Object], [Object], [Object], [Object]],
  },
  {
    text: 'Data Attributes',
    id: 'data-attributes',
    level: 3,
    children: [],
  },
  { text: 'Select.Root', id: 'selectroot', level: 3, children: [] },
  {
    text: 'Select.DisplayValue',
    id: 'selectdisplayvalue',
    level: 3,
    children: [],
  },
  {
    text: 'Select.Popover',
    id: 'selectpopover',
    level: 3,
    children: [],
  },
  { text: 'Select.Item:', id: 'selectitem', level: 3, children: [] },
];
