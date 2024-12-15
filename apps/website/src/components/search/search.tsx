import { $, component$, useOnWindow, useSignal } from '@builder.io/qwik';
import { Combobox, Modal } from '@qwik-ui/headless';
import { buttonVariants } from '@qwik-ui/styled';
import { cn } from '@qwik-ui/utils';
import { LuSearch } from '@qwikest/icons/lucide';

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
  const results = ['result 1', 'result 2', 'result 3'];

  return (
    <Combobox.Root mode="inline">
      <Combobox.Input />
      <Combobox.Inline>
        {results.map((result) => (
          <Combobox.Item key={result}>
            <Combobox.ItemLabel>{result}</Combobox.ItemLabel>
          </Combobox.Item>
        ))}
      </Combobox.Inline>
    </Combobox.Root>
  );
});
