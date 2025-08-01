import { PropsOf, component$, useContext } from '@builder.io/qwik';

import { popoverContextId } from './popover-types';

export const HPopoverPanelArrow = component$((props: PropsOf<'div'>) => {
  const context = useContext(popoverContextId);

  return <div ref={context.arrowRef} {...props} />;
});
