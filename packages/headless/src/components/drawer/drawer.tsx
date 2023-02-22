import {
  component$,
  createContextId,
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

export const drawerContext = createContextId<DrawerContext>('DrawerContext');

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
    <div class={props.class ? props.class : ''}>
      <Slot />
    </div>
  );
});
