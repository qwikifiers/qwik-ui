import {
  $,
  QwikIntrinsicElements,
  component$,
  useSignal,
  useVisibleTask$,
} from '@builder.io/qwik';
import { ContentHeading } from '@builder.io/qwik-city';
import { TableOfContent } from '@qwik-ui/headless';
import { cn } from '@qwik-ui/utils';
export const DashboardTableOfContents = component$(
  ({ headings }: { headings: ContentHeading[] }) => {
    const itemIds = headings.map((item) => item.id);
    const activeHeading = useActiveItem(itemIds);

    if (headings.length === 0) {
      return null;
    }

    return (
      <div class="space-y-2">
        <div class="font-medium">On This Page</div>
        <Tree headings={headings} activeItem={activeHeading.value} />

        <TableOfContent headings={headings} />
      </div>
    );
  },
);

const useActiveItem = (itemIds: string[]) => {
  const activeId = useSignal<string>();

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

type TreeProps = QwikIntrinsicElements['ul'] & {
  headings: ContentHeading[];
  level?: number;
  activeItem?: string;
};

const Tree = component$<TreeProps>(({ headings, level = 1, activeItem }) => {
  return headings.length > 0 && level < 3 ? (
    <ul class={cn('m-0 flex list-none flex-col gap-2', { 'pl-4': level !== 1 })}>
      {headings.map((heading) => {
        return (
          <li key={heading.id} class={cn('mt-0 pt-2')}>
            <a
              href={`#${heading.id}`}
              onClick$={[
                $(() => {
                  const element = document.getElementById(heading.id);
                  if (element) {
                    const navbarHeight = 90;
                    const elementPosition =
                      element.getBoundingClientRect().top + window.scrollY - navbarHeight;
                    window.scrollTo({ top: elementPosition, behavior: 'auto' });
                  }
                }),
              ]}
              class={cn(
                heading.level > 2 ? 'ml-4' : null,
                'inline-block no-underline transition-colors hover:text-foreground',
                heading.id === `${activeItem}`
                  ? 'font-medium text-foreground'
                  : 'text-muted-foreground',
              )}
            >
              {heading.text}
            </a>
          </li>
        );
      })}
    </ul>
  ) : null;
});
const test = [
  { text: 'Select', id: 'select', level: 1 },
  { text: '✨ Features', id: '-features', level: 2 },
  { text: 'Building blocks', id: 'building-blocks', level: 2 },
  { text: '🎨 Anatomy', id: '-anatomy', level: 3 },
  {
    text: 'Why use a headless select?',
    id: 'why-use-a-headless-select',
    level: 2,
  },
  {
    text: 'Native select pain points',
    id: 'native-select-pain-points',
    level: 3,
  },
  { text: 'Native effort', id: 'native-effort', level: 3 },
  { text: 'Philosophy', id: 'philosophy', level: 3 },
  { text: 'Passing data', id: 'passing-data', level: 2 },
  { text: 'Basic example', id: 'basic-example', level: 3 },
  { text: 'Mapping over data', id: 'mapping-over-data', level: 3 },
  { text: 'Object example', id: 'object-example', level: 3 },
  {
    text: 'Passing a distinct value',
    id: 'passing-a-distinct-value',
    level: 3,
  },
];
// type Hierarchy = {
//   children: Array<Hierarchy>;
//   parent?: Hierarchy;
//   text: string;
//   id: string;
//   level: number;
// };
// type Tree = Array<Hierarchy>;
type Node = { level: number; children: [Node?] };
type Tree = Array<Node>;
const result = [
  {
    level: 1,
    children: [
      { level: 2 },
      { level: 2, children: { level: 3 } },
      { level: 2, children: [{ level: 3 }, { level: 3 }, { level: 3 }] },
      { level: 2, children: [{ level: 3 }, { level: 3 }, { level: 3 }, { level: 3 }] },
    ],
  },
];
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
function deltaToStrg(
  currNode: Node,
  nextNode: Node,
): 'same level' | 'down one level' | 'up one level' {
  const delta = currNode.level - nextNode.level;
  if (delta === 1) {
    return 'up one level';
  }
  if (delta === 0) {
    return 'same level';
  }
  if (delta === -1) {
    return 'down one level';
  }

  throw new Error('bad headings: they are not continious');
}
const res = getTree(test);
console.log(JSON.stringify(res));

[
  {
    text: 'Select',
    id: 'select',
    level: 1,
    children: [
      { text: '✨ Features', id: '-features', level: 2, children: [] },
      {
        text: 'Building blocks',
        id: 'building-blocks',
        level: 2,
        children: [{ text: '🎨 Anatomy', id: '-anatomy', level: 3, children: [] }],
      },
      {
        text: 'Why use a headless select?',
        id: 'why-use-a-headless-select',
        level: 2,
        children: [
          {
            text: 'Native select pain points',
            id: 'native-select-pain-points',
            level: 3,
            children: [],
          },
          { text: 'Native effort', id: 'native-effort', level: 3, children: [] },
          { text: 'Philosophy', id: 'philosophy', level: 3, children: [] },
        ],
      },
      {
        text: 'Passing data',
        id: 'passing-data',
        level: 2,
        children: [
          { text: 'Basic example', id: 'basic-example', level: 3, children: [] },
          { text: 'Mapping over data', id: 'mapping-over-data', level: 3, children: [] },
          { text: 'Object example', id: 'object-example', level: 3, children: [] },
          {
            text: 'Passing a distinct value',
            id: 'passing-a-distinct-value',
            level: 3,
            children: [],
          },
        ],
      },
    ],
  },
];
