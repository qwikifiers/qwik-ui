import { component$, type JSXOutput } from '@builder.io/qwik';
import { type ContentHeading } from '@builder.io/qwik-city';
type TableOfContentProps = { headings: ContentHeading[] };
interface Node extends ContentHeading {
  level: number;
  children: Array<Node>;
}
type Tree = Array<Node>;
export const TableOfContent = component$<TableOfContentProps>((props) => {
  const tree = getTree(props.headings);
  const JSX = RecursiveJSX(tree, 0);

  return <div>{JSX}</div>;
});
function RecursiveJSX(tree: Array<Node>, mIndex = 0): JSXOutput {
  console.log('INDEX: ', mIndex, ' TO: ', tree.length - 1);
  console.log('CT: ', tree);
  // console.log('NN: ', flatNodes[mIndex + 1]);
  // console.log('CC: ', flatNodes[mIndex].children);

  const currNode: Node = tree[mIndex];
  const nextNode: Node | undefined = tree[mIndex + 1];
  const base_case = nextNode === undefined && currNode.children.length === 0;
  const recursive_nested_case = currNode.children.length > 0;
  if (base_case) {
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
          <ul>{RecursiveJSX(currNode.children)}</ul>
        </li>
        {mIndex + 1 <= tree.length - 1 && RecursiveJSX(tree, mIndex + 1)}
      </>
    );
  }
  console.log('SIMPLE');
  return (
    <>
      <li>{currNode.level}</li>
      {mIndex + 1 <= tree.length - 1 && RecursiveJSX(tree, mIndex + 1)}
    </>
  );
}
function deltaToStrg(
  currNode: Node,
  nextNode: Node,
): 'same level' | 'down one level' | 'up one level' {
  const delta = currNode.level - nextNode.level;
  if (delta === 1) {
    return 'up one level';
  }
  if (delta === -1) {
    return 'down one level';
  }

  if (delta === 0) {
    return 'same level';
  }
  throw new Error(
    `bad headings: are not continous from: #${currNode.id} to #${nextNode.id}`,
  );
}
function getTree(nodes: ContentHeading[]) {
  let currNode = nodes[0] as Node;
  currNode.children = [];
  let tree = [currNode];
  let childrenMap = new Map<number, Tree>();
  childrenMap.set(currNode.level, currNode.children);
  for (let index = 1; index < nodes.length; index++) {
    const nextNode = nodes[index] as Node;
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
