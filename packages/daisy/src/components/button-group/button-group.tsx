import { component$, HTMLAttributes, Slot } from '@builder.io/qwik';
import { ButtonGroup as HeadlessButtonGroup } from '@qwik-ui/headless';

export type ButtonGroupProps = HTMLAttributes<HTMLElement>;

export const ButtonGroup = component$(
  (props: ButtonGroupProps) => {
    return (
      <HeadlessButtonGroup {...props} class="btn-group" >
        <Slot />
      </HeadlessButtonGroup>
    );
  }
);
