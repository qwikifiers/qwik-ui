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
  search: (term: string) => PagefindSearch | null;
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
          buttonVariants({ size: 'icon', look: 'ghost' }),
          'flex h-8 items-center gap-2 sm:h-10',
        )}
      >
        <LuSearch class="h-5 w-5 sm:h-6 sm:w-6" />
      </Modal.Trigger>
      <Modal.Panel class="fixed top-[10%] my-0 w-[min(100%,768px)] rounded-[8px] bg-background shadow-lg backdrop:backdrop-brightness-[60%] dark:bg-muted dark:shadow-2xl">
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

    const search = await window.pagefind.search(target.value);

    if (search === null) {
      results.value = [];
      return;
    }

    const searchResults = await Promise.all(
      search.results.map(async (r) => {
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
    <Combobox.Root
      mode="inline"
      filter={false}
      onChange$={(value: string) => {
        // useNavigate if you're using <Link /> or CSR true
        window.location.href = value;
      }}
    >
      <Combobox.Input
        class="min-h-[48px] w-full rounded-t-[8px] bg-muted px-4 text-foreground outline-ring"
        onInput$={handleInput}
        data-id="search"
      />
      <Combobox.Inline class="flex flex-col">
        {results.value.map((result) => (
          <a href={result.url} key={result.url}>
            <Combobox.Item
              value={result.url}
              class="border-b border-foreground/10 px-2 py-4 data-[highlighted]:bg-foreground/10"
            >
              <Combobox.ItemLabel class="text-lg font-bold text-foreground">
                {result.meta.title}
              </Combobox.ItemLabel>
              <div
                class="text-sm text-foreground"
                dangerouslySetInnerHTML={result.excerpt}
              />
            </Combobox.Item>
          </a>
        ))}
        <Combobox.Empty class="px-2 py-4 text-foreground">
          No results found
        </Combobox.Empty>
      </Combobox.Inline>
    </Combobox.Root>
  );
});
