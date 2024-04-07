import { component$ } from '@builder.io/qwik';
import { Popover, PopoverTrigger } from '@qwik-ui/headless';
export default component$(() => {
  return (
    <>
      {[0, 1].map((i) => (
        <>
          <PopoverTrigger popovertarget={`manual-${i}`} class="popover-trigger">
            Popover Trigger {i + 1}
          </PopoverTrigger>
          <Popover
            style={{ top: i === 1 ? '25px' : '0' }}
            manual
            id={`manual-${i}`}
            class="popover"
          >
            Popover {i + 1}
          </Popover>
        </>
      ))}
    </>
  );
});
