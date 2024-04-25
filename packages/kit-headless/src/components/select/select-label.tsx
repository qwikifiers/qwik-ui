import { PropsOf, Slot, component$, useContext } from '@builder.io/qwik';
import SelectContextId from './select-context';

export const SelectLabel = component$((props: PropsOf<'div'>) => {
  const context = useContext(SelectContextId);
  const labelId = `${context.localId}-label`;

  return (
    <div id={labelId} {...props}>
      <Slot />
    </div>
  );
});
