import { PropsOf, Slot, component$ } from '@builder.io/qwik';
import { HPopoverRoot } from '../popover/popover-root';

export const HTooltipRoot = component$((props: PropsOf<typeof HPopoverRoot>) => {
  const { hover = true, floating = 'top', ...rest } = props;

  return (
    <HPopoverRoot hover={hover} floating={floating} {...rest}>
      <Slot />
    </HPopoverRoot>
  );
});
