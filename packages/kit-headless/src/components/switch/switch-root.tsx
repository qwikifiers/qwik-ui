import {
  component$,
  Slot,
  useContextProvider,
  useSignal,
  type PropsOf
} from '@builder.io/qwik';
import { type SwitchContextState, type SwitchState, SwitchContext } from './switch-context';
export type SwitchProps = PropsOf<'div'> & SwitchState;



export const SwitchRoot = component$(({defaultChecked, disabled, onChange$, ...rest}: SwitchProps) => {
  const switchRef = useSignal<HTMLInputElement| undefined>()
  const context: SwitchContextState = {
    defaultChecked,
    disabled,
    bindChecked: rest['bind:checked'],
    onChange$: onChange$,
    switchRef: switchRef
  }

  useContextProvider(SwitchContext, context)

  return (
    <div
      {...rest}
      data-checked={context.bindChecked?.value ? '' : undefined}
      data-disabled={context.disabled ? '' : undefined}
      data-qui-switch
    >
      <Slot></Slot>
    </div>
  );
})
