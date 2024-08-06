import {
  $,
  component$,
  type Signal,
  sync$,
  useComputed$,
  useSignal,
  useTask$,
} from '@builder.io/qwik';
import { Link, useLocation, useNavigate } from '@builder.io/qwik-city';
import { isBrowser } from '@builder.io/qwik/build';
import { Modal, buttonVariants } from '~/components/ui';
import clsx from 'clsx';
import { useFocusTrap, useStorageSignal } from '../../hooks';
import { cn } from '@qwik-ui/utils';
import { LuX } from '@qwikest/icons/lucide';

import { AngleRightIcon } from '../icons/AngleRightIcon';
import { HashtagIcon } from '../icons/HashtagIcon';
import { PageIcon } from '../icons/PageIcon';
import { SearchIcon } from '../icons/SearchIcon';

type HitType = 'lvl2' | 'lvl3' | 'lvl4' | 'lvl5' | 'content';

type AlgoliaResult = {
  hits: {
    type: HitType;
    hierarchy: {
      lvl0: string;
      lvl1: string;
      lvl2: string;
      lvl3: string | null;
      lvl4: string | null;
    };
    content: string | null;
    url: string;
    _highlightResult: {
      hierarchy: {
        lvl0: { value: string };
        lvl1: { value: string };
        lvl2: { value: string };
        lvl3: { value: string } | undefined;
        lvl4: { value: string } | undefined;
        lvl5: { value: string } | undefined;
      };
    };
    _snippetResult?: {
      content: { value: string };
    };
  }[];
};

type SearchItem = {
  group: string;
  relation: 'page' | 'child' | 'none';
  type: HitType;
  page: string;
  text: string;
  path: string;
};

type SearchStorage = {
  [key: string]:
    | {
        result: SearchItem[];
        expires: number;
      }
    | undefined;
};

type DocSearchProps = {
  open: Signal<boolean>;
};

/**
 * Provides a search box for the documentation.
 */
export const DocSearch = component$<DocSearchProps>(() => {
  const open = useSignal(false);
  // Use location and navigate
  const location = useLocation();
  const navigate = useNavigate();

  // Use input, loading, active index and error signal
  const input = useSignal('');
  const loading = useSignal(false);
  const activeIndex = useSignal(0);
  const error = useSignal(false);

  // Use modal and input element signal
  const modalElement = useSignal<HTMLDivElement>();
  const inputElement = useSignal<HTMLInputElement>();

  // Use storage, recent, result and clicked signal
  const storage = useStorageSignal<SearchStorage>('search-index', {});
  const recent = useStorageSignal<SearchItem[]>('search-recent', []);
  const result = useSignal<SearchItem[]>([]);
  const clicked = useSignal<SearchItem | null>(null);

  // Compute search items
  const searchItems = useComputed$(() => (input.value ? result.value : recent.value));

  // Use focus trap when search is open
  useFocusTrap(modalElement, open);

  // Do stuff when search is opened or closed
  useTask$(({ track }) => {
    track(() => inputElement.value);
    track(() => open.value);
    if (isBrowser && inputElement.value) {
      // Focus input and block background scrolling when search is opened
      if (open.value) {
        inputElement.value.focus();
        document.body.style.overflow = 'hidden';

        // Otherwise when search is closed, add clicked item to recent and
        // reset state and background scrolling
      } else {
        const item = clicked.value;
        if (item) {
          recent.value = [item, ...recent.value.filter((i) => i !== item).slice(0, 5)];
        }

        // Reset state and background scrolling
        input.value = '';
        activeIndex.value = 0;
        result.value = [];
        clicked.value = null;
        document.body.style.overflow = '';
      }
    }
  });

  // Close search when location changes
  useTask$(({ track }) => {
    track(() => location.url);
    if (isBrowser) {
      open.value = false;
    }
  });

  // Update search result and active index when input changes
  useTask$(({ track, cleanup }) => {
    const currentInput = track(() => input.value);
    if (isBrowser) {
      // If input is present, query and set search result
      if (currentInput) {
        // Get its current value
        const storageValue = storage.value[currentInput];

        // Set result of index values is present and not expired
        if (storageValue && storageValue.expires >= Date.now()) {
          activeIndex.value = storageValue.result.length ? 0 : -1;
          result.value = storageValue.result;
          loading.value = false;

          // Otherwise query search result from Algolia with a short timeout to
          // reduce unnecessary queries
        } else {
          const timeout = setTimeout(async () => {
            try {
              const algoliaResult = (await (
                await fetch(`https://45LJHJ8SXX-dsn.algolia.net/1/indexes/qwikui/query`, {
                  method: 'POST',
                  headers: {
                    'X-Algolia-Application-Id': '45LJHJ8SXX',
                    'X-Algolia-API-Key': '70092cb30dabe39e20d9afdb5930c6d5',
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ query: currentInput }),
                })
              ).json()) as AlgoliaResult;
              // Transform hits of Algolia result to our schema
              let prevItem: SearchItem | undefined;
              const searchResult: SearchItem[] = algoliaResult.hits.map((hit) => {
                // Create path by removing origin from URL
                const path = hit.url.replace('https://qwikui.com', '');
                // Create search item object
                const searchItem: SearchItem = {
                  group: `${hit.hierarchy.lvl0}${hit.hierarchy.lvl1 ? `: ${hit.hierarchy.lvl1}` : ''}`,
                  relation:
                    hit.type === 'lvl2'
                      ? 'page'
                      : prevItem &&
                          prevItem.relation !== 'none' &&
                          prevItem.path.split('#')[0] === path.split('#')[0]
                        ? 'child'
                        : 'none',
                  type: hit.type,
                  page: hit._highlightResult.hierarchy?.lvl1?.value,
                  text:
                    hit.type === 'content'
                      ? (hit?._snippetResult?.content.value as string)
                      : (hit?._highlightResult?.hierarchy[hit.type]?.value as string),
                  path,
                };

                // Update previous item variable
                prevItem = searchItem;

                // Return search item object
                return searchItem;
              });

              // Add search result to search storage
              storage.value = {
                ...storage.value,
                [currentInput]: {
                  result: searchResult,
                  expires: Date.now() + 2.592e8, // 3 days
                },
              };

              // Set search result if input has not changed
              if (currentInput === input.value) {
                activeIndex.value = 0;
                result.value = searchResult;
                loading.value = false;
              }

              // Update state in case of an error
            } catch (_) {
              error.value = true;
            }
          }, 150);

          // Set loading to "true"
          loading.value = true;

          // Clear timeout if the input has changed in the meantime
          cleanup(() => clearTimeout(timeout));
        }

        // Otherwise if input is empty, reset state
      } else {
        activeIndex.value = 0;
        result.value = [];
        loading.value = false;
      }
    }
  });

  /**
   * Handles the click on a search item.
   */
  const handleClick = $((item: SearchItem) => {
    if (item.path === location.url.pathname) {
      open.value = false;
    }
    clicked.value = item;
  });

  /**
   * Handles keyboard keydown events.
   */
  const handleKeyDown = $((event: KeyboardEvent) => {
    // Open or close search
    if (
      ((event.ctrlKey || event.metaKey) && event.key === 'k') ||
      (open.value && event.key === 'Escape')
    ) {
      open.value = !open.value;
    }

    if (open.value) {
      // Change active index
      if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        const maxIndex = searchItems.value.length - 1;
        activeIndex.value =
          event.key === 'ArrowUp'
            ? activeIndex.value === 0
              ? maxIndex
              : activeIndex.value - 1
            : activeIndex.value === maxIndex
              ? 0
              : activeIndex.value + 1;
      }

      // Select current active index
      if (event.key === 'Enter') {
        const item = searchItems.value[activeIndex.value];
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (item) {
          if (item.path === location.url.pathname) {
            open.value = false;
          } else {
            navigate(item.path);
          }
          clicked.value = item;
        }
      }
    }
  });

  /**
   * Prevents default behavior of keydown events.
   */
  const preventDefault = sync$((event: KeyboardEvent) => {
    if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
      event.preventDefault();
    }
  });

  return (
    <Modal.Root bind:show={open}>
      <Modal.Trigger class={[buttonVariants({ look: 'ghost', size: 'icon' })]}>
        <SearchIcon />
      </Modal.Trigger>
      <Modal.Panel
        class="max-h-xl! max-w-4xl"
        ref={modalElement}
        window:onKeyDown$={[preventDefault, handleKeyDown]}
      >
        <div>
          <Link href="/docs/styled/button/"> 2323</Link>
        </div>
        <Modal.Close
          class={cn(
            buttonVariants({ size: 'icon', look: 'ghost' }),
            'absolute right-3 top-2',
          )}
          type="submit"
        >
          <LuX class="h-7 w-7" />
        </Modal.Close>
      </Modal.Panel>
    </Modal.Root>
  );
});

