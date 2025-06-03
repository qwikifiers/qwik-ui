import { component$ } from '@builder.io/qwik';

/**
 * TooltipArrowProps defines the properties for the Tooltip Arrow component.
 */
export type TooltipArrowProps = {
  /**
   * The width of the arrow.
   */
  width?: number;

  /**
   * The height of the arrow.
   */
  height?: number;

  /**
   * Additional class names for styling.
   */
  class?: string;
};

/**
 * HTooltipArrow is the arrow component for the Tooltip.
 */
export const HTooltipArrow = component$((props: TooltipArrowProps) => {
  const { width = 10, height = 5 } = props;

  return (
    <div
      class={['tooltip-arrow', props.class]}
      style={{
        width: `${width}px`,
        height: `${height}px`,
      }}
    />
  );
});
