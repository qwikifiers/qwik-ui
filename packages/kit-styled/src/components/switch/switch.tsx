import { type PropsOf, component$, Slot } from '@builder.io/qwik';
import { Switch as HeadlessSwitch } from '@qwik-ui/headless';
import { cn } from '@qwik-ui/utils';

const Root = component$<PropsOf<typeof HeadlessSwitch.Root>>(({ ...props }) => {
  return (
    <HeadlessSwitch.Root
      {...props}
      class={cn(
        'tap-highlight-transparent flex cursor-pointer select-none flex-row-reverse items-center justify-between gap-[8px]',
        props.class,
      )}
    >
      <Slot />
    </HeadlessSwitch.Root>
  );
});

const Label = component$<PropsOf<typeof HeadlessSwitch.Label>>(({ ...props }) => {
  return (
    <HeadlessSwitch.Label {...props}>
      <Slot />
    </HeadlessSwitch.Label>
  );
});

const Input = component$<PropsOf<typeof HeadlessSwitch.Input>>(({ ...props }) => {
  return (
    <HeadlessSwitch.Input
      {...props}
      class={cn(
        `bg-switchInactive transition-bg[.25s] ease before:content-[" "]
        pointer-events-none box-content grid flex-shrink-0 touch-pan-y
        appearance-none grid-cols-[1fr] grid-rows-[1fr] rounded-full
        border-none p-[4px] block-size-8 inline-size-16 before:pointer-events-auto
        before:translate-x-[0%] before:cursor-pointer before:rounded-[50%]
        before:bg-background before:block-size-8 before:inline-size-8
        enabled:hover:before:shadow-[0_0_0_0.5rem_hsla(var(--switch-thumb-color-highlight))]
        disabled:cursor-not-allowed disabled:opacity-35 disabled:before:cursor-not-allowed
        disabled:before:box-shadow-[inset_0_0_0_2px_hsl(0_0%_100%_/_10%)]
        checked:bg-primary checked:before:translate-x-[100%] focus:outline-2 focus:outline-primary
        focus:outline-offset-2,
        `,
        props.class,
      )}
    />
  );
});

export const Switch = {
  Root,
  Label,
  Input,
};
