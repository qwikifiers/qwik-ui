import { $, component$, useOnWindow, useSignal, useTask$ } from '@builder.io/qwik';
import { isServer } from '@builder.io/qwik/build';
import { Combobox, Modal } from '@qwik-ui/headless';
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
  debouncedSearch: (term: string) => Promise<PagefindSearch | null>;
}

declare global {
  interface Window {
    pagefind: Pagefind;
  }
}

export const SearchModal = component$(() => {
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
      <Modal.Trigger
        class={cn(
          buttonVariants({ size: 'sm', look: 'outline' }),
          'flex h-8 items-center gap-2 sm:h-10',
        )}
      >
        <LuSearch class="h-4 w-4" />
        <span class="hidden sm:block">Search</span>
      </Modal.Trigger>
      <Modal.Panel class="fixed top-[20%] my-0">
        <Search />
      </Modal.Panel>
    </Modal.Root>
  );
});

export const Search = component$(() => {
  const results = useSignal<PagefindSearchResult[]>([]);
  const handleInput = $(async (e: InputEvent) => {
    const target = e.target as HTMLInputElement;

    await window.pagefind.preload(target.value);

    const search = await window.pagefind.debouncedSearch(target.value);

    if (search === null) {
      results.value = [];
      return;
    }

    // Get data for each result immediately
    const searchResults = await Promise.all(
      search.results.slice(0, 5).map(async (r) => {
        const data = await r.data();
        return {
          id: r.id,
          url: data.url,
          meta: data.meta,
          excerpt: data.excerpt,
        };
      }),
    );

    results.value = searchResults;
  });

  return (
    <Combobox.Root mode="inline" filter={false}>
      <Combobox.Input onInput$={handleInput} data-id="search" />
      <Combobox.Inline>
        {results.value.map((result) => (
          <Combobox.Item key={result.url}>
            <Combobox.ItemLabel>{result.meta.title}</Combobox.ItemLabel>
          </Combobox.Item>
        ))}
        <Combobox.Empty>No results found</Combobox.Empty>
      </Combobox.Inline>
    </Combobox.Root>
  );
});
