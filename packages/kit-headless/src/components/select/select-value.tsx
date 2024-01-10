import { PropsOf, component$, useContext } from '@builder.io/qwik';
import SelectContextId from './select-context-id';

export type SelectValueProps = {
  placeholder?: string;
} & PropsOf<'span'>;

export const SelectValue = component$(({ placeholder, ...props }: SelectValueProps) => {
  const selectContext = useContext(SelectContextId);
  const value = selectContext.selectedOptionSig.value;
  return <span {...props}>{value ? value : placeholder}</span>;
});
