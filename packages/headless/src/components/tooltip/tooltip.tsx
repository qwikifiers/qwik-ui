import { $, component$, Slot, useSignal } from '@builder.io/qwik';
import { computePosition } from '@floating-ui/dom';

interface TooltipProps {
  message: string;
  position?: 'top' | 'left' | 'bottom' | 'right';
}

export const Tooltip = component$(
  ({ message, position = 'top', ...props }: TooltipProps) => {
    const slotted = useSignal<HTMLElement>();
    const tooltipAnchor = useSignal<HTMLElement>();
    const isTooltipVisible = useSignal<boolean>(false);
    const xSignal = useSignal<number>(0);
    const ySignal = useSignal<number>(0);

    const update = $(async () => {
      if (slotted.value && tooltipAnchor.value) {
        const { x, y } = await computePosition(
          slotted.value,
          tooltipAnchor.value as HTMLElement,
          {
            placement: position,
          }
        );
        xSignal.value = x;
        ySignal.value = y;
      }
    });

    const showTooltip = $(() => {
      isTooltipVisible.value = true;
      update();
    });

    const hideTooltip = $(() => {
      isTooltipVisible.value = false;
    });

    return (
      <>
        <div
          ref={slotted}
          onMouseEnter$={() => showTooltip()}
          onMouseLeave$={() => hideTooltip()}
          onFocus$={() => showTooltip()}
          onBlur$={() => hideTooltip()}
        >
          <Slot />
        </div>

        <div
          ref={tooltipAnchor}
          role="tooltip"
          {...props}
          style={`${
            isTooltipVisible.value ? 'display: block' : 'display: none'
          }; 
            left: ${xSignal.value}px; 
            top: ${ySignal.value}px;`}
        >
          {message}
        </div>
      </>
    );
  }
);
