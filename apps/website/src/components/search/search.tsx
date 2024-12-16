import { $, component$, useOnWindow, useSignal, useTask$ } from '@builder.io/qwik';
import { isServer } from '@builder.io/qwik/build';
import { Combobox, Modal } from '@qwik-ui/headless';
import { buttonVariants } from '@qwik-ui/styled';
import { cn } from '@qwik-ui/utils';
import { LuSearch } from '@qwikest/icons/lucide';

interface SearchResult {
  url: string;
  meta: {
    title: string;
  };
  excerpt?: string;
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
  const results = useSignal<SearchResult[]>([]);

  useOnWindow(
    'searchResults',
    $((event: CustomEvent) => {
      results.value = event.detail;

      console.log(results.value);
    }),
  );

  return (
    <Combobox.Root mode="inline" filter={false}>
      <Combobox.Input data-id="search" />
      <Combobox.Inline>
        {results.value.map((result) => (
          <Combobox.Item value={result.url} key={result.meta.title}>
            <Combobox.ItemLabel>{result.meta.title}</Combobox.ItemLabel>
            <div dangerouslySetInnerHTML={result.excerpt}></div>
          </Combobox.Item>
        ))}
      </Combobox.Inline>
    </Combobox.Root>
  );
});
