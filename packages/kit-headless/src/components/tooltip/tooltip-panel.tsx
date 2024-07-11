import { PropsOf, Slot, component$, useContext } from '@builder.io/qwik';
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
      id={context.localId}
      data-state={context.state.value}
    >
      <Slot />
    </HPopoverPanel>
  );
});
