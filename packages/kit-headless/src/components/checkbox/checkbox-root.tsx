import {
  PropsOf,
  Slot,
  component$,
  $,
  useContextProvider,
  useId,
  useSignal,
  Signal,
} from '@builder.io/qwik';
import { CheckboxContext, allInputNames, checkboxContextId } from './context';

export type CheckboxProps = {
  defaultChecked?: boolean;
  userIsCheckSig?: Signal<boolean>;
  name?: string;
  value?: string;
  isError?: boolean;
} & PropsOf<'div'>;
export const Checkbox = component$((props: CheckboxProps) => {
  const localId = props.id ?? useId();
  const rootId = `${localId}-root`;
  const isCheckedSig = useSignal<boolean>(props.defaultChecked ?? false);
  const appliedIsCheckdedSig = props.userIsCheckSig ?? isCheckedSig;
  const handlePointerDown$ = $(() => {
    appliedIsCheckdedSig.value = !appliedIsCheckdedSig.value;
  });
  const handlekeyDown$ = $((e: KeyboardEvent) => {
    const spaceBar = ' ';
    if (e.key === spaceBar) {
      appliedIsCheckdedSig.value = !appliedIsCheckdedSig.value;
    }
  });
  const context: CheckboxContext = {
    localId,
    isCheckedSig: appliedIsCheckdedSig,
    name: props.name,
    value: props.value,
    isError: props.isError ?? false,
  };

  useContextProvider(checkboxContextId, context);
  return (
    <div
      data-checked={isCheckedSig}
      onPointerDown$={[handlePointerDown$, props.onPointerDown$]}
      onKeyDown$={handlekeyDown$}
      id={rootId}
      {...props}
    >
      <Slot />
    </div>
  );
});
