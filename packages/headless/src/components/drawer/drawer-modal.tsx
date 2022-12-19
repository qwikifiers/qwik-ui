import { component$, Slot, useContext } from '@builder.io/qwik';
import { drawerContext } from './drawer';

export interface DrawerModalProps {
  class?: string;
}

export const DrawerModal = component$((props: DrawerModalProps) => {
  const { randomId, drawerState } = useContext(drawerContext);

  return (
    <div
      class={'modal ' + props.class ? props.class : ''}
      id={randomId}
      onAnimationEnd$={() => {
        drawerState.value === 'closing'
          ? (drawerState.value = 'closed')
          : drawerState.value;
      }}
    >
      <button onClick$={() => (drawerState.value = 'closing')}>
        <Slot name="closeButtonLabel" />
      </button>
      <Slot />
    </div>
  );
});
