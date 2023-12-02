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
      <div class="flex w-full flex-col items-center text-white">
        <div class="flex gap-4">
          <label class="mb-4 flex flex-col-reverse items-center text-center">
            <input
              class="max-w-[50px] rounded-md bg-slate-700 px-2"
              type="text"
              bind:value={itemIndexToAdd}
            />
            <span>Index to Add</span>
          </label>

          <label class="mb-4 flex flex-col-reverse items-center text-center">
            <input
              class="max-w-[50px] rounded-md bg-slate-700 px-2"
              type="text"
              bind:value={itemIndexToDelete}
            />
            <span>Index to Delete</span>
          </label>
        </div>

        <AccordionRoot class="box-border w-[min(400px,_100%)] rounded-sm border-[1px] border-t-0 border-slate-600 bg-slate-700 text-white">
          {itemStore.map(({ label, id }, index) => {
            return (
              <AccordionItem id={`${id}`} key={id}>
                <AccordionHeader>
                  <AccordionTrigger class="group flex w-full items-center justify-between rounded-t-sm border-t-[1px] border-slate-600 border-slate-600 bg-slate-700 px-4 py-2 text-left hover:bg-slate-800">
                    {label}
                  </AccordionTrigger>
                </AccordionHeader>
                <AccordionContent class="border-t-[1px] border-slate-600 bg-slate-900 p-4">
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
