import { component$, Slot } from '@builder.io/qwik';

interface DropdownItemProps {
  class?: string;
  className?: string;
}

export const DropdownItem = component$((props: DropdownItemProps) => {

  return (
    <li {...props}><a><Slot/></a></li>
  );
});
