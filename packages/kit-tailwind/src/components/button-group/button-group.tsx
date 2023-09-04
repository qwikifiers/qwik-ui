import { HTMLAttributes, Slot, component$ } from '@builder.io/qwik';
import { ButtonGroup as HeadlessButtonGroup } from '@qwik-ui/headless';
// eslint-disable-next-line @nx/enforce-module-boundaries
import type { OmitSignalClass } from '../../../../shared/src/utils';

export type ButtonGroupProps = OmitSignalClass<HTMLAttributes<HTMLElement>>;

// TODO: discuss this

export const ButtonGroup = component$((props: ButtonGroupProps) => {
  const { class: classNames, ...rest } = props;
  return (
    <HeadlessButtonGroup class={['btn-group', classNames]} {...rest}>
      <Slot />
    </HeadlessButtonGroup>
  );
});
