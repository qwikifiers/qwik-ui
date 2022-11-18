import { component$, Slot } from '@builder.io/qwik';
import { WithClassesProp } from '../../types';

interface DropdownItemProps extends WithClassesProp {}

export const DropdownItem = component$((props: DropdownItemProps) => {
  return (
    <li {...props}>
      <a>
        <Slot />
      </a>
    </li>
  );
});
