import { PropsOf, component$, useContext } from '@qwik.dev/core';

import { popoverContextId } from './popover-context';

export const HPopoverPanelArrow = component$((props: PropsOf<'div'>) => {
  const context = useContext(popoverContextId);

  return <div ref={context.arrowRef} {...props} />;
});
