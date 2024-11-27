import { type PropsOf, component$, Slot } from '@builder.io/qwik';
import { Switch as HeadlessSwitch } from '@qwik-ui/headless';
import { cn } from '@qwik-ui/utils';

const Root = component$<PropsOf<typeof HeadlessSwitch.Root>>(({ ...props }) => {
  return (
    <HeadlessSwitch.Root
      {...props}
      class={cn(
        'flex-row-reverse flex items-center gap-1 justify-between cursor-pointer select-none tap-highlight-transparent',
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
      class={cn('p-[4px] bg-switchInactive inline-size-4 grid-cols-[1fr] grid-rows-[1fr] block-size-2 rounded-full appearance-none pointer-events-none touch-pan-y border-none box-content flex-shrink-0 grid transition-bg[.25s] ease before:content-[" "] before:cursor-pointer before:pointer-events-auto before:block-size-2 before:inline-size-2 before:bg-background before:rounded-[50%] before:translate-x-[0%]',
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
