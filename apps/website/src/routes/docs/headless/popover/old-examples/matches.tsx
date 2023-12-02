import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import { Popover } from '@qwik-ui/headless';

export default component$(() => {
  const popoverRef = useSignal<HTMLElement>();

  useVisibleTask$(({ track }) => {
    track(() => popoverRef.value?.matches(':popover-open'));

    console.log('popoverRef.value:', popoverRef.value);

    if (popoverRef.value) {
      console.log('popoverRef.value.matches:', popoverRef.value.matches(':popover-open'));
    } else {
      console.log('popoverRef.value is undefined');
    }

    if (popoverRef.value?.matches(':popover-open')) {
      console.log('The popover is open');
    }
  });

  return (
    <>
      <button
        // @ts-ignore
        popovertarget="matches-id"
        class="rounded-md border-2 border-slate-300 bg-slate-800 px-3 py-1 text-white"
      >
        Popover Trigger
      </button>
      <Popover
        id="matches-id"
        popoverRef={popoverRef}
        class="shadow-dark-medium rounded-md border-2 border-slate-300 bg-slate-800 px-3 py-1"
      >
        Popover
      </Popover>
    </>
  );
});
