import { component$ } from '@builder.io/qwik';

interface DrawerTriggerProps {
  class?: string;
  className?: string;
  id: string;
  label: string;
}

export const DrawerTrigger = component$(
  ({ id, label, ...props }: DrawerTriggerProps) => {
    return (
      <label for={id} class="btn btn-primary drawer-button" {...props}>
        {label}
      </label>
    );
  }
);
