import { PropsOf, Slot, component$, useContext } from '@qwik.dev/core';
import { HPopoverPanel } from '../popover/popover-panel';
import { TooltipContextId } from './tooltip-context';

export type HTooltipPanelProps = PropsOf<typeof HPopoverPanel>;

/**
 * HTooltipPanel is the panel component for the Tooltip.
 */
export const HTooltipPanel = component$((props: HTooltipPanelProps) => {
  const context = useContext(TooltipContextId);

  return (
    <HPopoverPanel
      {...props}
      role="tooltip"
      onToggle$={(e) => context.onOpenChange$(e.newState)}
      id={context.localId}
    >
      <Slot />
    </HPopoverPanel>
  );
});
