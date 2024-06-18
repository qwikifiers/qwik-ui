import { PropsOf, Slot, component$ } from '@builder.io/qwik';

type DropdownItemIndicatorProps = PropsOf<'div'>;

export const HDropdownItemIndicator = component$((props: DropdownItemIndicatorProps) => {
  return (
    <div data-indicator {...props} q:slot="dropdown-item-indicator">
      <Slot />
    </div>
  );
});
