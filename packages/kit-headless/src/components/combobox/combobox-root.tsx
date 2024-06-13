import { PropsOf, Slot, component$ } from '@builder.io/qwik';

type HComboboxRootImplProps = PropsOf<'div'>;

export const HComboboxRootImpl = component$((props: HComboboxRootImplProps) => {
  return (
    <div {...props}>
      <Slot />
    </div>
  );
});
