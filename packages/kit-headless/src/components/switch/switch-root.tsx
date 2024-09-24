import {
  component$,
  Slot,
  useContextProvider,
  type PropsOf
} from '@builder.io/qwik';
import { type SwitchContextState, type SwitchState, SwitchContext } from './switch-context';
export type SwitchProps = PropsOf<'div'> & SwitchState;



export const SwitchRoot = component$(({defaultChecked, disabled, label, ...rest}: SwitchProps) => {
  const context: SwitchContextState = {
    defaultChecked,
    disabled,
    label,
    bindChecked: rest['bind:checked']
  }

  useContextProvider(SwitchContext, context)

  return (
    <div {...rest}>
      <Slot></Slot>
    </div>
  );
})
