import { ContentHeading } from '@builder.io/qwik-city';
import { cn } from '@qwik-ui/utils';
import { component$, useSignal, useVisibleTask$, $ } from '@builder.io/qwik';

export const DashboardTableOfContents = component$(
  ({ headings }: { headings: ContentHeading[] }) => {
    if (headings.length === 0) {
      return null;
    }
    return (
      <div class="space-y-2">
        <div class="font-medium">On This Page</div>
        <TableOfContent headings={headings} />
      </div>
    );
  },
);

type TableOfContentProps = { headings: ContentHeading[] };
interface Node extends ContentHeading {
  level: number;
  children: Array<Node>;
  activeItem: string;
}
type Tree = Array<Node>;
export const TableOfContent = component$<TableOfContentProps>((props) => {
  const inifiniteStopper = props.headings.map((heading) => {
    return { text: heading.text, id: heading.id, level: heading.level };
  });
  const itemIds = props.headings.map((item) => item.id);
  const activeHeading = useActiveItem(itemIds);
  const tree = getTree(inifiniteStopper);
  return <RecursiveJSX tree={tree[0]} activeItem={activeHeading.value} />;
});

function deltaToStrg(
  currNode: Node,
  nextNode: Node,
): 'same level' | 'down one level' | 'up one level' | 'upwards discontinuous' {
  const delta = currNode.level - nextNode.level;
  if (delta > 1) {
    return 'upwards discontinuous';
  }
  if (delta === 1) {
    return 'up one level';
  }
  if (delta === 0) {
    return 'same level';
  }
  if (delta === -1) {
    return 'down one level';
  }

  throw new Error(
    `bad headings: are downwards discontinous from: #${currNode.id} to #${nextNode.id} bc from ${currNode.level} to ${nextNode.level}`,
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
      case 'upwards discontinuous': {
        const delta = currNode.level - nextNode.level;
        if (childrenMap.has(delta - 1)) {
          const nthParent = childrenMap.get(delta - 1);
          nthParent?.push(nextNode);
        }
        break;
      }
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
type RecursiveJSXProps = {
  tree: Node;
  activeItem: string;
  limit?: number;
};
const RecursiveJSX = component$<RecursiveJSXProps>(({ tree, activeItem, limit = 3 }) => {
  const currNode: Node = tree;
  return currNode?.children?.length && currNode.level < limit ? (
    <ul class={cn('m-0 list-none', { 'pl-4': currNode.level !== 1 })}>
      {currNode.children.map((childNode) => {
        return (
          <li key={currNode.id} class={cn('mt-0 list-none pt-2')}>
            <Anchor node={childNode} activeItem={activeItem} />
            {childNode.children.length ? (
              <>
                <RecursiveJSX tree={childNode} activeItem={activeItem} />
              </>
            ) : null}
          </li>
        );
      })}
    </ul>
  ) : null;
});

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
export const Anchor = component$<AnchorThingProps>((props) => {
  const currNode = props.node;
  const activeItem = props.activeItem;
  const isActiveItem = currNode.id === `${activeItem}`;
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
        isActiveItem ? 'font-medium text-foreground' : 'text-muted-foreground',
      )}
    >
      {currNode.text}
    </a>
  );
});
