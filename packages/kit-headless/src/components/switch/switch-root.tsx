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
export type SwitchProps = PropsOf<'div'> & SwitchState;

export const SwitchRoot = component$(
  ({ checked, disabled, onChange$, ...rest }: SwitchProps) => {
    useStyles$(styles);
    const defaultChecked = checked || rest['bind:checked']?.value;
    const checkedState = useSignal(defaultChecked || false);
    const switchRef = useSignal<HTMLInputElement | undefined>();
    const context: SwitchContextState = {
      checked,
      disabled,
      bindChecked: checkedState,
      onChange$: onChange$,
      switchRef: switchRef,
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
