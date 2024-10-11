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
import { useStorageSignal } from '../../hooks';
import { cn } from '@qwik-ui/utils';
import {
  LuChevronRight,
  LuFileText,
  LuHash,
  LuSearch,
  LuX,
  LuLoader2,
} from '@qwikest/icons/lucide';
import { AlgoliaLogo } from '../icons/AlgoliaLogo';

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

/**
 * Provides a search box for the documentation.
 */
export const DocSearch = component$(() => {
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

  // Do stuff when search is opened or closed
  useTask$(({ track }) => {
    track(() => inputElement.value);
    track(() => open.value);
    if (isBrowser && inputElement.value) {
      if (!open.value) {
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
        <LuSearch class="h-6 w-6" />
      </Modal.Trigger>
      <Modal.Panel
        class="max-h-xl! max-w-4xl"
        ref={modalElement}
        window:onKeyDown$={[preventDefault, handleKeyDown]}
      >
        {/* Header */}
        <header class="flex h-14 flex-shrink-0 items-center px-2 md:h-16 lg:h-[72px] lg:px-4">
          <form class="flex flex-1" preventdefault:submit>
            <div
              class="overflow-hidden"
              aria-label={loading.value ? 'Search' : 'Focus search input'}
            >
              {loading.value ? (
                <LuLoader2 class="h-6 w-6 animate-spin" />
              ) : (
                <LuSearch class="h-6 w-6" />
              )}
            </div>
            <input
              class="flex-1 bg-transparent px-2 text-lg text-slate-900 outline-none placeholder:text-slate-500 dark:text-slate-200 md:text-xl"
              ref={inputElement}
              type="search"
              placeholder="Search docs"
              value={input.value}
              onInput$={(_, element) => (input.value = element.value)}
            />
          </form>
        </header>

        {/* Content */}
        <div class="flex-1 overflow-y-auto overscroll-contain scroll-smooth p-4 lg:max-h-[350px] lg:min-h-[120px] lg:px-6">
          {
            // Error
            error.value ? (
              <p class="md:text-lg">
                An unexpected error has occurred. If this happens regularly, please create
                an{' '}
                <a
                  class="focus-ring rounded text-sky-600 underline decoration-slate-400 decoration-dashed underline-offset-[3px] focus-visible:outline-offset-4 focus-visible:ring-offset-[6px] dark:text-sky-400 dark:decoration-slate-600"
                  href="https://github.com/fabian-hiller/valibot/issues/new"
                  target="_blank"
                >
                  issue
                </a>{' '}
                on Github.
              </p>
            ) : // No result
            input.value && !loading.value && !result.value.length ? (
              <p class="text-sm md:text-base">
                No results for "
                <span class="text-slate-900 dark:text-slate-200">{input.value}</span>"
              </p>
            ) : // Result
            input.value && result.value.length ? (
              <ul>
                {result.value.map((item, index) => {
                  const getPrevItem = () =>
                    index > 0 ? result.value[index - 1] : undefined;
                  const getGroup = () =>
                    getPrevItem()?.group !== item.group ? item.group : undefined;
                  return (
                    <li
                      key={item.path + item.text}
                      class={cn(
                        index > 0 &&
                          (getGroup()
                            ? 'mt-9'
                            : item.relation === 'page' &&
                                getPrevItem()?.relation !== 'page'
                              ? 'mt-6'
                              : item.relation === 'child'
                                ? 'border-l-2 border-l-slate-200 pl-2 pt-2.5 dark:border-l-slate-800'
                                : 'mt-2.5'),
                      )}
                    >
                      {getGroup() && (
                        <div class="mb-6 text-sm md:text-base">{getGroup()}</div>
                      )}
                      <SearchItem
                        {...item}
                        index={index}
                        activeIndex={activeIndex}
                        onClick$={() => handleClick(item)}
                      />
                    </li>
                  );
                })}
              </ul>
            ) : // Resent
            recent.value!.length ? (
              <>
                <div class="text-sm md:text-base">Recent</div>
                <ul class="mt-6 space-y-2.5">
                  {recent.value.map((item, index) => (
                    <li key={item.path + item.text}>
                      <SearchItem
                        {...item}
                        index={index}
                        activeIndex={activeIndex}
                        onClick$={() => handleClick(item)}
                        recent
                      />
                    </li>
                  ))}
                </ul>
              </>
            ) : null
          }
        </div>

        {/* Footer */}
        <footer class="flex h-12 flex-shrink-0 items-center justify-end px-4 text-xs md:h-14 md:text-sm lg:h-[72px] lg:px-6">
          Search by
          <a
            class="focus-ring ml-2 rounded focus-visible:outline-offset-4 focus-visible:ring-offset-[6px] md:ml-3"
            href="https://www.algolia.com/ref/docsearch/?utm_source=valibot.dev&utm_medium=referral&utm_content=powered_by&utm_campaign=docsearch"
            target="_blank"
          >
            <AlgoliaLogo class="h-8 md:h-10" />
          </a>
        </footer>
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
        class={cn(
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
          <LuFileText class="h-5 flex-shrink-0 md:h-6" />
        ) : (
          <LuHash class="h-5 flex-shrink-0 md:h-6" />
        )}
        <div
          class={cn(
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
        <LuChevronRight class="h-6 w-6" />
      </Link>
    );
  },
);
