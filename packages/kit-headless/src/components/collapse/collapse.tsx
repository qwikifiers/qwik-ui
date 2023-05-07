import { component$, Slot, useSignal } from '@builder.io/qwik';

export interface CollapseProps {
  class?: string;
}

export type CollapseState = 'open' | 'closed' | 'closing';

export const Collapse = component$((props: CollapseProps) => {
  const random = Math.random() * 1000;
  const state = useSignal<CollapseState>('closed');
  return (
    <div data-state={state.value} class={props.class}>
      <style
        dangerouslySetInnerHTML={`
      @keyframes DummyIn {
        to: { opacity(1); }
      }
      @keyframes DummyOut {
        to: { opacity(0); }
      }
      [data-state='closing'] > div {
        animation: DummyOut 1ms linear forwards; 
      }
      [data-state='open'] > div {
        animation: DummyIn 1ms linear forwards; 
      }
      [data-state='closed'] > div {
        display: none;
      }
    `}
      />
      <button
        aria-expanded={state.value === 'open'}
        aria-controls={random.toString()}
        onClick$={() =>
          state.value === 'open'
            ? (state.value = 'closing')
            : (state.value = 'open')
        }
      >
        <Slot name="label" />
      </button>
      <div
        id={random.toString()}
        onAnimationEnd$={() => {
          state.value === 'closing' ? (state.value = 'closed') : state.value;
        }}
      >
        <Slot name="content" />
      </div>
    </div>
  );
});
