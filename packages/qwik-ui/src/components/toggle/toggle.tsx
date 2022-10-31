import { component$, Slot } from '@builder.io/qwik';

interface ToggleProps {
  class?: string;
  className?: string;
  checked: boolean;
  label?: string;
}

export const Toggle = component$(
  ({ checked, label, ...props }: ToggleProps) => {
    return (
      <div class="form-control">
        <label class="label cursor-pointer">
          {label && <span class="label-text">{label}</span>}
          <input type="checkbox" class="toggle" checked={checked} {...props} />
        </label>
      </div>
    );
  }
);
