import {
  $,
  component$,
  Slot,
  useBrowserVisibleTask$,
  useId,
  useOnWindow,
  useSignal,
  useStylesScoped$,
} from '@builder.io/qwik';
import { computePosition, type ComputePositionConfig } from '@floating-ui/dom';
import styles from './tooltip.css?inline';

export interface TooltipProps {
  class?: string;
  content: string;
  inline?: boolean;
  durationMs?: number;
  position?: ComputePositionConfig['placement'];
}

type State = 'hidden' | 'positioned' | 'unpositioned' | 'closing';

export const Tooltip = component$(
  ({ content, position = 'top', durationMs = 100, ...props }: TooltipProps) => {
    useStylesScoped$(styles);
    const id = useId();
    const triggerAnchor = useSignal<HTMLElement>();
    const tooltipAnchor = useSignal<HTMLElement>();
    const stateSignal = useSignal<State>('hidden');
    const positionSignal = useSignal<{ x: number; y: number }>({ x: 0, y: 0 });
    const Wrapper: keyof HTMLElementTagNameMap = props.inline ? 'span' : 'div';
    const lastActivatedTimestamp = useSignal<number>(Date.now());

    const update = $(async () => {
      const now = Date.now();
      const hasMouseEnterDebounced = now - lastActivatedTimestamp.value >= 300;
      if (
        triggerAnchor.value &&
        tooltipAnchor.value &&
        hasMouseEnterDebounced
      ) {
        const { x, y } = await computePosition(
          triggerAnchor.value,
          tooltipAnchor.value as HTMLElement,
          {
            placement: position,
          }
        );
        lastActivatedTimestamp.value = now;
        positionSignal.value = { x, y };
        stateSignal.value = 'positioned';
      }
    });

    const showTooltip = $(() => {
      stateSignal.value = 'unpositioned';
    });

    const hideTooltip = $(() => {
      setTimeout(() => (stateSignal.value = 'closing'), durationMs);
    });

    useOnWindow(
      'keyup',
      $((e) => {
        const key = (e as KeyboardEvent).key;
        if (key === 'Escape') {
          hideTooltip();
        }
      })
    );

    useBrowserVisibleTask$(({ track }) => {
      const state = track(() => stateSignal.value);
      if (state === 'unpositioned') {
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
          class={`${stateSignal.value} ${props.class || ''}`}
          id={id}
          onAnimationEnd$={() => {
            if (stateSignal.value == 'closing') {
              stateSignal.value = 'hidden';
              positionSignal.value = { x: 0, y: 0 };
            }
          }}
          ref={tooltipAnchor}
          role="tooltip"
          {...props}
          // Cannot be animated
          style={
            `--duration: ${durationMs}ms;` +
            `--x: ${positionSignal.value.x || 0}px;` +
            `--y: ${positionSignal.value.y || 0}px;`
          }
          data-state={stateSignal.value}
        >
          {content}
          {/* {content ? content : <Slot name="tooltip-content" />} */}
        </Wrapper>
      </>
    );
  }
);
