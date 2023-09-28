import { component$, useSignal } from '@builder.io/qwik';
import { Popover } from '@qwik-ui/headless';

export default component$(() => {
  const buttonRef = useSignal<HTMLButtonElement>();

  return (
    <>
      <div>
        We're using popover target action on the trigger.{' '}
        <button
          ref={buttonRef}
          // @ts-ignore
          popovertargetaction="show"
          popovertarget="anchor-ref-id"
          class="rounded-md border-2 border-slate-300 bg-slate-800 px-3 py-1 text-white"
        >
          Popover Trigger
        </button>
      </div>

      <Popover
        anchorRef={buttonRef}
        floating={true}
        id="anchor-ref-id"
        class="shadow-dark-medium py- rounded-md border-2 border-slate-300 bg-slate-800 px-3 py-1 text-white"
      >
        I am a popover!
      </Popover>
    </>
  );
});
