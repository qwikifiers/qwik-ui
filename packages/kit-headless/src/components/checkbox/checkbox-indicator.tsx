import {
  Signal,
  component$,
  useContext,
  PropsOf,
  Slot,
  useComputed$,
  useSignal,
  useTask$,
} from '@builder.io/qwik';
import { CheckboxContext } from './context-id';
import { get } from 'cypress/types/lodash';

export type CheckboxIndicatorProps = {} & PropsOf<'div'>;

export const CheckboxIndicator = component$<CheckboxIndicatorProps>((props) => {
  function getClass(bool: boolean) {
    console.log('chanign lol');

    if (bool) {
      const className = 'block';
      return className;
    }
    const className = 'invisible';
    return className;
  }
  const checkSig = useContext(CheckboxContext);
  getClass(checkSig.value);
  // const classSig = useComputed$(() => {
  //   return getClass(checkSig.value);
  // });
  return (
    <div {...props}>
      <div class={checkSig.value ? 'visible' : 'invisible'}>
        <Slot />
      </div>
    </div>
  );
});
