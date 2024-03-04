import { component$, useContext, type PropsOf, useComputed$ } from '@builder.io/qwik';

import SelectContextId from './select-context';

type SelectValueProps = PropsOf<'span'> & {
  placeholder?: string;
};

export const SelectValue = component$((props: SelectValueProps) => {
  const { placeholder, ...rest } = props;

  const context = useContext(SelectContextId);
  if (!context.optionsSig.value) return;

  const displayStrSig = useComputed$(() => {
    if (context.selectedIndexSig.value !== null) {
      return context.optionsSig.value[context.selectedIndexSig.value].displayValue;
    } else {
      return placeholder;
    }
  });

  return (
    <span data-value {...rest}>
      {displayStrSig.value}
    </span>
  );
});
