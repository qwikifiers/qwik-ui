import {
  component$,
  Slot,
  useContextProvider,
  type PropsOf
} from '@builder.io/qwik';
import { type SwitchContextState, type SwitchState, SwitchContext } from './switch-context';
export type SwitchProps = PropsOf<'div'> & SwitchState;



export const SwitchRoot = component$(({defaultChecked, disabled, onChange$, ...rest}: SwitchProps) => {
  const context: SwitchContextState = {
    defaultChecked,
    disabled,
    bindChecked: rest['bind:checked'],
    onChange$: onChange$
  }

  useContextProvider(SwitchContext, context)

  return (
    <div {...rest}>
      <Slot></Slot>
    </div>
  );
})
