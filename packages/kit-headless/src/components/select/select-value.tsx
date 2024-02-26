import { component$, useContext, type PropsOf } from '@builder.io/qwik';

import SelectContextId from './select-context';

type SelectValueProps = PropsOf<'span'> & {
  placeholder?: string;
};

export const SelectValue = component$((props: SelectValueProps) => {
  const context = useContext(SelectContextId);
  if (!context.options) return;

  const selectedOptStr =
    context.selectedIndexSig.value !== null
      ? context.options[context.selectedIndexSig.value].value
      : props.placeholder;

  return (
    <span data-value {...props}>
      {selectedOptStr}
    </span>
  );
});
