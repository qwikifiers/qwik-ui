import { component$, HTMLAttributes, Slot } from '@builder.io/qwik';
import { ButtonGroup as HeadlessButtonGroup } from '@qwik-ui/headless';
import { clsq } from '@qwik-ui/shared';

export type ButtonGroupProps = HTMLAttributes<HTMLElement>;

export const ButtonGroup = component$((props: ButtonGroupProps) => {
  const { class: classNames, ...rest } = props;
  return (
    <HeadlessButtonGroup class={clsq('btn-group', classNames)} {...rest}>
      <Slot />
    </HeadlessButtonGroup>
  );
});
