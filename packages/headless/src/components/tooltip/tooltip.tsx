import {
  $,
  component$,
  Slot,
  useClientEffect$,
  useId,
  useOnWindow,
  useSignal,
} from '@builder.io/qwik';
import { computePosition, type ComputePositionConfig } from '@floating-ui/dom';

interface TooltipProps {
  content?: string;
  inline?: boolean;
  position?: ComputePositionConfig['placement'];
}

type TooltipState = 'NotInDom' | 'InDomNotVisible' | 'inDomVisible';

export const Tooltip = component$(
  ({ content, position = 'top', ...props }: TooltipProps) => {
    const id = useId();
    const triggerAnchor = useSignal<HTMLElement>();
    const tooltipAnchor = useSignal<HTMLElement>();
    const isTooltipVisible = useSignal<boolean>(false);
    const xSignal = useSignal<number>(0);
    const ySignal = useSignal<number>(0);

    const Wrapper: keyof HTMLElementTagNameMap = props.inline ? 'span' : 'div';

    const update = $(async () => {
      if (triggerAnchor.value && tooltipAnchor.value) {
        const { x, y } = await computePosition(
          triggerAnchor.value,
          tooltipAnchor.value as HTMLElement,
          {
            placement: position,
          }
        );
        console.log(`x: ${x} y: ${y}`);
        xSignal.value = x;
        ySignal.value = y;
      }
    });

    const showTooltip = $(() => {
      isTooltipVisible.value = true;
    });

    const hideTooltip = $(() => {
      isTooltipVisible.value = false;
    });

    useOnWindow(
      'keyup',
      $((e) => {
        const key = (e as KeyboardEvent).key;
        console.log('e.key', (e as KeyboardEvent).key);
        if (key === 'Escape') {
          hideTooltip();
        }
        // if the key pressed was escape, hide the tip.
      })
    );

    useClientEffect$(({ track }) => {
      const visible = track(() => isTooltipVisible.value);
      if (visible) {
        // run auto update
        update();
      } else {
        // Cleanup auto update listeners
      }
    });

    return (
      <>
        <Wrapper
          style="width: fit-content;"
          tabIndex={0}
          ref={triggerAnchor}
          onMouseEnter$={() => showTooltip()}
          onMouseLeave$={() => hideTooltip()}
          onFocus$={() => showTooltip()}
          onBlur$={() => hideTooltip()}
          // need an id for the tooltip;
          aria-describedby={`#${id}`}
        >
          <Slot />
        </Wrapper>

        <Wrapper
          id={id}
          ref={tooltipAnchor}
          role="tooltip"
          {...props}
          // Cannot be animated
          style={`display: ${isTooltipVisible.value ? 'block' : 'none'};
            position: absolute;
            left: ${xSignal.value}px;
            top: ${ySignal.value}px;`}
        >
          {content ? content : <Slot name="tooltip-content" />}
        </Wrapper>
      </>
    );
  }
);
