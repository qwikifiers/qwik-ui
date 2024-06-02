import { component$, useSignal, useTask$, $, type JSXOutput } from '@builder.io/qwik';
import { cn } from '@qwik-ui/utils';
import { type ContentHeading } from '@builder.io/qwik-city';
type TableOfContentProps = { headings: ContentHeading[] };
interface Node extends ContentHeading {
  level: number;
  children: Array<Node>;
}
type Tree = Array<Node>;
export const TableOfContent = component$<TableOfContentProps>((props) => {
  const infiniteStopper = JSON.parse(JSON.stringify(props.headings));
  const tree = getTree(infiniteStopper);
  return <>{RecursiveJSX(tree)}</>;
});

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
function RecursiveJSX(tree: Array<Node>, mIndex = 0): JSXOutput {
  const currNode: Node = tree[mIndex];
  const nextNode: Node | undefined = tree[mIndex + 1];
  const base_case = nextNode === undefined && currNode.children.length === 0;
  const recursive_nested_case = currNode.children.length > 0;
  if (base_case) {
    return (
      <li key={currNode.id} class={cn('mt-0 pt-2')}>
        {currNode.text}
      </li>
    );
  }
  // nested uls would be easy
  // nvm, nested uls got hands
  if (recursive_nested_case) {
    return (
      <>
        <li key={currNode.id} class={cn('mt-0 pt-2')}>
          {currNode.text}
          <ul class={cn('m-0 list-none', { 'pl-4': currNode.level !== 1 })}>
            {RecursiveJSX(currNode.children)}
          </ul>
        </li>
        {mIndex + 1 <= tree.length - 1 && RecursiveJSX(tree, mIndex + 1)}
      </>
    );
  }
  return (
    <>
      <li key={currNode.id} class={cn('mt-0 pt-2')}>
        {currNode.text}
      </li>
      {mIndex + 1 <= tree.length - 1 && RecursiveJSX(tree, mIndex + 1)}
    </>
  );
}
