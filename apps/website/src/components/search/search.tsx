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
      <Modal.Trigger class={cn(buttonVariants({ size: 'icon', look: 'ghost' }))}>
        <LuSearch class="h-5 w-5 sm:h-6 sm:w-6" />
      </Modal.Trigger>
      <Modal.Panel class="mt-20 max-w-[calc(100vw-32px)] p-0 sm:max-w-md">
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
          id: r.id,
          url: data.url,
          meta: data.meta,
          excerpt: data.excerpt,
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
      // @ts-expect-error wrong type
      onChange$={(value: string) => {
        // useNavigate if you're using <Link /> or CSR true
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
        {resultsSig.value?.map((result) => (
          <a href={result.url} key={result.url}>
            <Combobox.Item
              value={result.url}
              class="block rounded-none border-b px-2 py-4"
            >
              <div>
                <Combobox.ItemLabel class="text-base">
                  {result.meta.title}
                </Combobox.ItemLabel>
              </div>
              <div
                class="text-sm text-foreground"
                dangerouslySetInnerHTML={result.excerpt}
              />
            </Combobox.Item>
          </a>
        ))}
        {resultsSig.value?.length === 0 && inputValueSig.value.length > 0 && (
          <Combobox.Empty>No results found</Combobox.Empty>
        )}
      </Combobox.Inline>
    </Combobox.Root>
  );
});
