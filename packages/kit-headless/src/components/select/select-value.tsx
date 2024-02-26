import { component$, useContext, type PropsOf } from '@builder.io/qwik';

import SelectContextId from './select-context';

type SelectValueProps = PropsOf<'span'>;

export const SelectValue = component$((props: SelectValueProps) => {
  const context = useContext(SelectContextId);
  context;

  return (
    <span data-value {...props}>
      {context.selectedOptionRef.value?.textContent ?? 'Select an option'}
    </span>
  );
});
