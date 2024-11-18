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
      class={cn(
        `class="p-2px bg-inactive inline-size[4rem] block-size[2rem] rounded-full
        appearance-none pointer-events-none touch-pan-y border-none outline-offset[5px]
        box-content flex-shrink-0 grid place-items-center grid-cols-[track] transition-bg[.25s]
        ease before:content-[""] before:cursor-pointer before:pointer-events-auto before:grid-area-[track]
        before:inline-size[2rem] before:block-size[2rem] before:bg-thumb before:box-shadow[0_0_0_0_hsla(var(--switch-thumb-color-highlight))]
        before:rounded-[50%] before:transform[translateX(0%)]`,
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
