import { PropsOf, Slot, component$, useContext } from '@builder.io/qwik';
import SelectContextId from './select-context';

type SelectDescriptionProps = PropsOf<'div'>;

export const HSelectDescription = component$((props: SelectDescriptionProps) => {
  const context = useContext(SelectContextId);
  const descriptionId = `${context.localId}-description`;

  return (
    <div id={descriptionId} data-disabled={context.disabled ? '' : undefined} {...props}>
      <Slot />
    </div>
  );
});
