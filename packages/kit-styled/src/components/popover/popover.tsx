import { PropsOf, Slot, component$, useStyles$ } from '@builder.io/qwik';
import { Popover } from '@qwik-ui/headless';
import { cn } from '@qwik-ui/utils';

export const PopoverRoot = component$(() => {
  return (
    <Popover.Root gutter={8}>
      <Slot />
    </Popover.Root>
  );
});

export const PopoverTrigger = Popover.Trigger;

export const PopoverPanel = component$<PropsOf<typeof Popover.Panel>>(({ ...props }) => {
  useStyles$(`
    .my-transition {
      transition: opacity 150ms, display 150ms, overlay 150ms;
      transition-behavior: allow-discrete;
    }
  
    .popover-showing {
      opacity: 1;
    }
  
    .popover-closing {
      opacity: 0;
    }
    `);

  return (
    <Popover.Panel
      {...props}
      class={cn(
        'my-transition w-72 rounded-md border bg-popover p-4 text-popover-foreground opacity-0 shadow-md outline-none',
        props.class,
      )}
    >
      <Slot />
    </Popover.Panel>
  );
});
