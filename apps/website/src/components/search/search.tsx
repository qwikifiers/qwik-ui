import { component$ } from '@builder.io/qwik';
import { Combobox, Modal } from '@qwik-ui/headless';

export const SearchModal = component$(() => {
  return (
    <Modal.Root>
      <Modal.Trigger class="sha border border-foreground">Search</Modal.Trigger>
      <Modal.Panel>
        <Search />
      </Modal.Panel>
    </Modal.Root>
  );
});

export const Search = component$(() => {
  const results = ['result 1', 'result 2', 'result 3'];

  return (
    <Combobox.Root>
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
