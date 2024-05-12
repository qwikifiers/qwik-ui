import { component$, useSignal } from '@builder.io/qwik';
import { Accordion } from '@qwik-ui/headless';
import { LuChevronDown } from '@qwikest/icons/lucide';

export default component$(() => {
  const focusedIndexSig = useSignal(0);
  const items = [1, 2, 3];

  return (
    <>
      <div class="flex w-full flex-col items-center gap-4">
        <Accordion.Root
          onFocusIndexChange$={(value: number) => {
            focusedIndexSig.value = value;
          }}
        >
          {items.map((item) => (
            <Accordion.Item class="accordion-item" key={item}>
              <Accordion.Header>
                <Accordion.Trigger class="accordion-trigger">
                  <span>Trigger {item}</span>
                  <LuChevronDown />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content class="accordion-content">
                Inside Content {item}
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
        <p>Focused Index: {focusedIndexSig.value === -1 ? 'X' : focusedIndexSig.value}</p>
      </div>
    </>
  );
});
