import { component$ } from '@builder.io/qwik';

import { Checklist } from '@qwik-ui/headless';

export default component$(() => {
  return (
    <Checklist.Root initialStates={[false, false, false]}>
      <Checklist.SelectAll class="flex items-center justify-center  border-2 p-2">
        <div class="flex items-center justify-center border-2 p-2">
          <Checklist.ItemIndicator>✅</Checklist.ItemIndicator>
        </div>{' '}
        Select All
      </Checklist.SelectAll>

      {Array.from({ length: 2 }, (_, index) => {
        const uniqueKey = `cl-${index}-${Date.now()}`;
        return (
          <Checklist.Item key={uniqueKey} _index={index}>
            <div class="flex items-center justify-center  border-2 p-2">
              <Checklist.ItemIndicator>✅</Checklist.ItemIndicator>
            </div>
            {`item ${index}`}
          </Checklist.Item>
        );
      })}
    </Checklist.Root>
  );
});
