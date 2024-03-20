import { PropsOf, Slot, component$, useStyles$ } from '@builder.io/qwik';
import {
  PopoverTrigger as QwikUIPopoverTrigger,
  Popover as QwikUIPopover,
} from '@qwik-ui/headless';
import { cn } from '@qwik-ui/utils';

export const PopoverTrigger = QwikUIPopoverTrigger;

export const Popover = component$<PropsOf<typeof QwikUIPopover>>(
  ({ floating, ...props }) => {
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
      <QwikUIPopover
        {...props}
        floating={floating}
        class={cn(
          'my-transition w-72 rounded-md border bg-popover p-4 text-popover-foreground opacity-0 shadow-md outline-none',
          floating && 'absolute m-0',
          props.class,
        )}
      >
        <Slot />
      </QwikUIPopover>
    );
  },
);
