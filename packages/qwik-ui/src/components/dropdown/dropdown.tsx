import { component$, Slot } from '@builder.io/qwik';

interface DropdownProps {
  class?: string;
  className?: string;
}

export const Dropdown = component$((props: DropdownProps) => {

  return (
    <div class="dropdown" {...props}><Slot/></div>
  );
});
