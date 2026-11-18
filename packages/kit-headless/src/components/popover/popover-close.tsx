import { component$, type PropsOf, Slot, useContext } from '@builder.io/qwik';
import { popoverContextId } from './popover-types';

export const HPopoverClose = component$((props: PropsOf<'button'>) => {
  const context = useContext(popoverContextId);

  return (
    <button
      type="button"
      {...props}
      popovertarget={`${context.compId}-panel`}
      popoverTargetAction="hide"
    >
      <Slot />
    </button>
  );
});
