import { component$, Slot } from '@builder.io/qwik';

interface DropdownContentProps {
  class?: string;
  className?: string;
}

export const DropdownContent = component$((props: DropdownContentProps) => {
  return (
    <ul tabIndex={0} class="dropdown-content menu rounded-box p-2 shadow bg-base-100 w-52" {...props}><Slot/></ul>
  );
});
