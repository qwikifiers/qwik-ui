import { component$, HTMLAttributes, Slot } from '@builder.io/qwik';
import { ButtonGroup as HeadlessButtonGroup } from '@qwik-ui/headless';

export type ButtonGroupProps = HTMLAttributes<HTMLElement>;

// TODO: discuss this

export const ButtonGroup = component$((props: ButtonGroupProps) => {
  const { class: classNames, ...rest } = props;
  return (
    <HeadlessButtonGroup class={['btn-group', classNames]} {...rest}>
      <Slot />
    </HeadlessButtonGroup>
  );
});