type SearchItemProps = SearchItem & {
  index: number;
  activeIndex: Signal<number>;
  onClick$: () => void;
  recent?: boolean;
};

/**
 * Displays relevant info of a single search result and links to its page.
 */
const SearchItem = component$<SearchItemProps>(
  ({ type, relation, page, text, path, index, activeIndex, onClick$, recent }) => {
    // Use element signal
    const element = useSignal<HTMLAnchorElement>();

    // Compute active state
    const active = useComputed$(() => index === activeIndex.value);

    // Scroll element into view if active
    useTask$(({ track }) => {
      track(() => element.value);
      track(() => active.value);
      if (isBrowser && element.value && active.value) {
        element.value.scrollIntoView({ block: 'nearest' });
      }
    });

    return (
      <Link
        class={clsx(
          'focus-ring flex scroll-my-12 items-center rounded-2xl border-2 px-5 py-4 md:px-6',
          active.value
            ? 'border-transparent bg-sky-600/10 text-sky-600 dark:bg-sky-400/10 dark:text-sky-400'
            : 'border-slate-200 dark:border-slate-800',
        )}
        ref={element}
        href={path}
        onMouseEnter$={() => (activeIndex.value = index)}
        onFocusIn$={() => (activeIndex.value = index)}
        // eslint-disable-next-line qwik/valid-lexical-scope
        onClick$={onClick$}
      >
        {relation === 'page' ? (
          <PageIcon class="h-5 flex-shrink-0 md:h-6" />
        ) : (
          <HashtagIcon class="h-5 flex-shrink-0 md:h-6" />
        )}
        <div
          class={clsx(
            'flex-1 px-4 md:px-5 [&_mark]:bg-transparent [&_mark]:font-medium',
            active.value
              ? '[&_mark]:text-sky-600 [&_mark]:underline [&_mark]:dark:text-sky-400'
              : '[&_mark]:text-slate-900 [&_mark]:dark:text-slate-200',
          )}
        >
          {type === 'content' && (relation === 'none' || recent) && (
            <div class="mb-2 text-xs md:text-sm" dangerouslySetInnerHTML={page} />
          )}
          <div class="text-sm md:text-base" dangerouslySetInnerHTML={`${page || text}`} />
        </div>
        <AngleRightIcon class="h-3 flex-shrink-0 md:h-4" />
      </Link>
    );
  },
);
