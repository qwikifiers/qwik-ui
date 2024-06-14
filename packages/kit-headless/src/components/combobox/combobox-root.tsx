import {
  PropsOf,
  Slot,
  component$,
  useContextProvider,
  useSignal,
} from '@builder.io/qwik';
import { ComboboxContext, comboboxContextId } from './combobox-context';

type HComboboxRootImplProps = PropsOf<'div'>;

export const HComboboxRootImpl = component$((props: HComboboxRootImplProps) => {
  const isListboxOpenSig = useSignal(false);

  const context: ComboboxContext = {
    isListboxOpenSig,
  };

  useContextProvider(comboboxContextId, context);

  return (
    <div role="combobox" {...props}>
      <Slot />
    </div>
  );
});
