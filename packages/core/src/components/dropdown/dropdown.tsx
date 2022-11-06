import { component$, Slot } from '@builder.io/qwik';

interface DropdownProps {
  class?: string;
  className?: string;
  openOnHover?: boolean;
}

export const Dropdown = component$(({ openOnHover, ...props }: DropdownProps) => {
  return (
    <div class={`dropdown ${openOnHover ? 'dropdown-hover' : ''}`} {...props}><Slot/></div>
  );
});
