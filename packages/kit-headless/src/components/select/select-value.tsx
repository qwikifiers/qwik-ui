import { component$, useContext, type PropsOf, useComputed$ } from '@builder.io/qwik';

import SelectContextId from './select-context';

type SelectValueProps = PropsOf<'span'> & {
  placeholder?: string;
};

export const SelectValue = component$((props: SelectValueProps) => {
  const context = useContext(SelectContextId);
  if (!context.optionsSig.value) return;

  const displayStrSig = useComputed$(() => {
    if (context.selectedIndexSig.value !== null) {
      return context.optionsSig.value[context.selectedIndexSig.value].value;
    } else {
      return props.placeholder;
    }
  });

  return (
    <span data-value {...props}>
      {displayStrSig.value}
    </span>
  );
});
