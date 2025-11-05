import { type PropsOf, Slot, component$ } from '@builder.io/qwik';
import { Popover as HeadlessPopover } from '@qwik-ui/headless';
import { cn } from '@qwik-ui/utils';

const Root = component$<PropsOf<typeof HeadlessPopover.Root>>(({ ...props }) => {
  return (
    <HeadlessPopover.Root {...props}>
      <Slot />
    </HeadlessPopover.Root>
  );
});

const Trigger = HeadlessPopover.Trigger;

const Panel = component$<PropsOf<typeof HeadlessPopover.Panel>>(({ ...props }) => {
  return (
    <HeadlessPopover.Panel
      {...props}
      class={cn(
        'my-transition w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-hidden',
        'data-closing:animate-out data-closing:zoom-out-95 data-closing:fade-out data-open:animate-in data-open:zoom-in-95 data-open:fade-in',
        props.class,
      )}
    >
      <Slot />
    </HeadlessPopover.Panel>
  );
});

export const Popover = {
  Root,
  Trigger,
  Panel,
};
