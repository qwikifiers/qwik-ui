import { component$ } from '@builder.io/qwik';
import { Popover } from '@qwik-ui/headless';

export default component$(() => {
  const myPopovers = [
    { id: 'manual-1', content: 'Popover 1' },
    { id: 'manual-2', content: 'Popover 2' },
  ];

  return (
    <>
      {myPopovers.map((popover, index) => (
        <>
          <button
            //@ts-ignore
            popovertarget={popover.id}
            class="rounded-md border-2 border-slate-300 bg-slate-800 px-3 py-1 text-white"
          >
            Popover Trigger {index + 1}
          </button>

          <Popover
            manual
            id={popover.id}
            class="shadow-dark-medium py- rounded-md border-2 border-slate-300 bg-slate-800 px-3 py-1"
            style={{ top: `${index * 20}px` }}
          >
            {popover.content}
          </Popover>
        </>
      ))}
    </>
  );
});