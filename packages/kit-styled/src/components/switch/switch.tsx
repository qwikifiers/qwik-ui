import { type PropsOf, component$, Slot } from '@builder.io/qwik';
import { Switch as HeadlessSwitch } from '@qwik-ui/headless';
import { cn } from '@qwik-ui/utils';



const Root = component$<PropsOf<typeof HeadlessSwitch.Root>>(({ ...props }) => {
  return (
    <HeadlessSwitch.Root
      {...props}
      class={cn(
        'flex flex-row-reverse items-center gap-1 justify-between cursor-pointer select-none tap-highlight-transparent',
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
      class={props.class}
    />
  );
});

export const Switch = {
  Root,
  Label,
  Input,
};
