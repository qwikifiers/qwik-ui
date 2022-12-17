import { component$, PropFunction, QwikMouseEvent } from '@builder.io/qwik';
import { Toggle as HeadlessToggle } from '@qwik-ui/headless';

interface ToggleProps {
  class?: string;
  checked: boolean;
  label?: string;
  onClick$: PropFunction<(evt: QwikMouseEvent) => void>;
}

export const Toggle = component$(
  ({ checked, label, ...props }: ToggleProps) => {
    return (
      <div class="form-control">
        <label class="label cursor-pointer">
          {label && <span class="label-text">{label}</span>}
          <HeadlessToggle class="toggle" pressed={checked} {...props} />
        </label>
      </div>
    );
  }
);
