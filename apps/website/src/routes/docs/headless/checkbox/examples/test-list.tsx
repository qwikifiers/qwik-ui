import { component$ } from '@qwik.dev/core';

import { Checklist } from '@qwik-ui/headless';

export default component$(() => {
  return (
    <Checklist.Root initialStates={[false, false, false]}>
      <Checklist.SelectAll
        class="flex h-[25px] w-[25px] items-center justify-center border-2 border-black bg-slate-600 p-2"
        aria-labelledby="test123"
        id="selectAll"
      >
        <div class="flex h-[25px] w-[25px] items-center justify-center border-2 border-black p-2">
          <Checklist.ItemIndicator>✅</Checklist.ItemIndicator>
        </div>{' '}
        Select All
      </Checklist.SelectAll>

      <Checklist.Item>
        <div class="flex h-[25px] w-[25px] items-center justify-center  border-2 border-black p-2">
          <Checklist.ItemIndicator>✅</Checklist.ItemIndicator>
        </div>
        first item
      </Checklist.Item>
      <Checklist.Item>
        <div class="flex h-[25px] w-[25px] items-center justify-center  border-2 border-black p-2">
          <Checklist.ItemIndicator>✅</Checklist.ItemIndicator>
        </div>
        second item
      </Checklist.Item>
    </Checklist.Root>
  );
});
