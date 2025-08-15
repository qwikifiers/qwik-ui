import { type PropsOf, Slot, component$ } from '@builder.io/qwik';
import { Tooltip as HeadlessTooltip } from '@qwik-ui/headless';
import { cn } from '@qwik-ui/utils';

const Root = component$<PropsOf<typeof HeadlessTooltip.Root>>(({ ...props }) => {
  return (
    <HeadlessTooltip.Root {...props}>
      <Slot />
    </HeadlessTooltip.Root>
  );
});

const Trigger = HeadlessTooltip.Trigger;

const Panel = component$<PropsOf<typeof HeadlessTooltip.Panel>>(({ ...props }) => {
  return (
    <HeadlessTooltip.Panel
      {...props}
      class={cn(
        'w-fit animate-in rounded-md border bg-background px-3 py-1.5 text-xs text-balance text-foreground shadow-sm fade-in-0 zoom-in-95',
        'data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95',
        'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        props.class,
      )}
    >
      <Slot />
    </HeadlessTooltip.Panel>
  );
});

export const Tooltip = {
  Root,
  Trigger,
  Panel,
};
