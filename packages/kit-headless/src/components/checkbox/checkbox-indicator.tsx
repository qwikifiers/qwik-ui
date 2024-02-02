import { PropsOf, Slot, component$, useContext } from '@builder.io/qwik';
import { checkboxContextId } from './context';

export type CheckboxIndicatorProps = PropsOf<'div'>;

export const CheckboxIndicator = component$((props: CheckboxIndicatorProps) => {
  const context = useContext(checkboxContextId);
  console.log('current sig ', context.isCheckedSig.value);

  return (
    <>
      <div
        {...props}
        role="checkbox"
        aria-checked={`${context.isCheckedSig.value}`}
        tabIndex={0}
      >
        {context.isCheckedSig.value && <Slot />}
      </div>
    </>
  );
});
