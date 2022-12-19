import {
  component$,
  createContext,
  Signal,
  Slot,
  useContextProvider,
  useSignal,
} from '@builder.io/qwik';

export type DrawerState = 'open' | 'closed' | 'closing';
export interface DrawerContext {
  drawerState: Signal<DrawerState>;
  randomId: string;
}

export const drawerContext = createContext<DrawerContext>('DrawerContext');

export interface DrawerProps {
  class?: string;
}

export const Drawer = component$((props: DrawerProps) => {
  const randomId = (Math.random() * 1000).toString();
  const drawerState = useSignal<DrawerState>('closed');

  useContextProvider(drawerContext, {
    randomId,
    drawerState,
  });

  return (
    <div class={props.class ? props.class : ''} data-state={drawerState.value}>
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
      <Slot />
    </div>
  );
});
