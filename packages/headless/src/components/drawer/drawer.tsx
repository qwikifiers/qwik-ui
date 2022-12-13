import { component$, Slot, useSignal } from '@builder.io/qwik';

export interface DrawerProps {
  class?: string;
  label: string;
}

export type DrawerState = 'open' | 'closed' | 'closing';

export const Drawer = component$((props: DrawerProps) => {
  const random = Math.random() * 1000;
  const state = useSignal<DrawerState>('closed');
  return (
    <div data-state={state.value}>
      <style
        dangerouslySetInnerHTML={`
      @keyframes DummyIn {
        to: { opacity(1); }
      }
      @keyframes DummyOut {
        to: { opacity(0); }
      }
      [data-state='closing'] > modal {
        animation: DummyOut 1ms linear forwards; 
      }
      [data-state='open'] > modal {
        animation: DummyIn 1ms linear forwards; 
      }
      [data-state='closed'] > modal {
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
        {props.label} {state.value}
      </button>
      <div
        class="modal"
        id={random.toString()}
        onAnimationEnd$={() => {
          state.value === 'closing' ? (state.value = 'closed') : state.value;
        }}
      >
        <button onClick$={() => (state.value = 'closing')}>
          <Slot name="closeButtonLabel" />
        </button>
        <Slot />
      </div>
    </div>
  );
});
