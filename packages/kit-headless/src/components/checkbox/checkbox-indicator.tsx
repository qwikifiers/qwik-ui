import {
  Signal,
  component$,
  useContext,
  useContextProvider,
  $,
  useSignal,
  PropsOf,
  Slot,
  sync$,
} from '@builder.io/qwik';
import { CheckboxContext } from './context-id';

export type CheckboxIndicatorProps = {} & PropsOf<'div'>;

export const CheckboxIndicator = component$<CheckboxIndicatorProps>((props) => {
  function getClass(boolSig: Signal<boolean>) {
    console.log('chanign lol');

    if (boolSig.value) {
      const className = 'block';
      return className;
    }
    const className = 'invisible';
    return className;
  }
  const checkSig = useContext(CheckboxContext);
  const handleKeyDownSync$ = sync$((e: KeyboardEvent) => {
    if (e.key === ' ') {
      e.preventDefault();
    }
  });
  const handleKeyDown$ = $((e: KeyboardEvent) => {
    if (e.key === ' ') {
      checkSig.value = !checkSig.value;
    }
  });
  const appliedClass = getClass(checkSig);
  return (
    <div {...props} tabIndex={0} onKeyDown$={[handleKeyDownSync$, handleKeyDown$]}>
      <div class={appliedClass}>
        <Slot />
      </div>
    </div>
  );
});
