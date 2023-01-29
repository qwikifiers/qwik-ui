import {
  $,
  component$,
  Signal,
  Slot,
  useClientEffect$,
  useId,
  useOnWindow,
  useSignal,
  useStylesScoped$,
} from '@builder.io/qwik';
import { autoUpdate, computePosition, flip, type Placement } from '@floating-ui/dom';
import styles from './tooltip.css?inline';

export interface TooltipProps {
  class?: string;
  content: string;
  inline?: boolean;
  durationMs?: number;
  position?: Placement;
}

type State = 'hidden' | 'positioned' | 'unpositioned' | 'closing';

export interface TipProps {
  id: string,
  position: Placement
  triggerAnchor: Signal<HTMLElement | undefined>
  tooltipAnchor: Signal<HTMLElement | undefined>
  content: string
  class?: string
  stateSignal: Signal<State>
  durationMs?: number
  as: 'div' | 'span'
}

export const Tip = component$(({ id, content, position, triggerAnchor, tooltipAnchor, stateSignal, durationMs = 0, ...props}: TipProps) => {
  const Wrapper = props.as;
  useStylesScoped$(styles);
  useClientEffect$(async ({ track, cleanup }) => {
    const state = track(() => stateSignal.value);
    if (state === 'unpositioned') {
      let trigger = triggerAnchor.value;
      let tooltip = tooltipAnchor.value;
      if (!trigger || ! tooltip) { return }
      cleanup(autoUpdate(trigger, tooltip, async () => { console.log('auto-update'); await update(position, triggerAnchor, tooltipAnchor) }));
      stateSignal.value = 'positioned';
      return;
    }
  }, { eagerness: 'visible'});

  useClientEffect$(({cleanup}) => {
    cleanup(() => console.log('cleaning up', id));
  })
  return <Wrapper
      data-tooltip
      class={`${props.class || ''}`}
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
})

export const update = $(async (position: Placement, triggerAnchor: Signal<HTMLElement | undefined>, tooltipAnchor: Signal<HTMLElement | undefined>) => {
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
  }
});

export const Tooltip = component$(
  ({ content, position = 'top', durationMs = 0, ...props }: TooltipProps) => {
    const id = useId();
    const triggerAnchor = useSignal<HTMLElement>();
    const tooltipAnchor = useSignal<HTMLElement>();
    const stateSignal = useSignal<State>('hidden');

    const Wrapper: keyof HTMLElementTagNameMap = props.inline ? 'span' : 'div';

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
        {stateSignal.value !== 'hidden' && 
          <Tip id={id} as={Wrapper} triggerAnchor={triggerAnchor} tooltipAnchor={tooltipAnchor} position={position} stateSignal={stateSignal} content={content} />
        }
        {/* <Wrapper
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
        </Wrapper> */}
      </>
    );
  }
);
