import { component$ } from '@builder.io/qwik';
import { Popover, PopoverTrigger } from '@qwik-ui/headless';
export default component$(() => {
  return (
    <>
      {[0, 1].map((i) => (
        <>
          <PopoverTrigger popovertarget={`auto-${i}`} class="popover-trigger">
            Popover Trigger {i + 1}
          </PopoverTrigger>
          <Popover
            style={{ top: i === 1 ? '25px' : '0' }}
            id={`auto-${i}`}
            class="popover"
          >
            Popover {i + 1}
          </Popover>
        </>
      ))}
    </>
  );
});
