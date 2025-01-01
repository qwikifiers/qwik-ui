import { $, component$, useOnWindow, useSignal, useTask$ } from '@builder.io/qwik';
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
        <Search />
      </Modal.Panel>
    </Modal.Root>
  );
});

export const Search = component$(() => {
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

  useTask$(({ track }) => {
    track(() => resultsSig.value);
    console.log(resultsSig.value);
  });

  return (
    <Combobox.Root
      class="w-full"
      mode="inline"
      filter={false}
      // @ts-expect-error bad types in core
      onChange$={(value: string) => {
        window.location.href = value;
      }}
    >
      <Combobox.Input
        onInput$={handleInput}
        data-id="search"
        placeholder="Find anything"
        class={cn(
          'h-12 w-full rounded-b-none border-none focus-visible:outline-none focus-visible:ring-0',
        )}
      />
      <Combobox.Inline class="max-h-[calc(100vh-200px)] overflow-auto border-t-2 border-border">
        {(() => {
          const headlessResults = resultsSig.value
            .flatMap((result) => {
              const headings =
                result.anchors?.filter((anchor) =>
                  ['h2', 'h3'].includes(anchor.element),
                ) || [];

              return headings.map((heading) => ({
                ...result,
                url: `${result.url}#${heading.id}`,
                heading: heading.text,
                weight: 1.0,
              }));
            })
            .filter((result) => result.url.includes('/headless/'))
            .slice(0, 5);

          const styledResults = resultsSig.value
            .flatMap((result) => {
              const headings =
                result.anchors?.filter((anchor) =>
                  ['h2', 'h3'].includes(anchor.element),
                ) || [];

              return headings.map((heading) => ({
                ...result,
                url: `${result.url}#${heading.id}`,
                heading: heading.text,
                weight: 1.0,
              }));
            })
            .filter((result) => result.url.includes('/styled/'))
            .slice(0, 5);

          return (
            <>
              {headlessResults.length > 0 && (
                <>
                  <div class="px-2 py-2 font-medium text-muted-foreground">Headless</div>
                  {headlessResults.map((result) => (
                    <a href={result.url} key={result.url}>
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
              {styledResults.length > 0 && (
                <>
                  <div class="px-2 py-2 font-medium text-muted-foreground">Styled</div>
                  {styledResults.map((result) => (
                    <a href={result.url} key={result.url}>
                      <Combobox.Item
                        value={result.url}
                        class="block rounded-none border-b px-2 py-4"
                      >
                        <div class="flex flex-col gap-1">
                          <div class="text-sm capitalize text-muted-foreground opacity-50">
                            {result.url.split('/').slice(-2, -1)}
                          </div>
                          <Combobox.ItemLabel class="text-base font-medium">
                            {
                              result.anchors?.find((anchor) =>
                                ['h2', 'h3', 'h4', 'h5', 'h6'].includes(anchor.element),
                              )?.text
                            }
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
