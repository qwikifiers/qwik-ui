import { component$, useContext } from '@builder.io/qwik';
import { drawerContext } from './drawer';

export interface DrawerTriggerProps {
  class?: string;
  label: string;
}

export const DrawerTrigger = component$((props: DrawerTriggerProps) => {
  const { randomId, drawerState } = useContext(drawerContext);

  return (
    <button
      class={props.class ? props.class : ''}
      aria-expanded={drawerState.value === 'open'}
      aria-controls={randomId}
      onClick$={() =>
        drawerState.value === 'open'
          ? (drawerState.value = 'closing')
          : (drawerState.value = 'open')
      }
    >
      {props.label}
    </button>
  );
});
