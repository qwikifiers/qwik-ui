import {
  $,
  component$,
  Slot,
  useClientEffect$,
  useId,
  useOnWindow,
  useSignal,
  useStylesScoped$,
} from '@builder.io/qwik';
import { computePosition, flip, type ComputePositionConfig } from '@floating-ui/dom';
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
  ({ content, position = 'top', durationMs = 0, ...props }: TooltipProps) => {
    useStylesScoped$(styles);
    const id = useId();
    const triggerAnchor = useSignal<HTMLElement>();
    const tooltipAnchor = useSignal<HTMLElement>();
    const stateSignal = useSignal<State>('hidden');

    const Wrapper: keyof HTMLElementTagNameMap = props.inline ? 'span' : 'div';

    const update = $(async () => {
      const trigger = triggerAnchor.value;
      const tooltip = tooltipAnchor.value;
      if (trigger && tooltip) {
        await computePosition(
          trigger,
          tooltip,
          {
            placement: position,
            middleware: [flip()]
          }
        ).then(({x, y}) => {
          Object.assign(tooltip.style, {
            left: `${x}px`,
            top: `${y}px`
          })
        });
        stateSignal.value = 'positioned';
      }
    });


    const showTooltip = $(() => {
      stateSignal.value = 'unpositioned';
    });

    const hideTooltip = $(() => {
      stateSignal.value = 'closing';
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

    useClientEffect$(({ track }) => {
      const state = track(() => stateSignal.value);
      if (state == 'unpositioned') {
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
            }
          }}
          ref={tooltipAnchor}
          role="tooltip"
          {...props}
          style={`--duration: ${durationMs}ms;`}
          data-state={stateSignal.value}
        >
          {content}
        </Wrapper>
      </>
    );
  }
);
