import {
  QwikIntrinsicElements,
  component$,
  useSignal,
  useVisibleTask$,
} from '@builder.io/qwik';
import { ContentHeading } from '@builder.io/qwik-city';
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
        <p class="font-medium">On This Page</p>
        <Tree headings={headings} activeItem={activeHeading.value} />
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
      { rootMargin: `0% 0% -80% 0%` },
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
    <ul class={cn('m-0 list-none', { 'pl-4': level !== 1 })}>
      {headings.map((heading) => {
        return (
          <li key={heading.id} class={cn('mt-0 pt-2')}>
            <a
              href={`#${heading.id}`}
              class={cn(
                heading.level > 2 ? 'ml-4' : null,
                'hover:text-foreground inline-block no-underline transition-colors',
                heading.id === `${activeItem}`
                  ? 'text-foreground font-medium'
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
