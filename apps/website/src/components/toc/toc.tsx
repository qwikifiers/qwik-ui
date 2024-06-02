import { ContentHeading } from '@builder.io/qwik-city';
import {
  component$,
  useSignal,
  type JSXOutput,
  useVisibleTask$,
  $,
} from '@builder.io/qwik';

export const DashboardTableOfContents = component$(
  ({ headings }: { headings: ContentHeading[] }) => {
    if (headings.length === 0) {
      return null;
    }
    console.log(headings);

    return (
      <div class="space-y-2">
        <div class="font-medium">On This Page</div>
        <TableOfContent headings={headings} />
      </div>
    );
  },
);

import { cn } from '@qwik-ui/utils';
type TableOfContentProps = { headings: ContentHeading[] };
interface Node extends ContentHeading {
  level: number;
  children: Array<Node>;
  activeItem: string;
}
type Tree = Array<Node>;
export const TableOfContent = component$<TableOfContentProps>((props) => {
  const infiniteStopper = JSON.parse(JSON.stringify(props.headings));
  const itemIds = props.headings.map((item) => item.id);
  const activeHeading = useActiveItem(itemIds);
  const tree = getTree(infiniteStopper);
  return <>{RecursiveJSX(tree, activeHeading.value)}</>;
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
  const tree = [currNode];
  const childrenMap = new Map<number, Tree>();
  childrenMap.set(currNode.level, currNode.children);
  for (let index = 1; index < nodes.length; index++) {
    const nextNode = nodes[index] as Node;
    nextNode.children = [];
    childrenMap.set(nextNode.level, nextNode.children);
    const deltaStrg = deltaToStrg(currNode, nextNode);
    switch (deltaStrg) {
      case 'up one level': {
        const grandParent = childrenMap.get(currNode.level - 2);
        grandParent?.push(nextNode);
        break;
      }
      case 'same level': {
        const parent = childrenMap.get(currNode.level - 1);
        parent?.push(nextNode);
        break;
      }
      case 'down one level': {
        currNode.children.push(nextNode);
        break;
      }
      default:
        break;
    }
    currNode = nextNode;
  }
  return tree;
}
function RecursiveJSX(tree: Array<Node>, activeItem: string, mIndex = 0): JSXOutput {
  const currNode: Node = tree[mIndex];
  const nextNode: Node | undefined = tree[mIndex + 1];
  const base_case = nextNode === undefined && currNode.children.length === 0;
  const recursive_nested_case = currNode.children.length > 0;
  if (base_case) {
    return (
      <li key={currNode.id} class={cn('mt-0 pt-2')}>
        <AnchorThing node={currNode} activeItem={activeItem} />
      </li>
    );
  }
  // nested uls would be easy
  // nvm, nested uls got hands
  if (recursive_nested_case) {
    return (
      <>
        <li key={currNode.id} class={cn('mt-0 list-none pt-2')}>
          <AnchorThing node={currNode} activeItem={activeItem} />
          <ul class={cn('m-0 list-none', { 'pl-4': currNode.level !== 1 })}>
            {RecursiveJSX(currNode.children, activeItem)}
          </ul>
        </li>
        {mIndex + 1 <= tree.length - 1 && RecursiveJSX(tree, activeItem, mIndex + 1)}
      </>
    );
  }

  return (
    <>
      <li key={currNode.id} class={cn('mt-0 pt-2')}>
        <AnchorThing node={currNode} activeItem={activeItem} />
      </li>
      {mIndex + 1 <= tree.length - 1 && RecursiveJSX(tree, activeItem, mIndex + 1)}
    </>
  );
}

const useActiveItem = (itemIds: string[]) => {
  const activeId = useSignal<string>('');

  useVisibleTask$(({ cleanup }) => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            activeId.value = entry.target.id;
          }
        });
      },
      { rootMargin: `0% 0% -85% 0%` },
    );

    itemIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    cleanup(() => {
      itemIds.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
    });
  });

  return activeId;
};
type AnchorThingProps = {
  node: Node;
  activeItem: string;
};
export const AnchorThing = component$<AnchorThingProps>((props) => {
  const currNode = props.node;
  const activeItem = props.activeItem;
  return (
    <a
      href={`#${currNode.id}`}
      onClick$={[
        $(() => {
          const element = document.getElementById(currNode.id);
          if (element) {
            const navbarHeight = 90;
            const elementPosition =
              element.getBoundingClientRect().top + window.scrollY - navbarHeight;
            window.scrollTo({ top: elementPosition, behavior: 'auto' });
          }
        }),
      ]}
      class={cn(
        currNode.level > 2 ? 'ml-4' : null,
        'inline-block no-underline transition-colors hover:text-foreground',
        currNode.id === `${activeItem}`
          ? 'font-medium text-foreground'
          : 'text-muted-foreground',
      )}
    >
      {currNode.text}
    </a>
  );
});
