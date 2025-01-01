import {
  $,
  component$,
  Signal,
  useOnWindow,
  useSignal,
  useTask$,
} from '@builder.io/qwik';
import { isServer } from '@builder.io/qwik/build';
import { Combobox, Modal } from '@qwik-ui/styled';
import { buttonVariants } from '@qwik-ui/styled';
import { cn } from '@qwik-ui/utils';
import { LuSearch } from '@qwikest/icons/lucide';

interface PagefindSearchResult {
  id: string;
  url: string;
  meta: {
    title: string;
  };
  excerpt?: string;
  anchors?: {
    text: string;
    element: string;
    id: string;
  }[];
}

interface PagefindSearchResultRaw {
  id: string;
  url: string;
  meta: {
    title: string;
  };
  excerpt?: string;
  data: () => Promise<PagefindSearchResult>;
}

interface PagefindSearch {
  results: PagefindSearchResultRaw[];
}

interface Pagefind {
  preload: (term: string) => Promise<void>;
  search: (term: string) => PagefindSearch | null;
}

declare global {
  interface Window {
    pagefind: Pagefind;
  }
}

export const SearchModal = component$((props: { class?: string }) => {
  const isOpen = useSignal(false);

  useOnWindow(
    'keydown',
    $((event: KeyboardEvent) => {
      if (event.key === 'k' && event.metaKey) {
        isOpen.value = !isOpen.value;
      }
    }),
  );

  const isInitialized = useSignal(false);

  useTask$(({ track }) => {
    track(() => isOpen.value);

    if (isServer) return;

    if (isOpen.value && !isInitialized.value) {
      window.dispatchEvent(new CustomEvent('initPagefind'));
      isInitialized.value = true;
    }
  });

  return (
    <Modal.Root bind:show={isOpen}>
      <Modal.Trigger class={cn(buttonVariants({ size: 'icon', look: 'ghost' }))}>
        <LuSearch class="h-5 w-5 sm:h-6 sm:w-6" />
      </Modal.Trigger>
      <Modal.Panel
        class={cn(props.class, 'mt-20 w-full !max-w-xl bg-red-500 p-0 sm:max-w-md')}
      >
        <Search isOpen={isOpen} />
      </Modal.Panel>
    </Modal.Root>
  );
});

export const Search = component$(({ isOpen }: { isOpen: Signal<boolean> }) => {
  const resultsSig = useSignal<PagefindSearchResult[]>([]);
  const inputValueSig = useSignal<string>('');
  const handleInput = $(async (e: InputEvent) => {
    const target = e.target as HTMLInputElement;

    inputValueSig.value = target.value;

    await window.pagefind.preload(target.value);

    const search = await window.pagefind.search(target.value);

    if (search === null) {
      resultsSig.value = [];
      return;
    }

    const searchResults = await Promise.all(
      search.results.map(async (r) => {
        const data = await r.data();
        return {
          id: data.id,
          url: data.url,
          meta: data.meta,
          excerpt: data.excerpt,
          anchors: data.anchors,
        };
      }),
    );

    resultsSig.value = searchResults;
  });

  return (
    <Combobox.Root
      class="w-full"
      mode="inline"
      filter={false}
      // @ts-expect-error bad types in core
      onChange$={(value: string) => {
        window.location.href = value;
        isOpen.value = false;
      }}
    >
      <Combobox.Input
        onInput$={handleInput}
        onKeyDown$={(e: KeyboardEvent) => {
          if (e.key === 'Enter') {
            isOpen.value = false;
          }
        }}
        data-id="search"
        placeholder="Find anything"
        class={cn(
          'h-12 w-full rounded-b-none border-none focus-visible:outline-none focus-visible:ring-0',
        )}
      />
      <Combobox.Inline class="max-h-[calc(100vh-200px)] overflow-auto border-t-2 border-border">
        {(() => {
          const processedResults = resultsSig.value
            .flatMap((result) => {
              const headings = getValidHeadings(result.anchors);
              if (!headings.length) return [];

              const bestHeading = findBestMatchingHeading(headings, inputValueSig.value);
              if (!bestHeading) return [];

              return [
                {
                  ...result,
                  url: `${result.url}#${bestHeading.id}`,
                  heading: bestHeading.text,
                  category: result.url.includes('/styled/') ? 'styled' : 'headless',
                },
              ];
            })
            .filter(isValidRoute)
            .slice(0, 8);

          function getValidHeadings(
            anchors?: { element: string; text: string; id: string }[],
          ) {
            if (!anchors) return [];
            return anchors.filter((anchor) =>
              ['h2', 'h3', 'h4', 'h5', 'h6'].includes(anchor.element),
            );
          }

          function findBestMatchingHeading(
            headings: { element: string; text: string; id: string }[],
            searchTerm: string,
          ) {
            return headings.reduce((best, current) => {
              const isCurrentMatch = current.text
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
              const isBestMatch = best?.text
                .toLowerCase()
                .includes(searchTerm.toLowerCase());

              if (isCurrentMatch && !isBestMatch) return current;
              if (!isCurrentMatch && isBestMatch) return best;
              if (!isCurrentMatch && !isBestMatch) return best || current;

              return ['h2', 'h3'].includes(current.element) ? current : best;
            }, headings[0]);
          }

          function isValidRoute(result: { url: string }) {
            return result.url.includes('/styled/') || result.url.includes('/headless/');
          }

          return (
            <>
              {processedResults.length > 0 && (
                <>
                  <div class="px-2 py-2 font-medium text-muted-foreground">Headless</div>
                  {processedResults.map((result) => (
                    <a
                      href={result.url}
                      key={result.url}
                      onClick$={() => {
                        isOpen.value = false;
                      }}
                    >
                      <Combobox.Item
                        value={result.url}
                        class="block rounded-none border-b px-2 py-4"
                      >
                        <div class="flex flex-col gap-1">
                          <div class="text-sm capitalize text-muted-foreground opacity-50">
                            {result.url.split('/').slice(-2, -1)}
                          </div>
                          <Combobox.ItemLabel class="text-base font-medium">
                            {result.heading}
                          </Combobox.ItemLabel>
                          <div
                            class="text-sm text-muted-foreground"
                            dangerouslySetInnerHTML={result.excerpt}
                          />
                        </div>
                      </Combobox.Item>
                    </a>
                  ))}
                </>
              )}
              {resultsSig.value?.length === 0 && inputValueSig.value.length > 0 && (
                <Combobox.Empty class="px-2 py-4">No results found</Combobox.Empty>
              )}
            </>
          );
        })()}
      </Combobox.Inline>
    </Combobox.Root>
  );
});
