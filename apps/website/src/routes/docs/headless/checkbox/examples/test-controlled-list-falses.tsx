import { component$ } from '@qwik.dev/core';

import { Checklist } from '@qwik-ui/headless';

export default component$(() => {
  return (
    <Checklist.Root initialStates={[true, false, false]}>
      <Checklist.SelectAll class="flex h-[25px] w-[25px] items-center justify-center  border-2 border-black p-2">
        <div class="flex h-[25px] w-[25px] items-center justify-center border-2 border-black p-2">
          <Checklist.ItemIndicator>✅</Checklist.ItemIndicator>
        </div>{' '}
        Select All
      </Checklist.SelectAll>

      {Array.from({ length: 2 }, (_, index) => {
        const uniqueKey = `cl-${index}-${Date.now()}`;
        return (
          <Checklist.Item key={uniqueKey} _index={index}>
            <div class="flex h-[25px] w-[25px] items-center justify-center  border-2 border-black p-2">
              <Checklist.ItemIndicator>✅</Checklist.ItemIndicator>
            </div>
            {`item ${index}`}
          </Checklist.Item>
        );
      })}
    </Checklist.Root>
  );
});
