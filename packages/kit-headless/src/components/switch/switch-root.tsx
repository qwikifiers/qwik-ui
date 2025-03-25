import {
  component$,
  Slot,
  useContextProvider,
  useSignal,
  type PropsOf,
  useStyles$,
} from '@builder.io/qwik';
import {
  type SwitchContextState,
  type SwitchState,
  SwitchContext,
} from './switch-context';
import styles from './switch.css?inline';
import { useBoundSignal } from '../../utils/bound-signal';
useBoundSignal;
export type SwitchProps = PropsOf<'div'> & SwitchState;

export const SwitchRoot = component$(
  ({ checked, disabled, onChange$, ...rest }: SwitchProps) => {
    useStyles$(styles);
    const defaultChecked = useBoundSignal(rest['bind:checked'], checked);
    const bindChecked = useSignal(defaultChecked.value || false);
    const switchRef = useSignal<HTMLInputElement | undefined>();
    const context: SwitchContextState = {
      checked,
      disabled,
      bindChecked,
      onChange$,
      switchRef,
    };

    useContextProvider(SwitchContext, context);

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
  },
);
