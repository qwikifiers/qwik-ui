import { component$, useSignal } from '@builder.io/qwik';
import { Accordion } from '@qwik-ui/headless';
import { LuChevronDown } from '@qwikest/icons/lucide';

export default component$(() => {
  const selectedIndexSig = useSignal(0);

  const items = [1, 2, 3];

  return (
    <>
      <Accordion.Root
        onSelectedIndexChange$={(value: number) => {
          selectedIndexSig.value = value;
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
      <p style={{ marginTop: '1rem' }}>
        {selectedIndexSig.value === -1
          ? 'No selected index'
          : `Selected index: ${selectedIndexSig.value}`}
      </p>
    </>
  );
});
