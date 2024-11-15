import { type PropsOf, component$, Slot } from '@builder.io/qwik';
import { Switch as HeadlessSwitch } from '@qwik-ui/headless';

const Root = component$<PropsOf<typeof HeadlessSwitch.Root>>(({ ...props }) => {
  return (
    <HeadlessSwitch.Root {...props}>
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
  return <HeadlessSwitch.Input {...props} />;
});


export const Switch = {
  Root,
  Label,
  Input,
};
