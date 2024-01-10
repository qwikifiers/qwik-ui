import { component$ } from '@builder.io/qwik';
import {
  Toggle as HeadlessToggle,
  ToggleProps as HeadlessToggleProps,
} from '@qwik-ui/headless';

export type ToggleProps = HeadlessToggleProps & {
  class?: string;
  label?: string;
};

export const Toggle = component$(({ label, ...props }: ToggleProps) => {
  return (
    <div class="form-control">
      <label class="label cursor-pointer">
        {label && <span class="label-text">{label}</span>}
        <HeadlessToggle class="toggle" {...props} />
      </label>
    </div>
  );
});
