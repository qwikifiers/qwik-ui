import { component$, HTMLAttributes, Slot, useStyles$ } from '@builder.io/qwik';

interface CheckboxProps extends HTMLAttributes<HTMLDivElement> {
  label?: string;
  checked?: boolean;
  disabled?: boolean;
  name?: string;
}

export const Checkbox = component$(
  ({ label, checked, disabled, name, ...props }: CheckboxProps) => {
    return (
      <div {...props}>
        <label for={name}>
          <input
            type="checkbox"
            role="checkbox"
            checked={checked}
            disabled={disabled}
            name={name}
            id={name}
            aria-label={label}
            aria-checked={checked}
          />
          {label}
        </label>
      </div>
    );
  }
);
