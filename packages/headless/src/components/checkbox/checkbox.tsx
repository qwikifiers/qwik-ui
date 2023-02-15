import { component$, HTMLAttributes, Slot } from '@builder.io/qwik';

export type CheckboxProps = HTMLAttributes<HTMLElement>;

export const Checkbox = component$(
  (props: CheckboxProps) => {

    return (
      <input
        type="checkbox"
        role="checkbox"
      />
    );
  }
);

