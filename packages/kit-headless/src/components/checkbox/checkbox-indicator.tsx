import { Signal, component$, useContext, PropsOf, Slot } from '@builder.io/qwik';
import { CheckboxContext } from './context-id';

export type CheckboxIndicatorProps = {} & PropsOf<'div'>;

export const CheckboxIndicator = component$<CheckboxIndicatorProps>((props) => {
  const checkSig = useContext(CheckboxContext);
  return (
    // flaky test bc class is not always applied
    <div {...props}>
      <div class={checkSig.value === true ? 'visible' : 'invisible'}>
        <Slot />
      </div>
    </div>
  );
});
