import { component$, useSignal, useStore } from '@builder.io/qwik';
import {
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionRoot,
  AccordionTrigger,
} from '@qwik-ui/headless';

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
      <div class="flex w-full flex-col items-center">
        <div class="flex gap-4">
          <label class="mb-4 flex flex-col-reverse items-center text-center">
            <input
              class="bg-accent max-w-[50px] rounded-md px-2"
              type="text"
              bind:value={itemIndexToAdd}
            />
            <span>Index to Add</span>
          </label>

          <label class="mb-4 flex flex-col-reverse items-center text-center">
            <input
              class="bg-accent max-w-[50px] rounded-md px-2"
              type="text"
              bind:value={itemIndexToDelete}
            />
            <span>Index to Delete</span>
          </label>
        </div>

        <AccordionRoot class="w-[min(400px,_100%)] text-slate-50">
          {itemStore.map(({ label, id }, index) => {
            const firstItem = index === 0;
            const className = firstItem
              ? 'bg-slate-700 p-4 group flex w-full items-center justify-between rounded-t-sm  text-left hover:underline'
              : 'bg-slate-700 p-4 group flex w-full items-center justify-between   text-left hover:underline';
            return (
              <AccordionItem id={`${id}`} key={id} class="border-b border-slate-950">
                <AccordionHeader>
                  <AccordionTrigger class={className}>{label}</AccordionTrigger>
                </AccordionHeader>
                <AccordionContent class="bg-slate-950 p-4">
                  index: {index}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </AccordionRoot>
        <div class="flex gap-2 md:gap-4">
          <button
            style={{ color: 'green', marginTop: '1rem' }}
            onClick$={() => {
              if (itemStore.length < 6) {
                itemStore.splice(parseInt(itemIndexToAdd.value), 0, newItem);
              }
            }}
          >
            <strong>Add Item</strong>
          </button>
          <button
            style={{ color: 'red', marginTop: '1rem' }}
            onClick$={() => {
              if (itemStore.length > 2) {
                itemStore.splice(parseInt(itemIndexToDelete.value), 1);
              }
            }}
          >
            <strong>Remove Item</strong>
          </button>
        </div>
      </div>
    </>
  );
});
