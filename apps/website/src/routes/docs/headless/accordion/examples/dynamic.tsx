import { component$, useSignal, useStore } from '@builder.io/qwik';
import { Accordion } from '@qwik-ui/headless';

interface DynamicAccordionProps {
  itemIndexToDelete?: number;
  itemIndexToAdd?: number;
  itemsLength: number;
}

export default component$(({ itemsLength = 3 }: DynamicAccordionProps) => {
  const itemIndexToAdd = useSignal<string>('0');
  const itemIndexToDelete = useSignal<string>('0');

  // start off with some items
  const items = [];
  const newItem = { label: 'New Item', id: Math.random() };

  for (let i = 0; i < itemsLength; i++) {
    items.push({
      label: `Original Item ${i + 1}`,
      id: Math.random(),
    });
  }

  const itemStore = useStore<{ label: string; id: number }[]>(items);

  return (
    <>
      <div class="dynamic-input">
        <label class="add">
          <input bind:value={itemIndexToAdd} />
          <span>Index to Add</span>
        </label>

        <label class="delete">
          <input bind:value={itemIndexToDelete} />
          <span>Index to Delete</span>
        </label>
      </div>

      <Accordion.Root>
        {itemStore.map(({ label, id }, index) => {
          return (
            <Accordion.Item id={`${id}`} key={id} class="collapsible">
              <Accordion.Header>
                <Accordion.Trigger class="collapsible-trigger">{label}</Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content class="collapsible-content collapsible-content-outline">
                index: {index}
              </Accordion.Content>
            </Accordion.Item>
          );
        })}
      </Accordion.Root>

      <div class="dynamic-buttons">
        <button
          onClick$={() => {
            if (itemStore.length < 6) {
              itemStore.splice(parseInt(itemIndexToAdd.value), 0, newItem);
            }
          }}
        >
          <strong>Add Item</strong>
        </button>
        <button
          onClick$={() => {
            if (itemStore.length > 2) {
              itemStore.splice(parseInt(itemIndexToDelete.value), 1);
            }
          }}
        >
          <strong>Remove Item</strong>
        </button>
      </div>
    </>
  );
});
