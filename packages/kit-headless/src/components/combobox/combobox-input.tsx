import { PropsOf, component$, useContext } from '@builder.io/qwik';
import { comboboxContextId } from './combobox-context';

type HComboboxInputProps = PropsOf<'input'>;

export const HComboboxInput = component$((props: HComboboxInputProps) => {
  const context = useContext(comboboxContextId);

  return <input ref={context.inputRef} {...props} />;
});
