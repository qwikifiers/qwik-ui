import { HTMLAttributes, Slot, component$ } from '@builder.io/qwik';
import { ButtonGroup as HeadlessButtonGroup } from '@qwik-ui/headless';
// eslint-disable-next-line @nx/enforce-module-boundaries
import type { OmitSignalClass } from '@qwik-ui/type-utils';

export type ButtonGroupProps = OmitSignalClass<HTMLAttributes<HTMLElement>>;

export const ButtonGroup = component$((props: ButtonGroupProps) => {
  const { class: classNames, ...rest } = props;
  return (
    <HeadlessButtonGroup class={['btn-group', classNames]} {...rest}>
      <Slot />
    </HeadlessButtonGroup>
  );
});
