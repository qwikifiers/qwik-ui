import { component$, useContext, type PropsOf } from '@builder.io/qwik';

import SelectContextId from './select-context';

type SelectValueProps = PropsOf<'span'> & {
  placeholder?: string;
};

export const SelectValue = component$((props: SelectValueProps) => {
  const context = useContext(SelectContextId);
  if (!context.options) return;

  const selectedOptStr = context.options[context.selectedIndexSig.value!].value;
  return (
    <span data-value {...props}>
      {selectedOptStr ?? context.value ?? props.placeholder}
    </span>
  );
});
