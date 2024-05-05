import {
  component$,
  useContext,
  type PropsOf,
  useComputed$,
  Slot,
} from '@builder.io/qwik';

import SelectContextId from './select-context';
import { useSelect } from './use-select';

type SelectValueProps = PropsOf<'span'> & {
  /**
   * Optional text displayed when no option is selected.
   */
  placeholder?: string;
};

export const SelectDisplayText = component$((props: SelectValueProps) => {
  const { placeholder, ...rest } = props;
  const context = useContext(SelectContextId);
  const valueId = `${context.localId}-value`;

  const { extractedStrOrArrFromMap } = useSelect();

  const displayStrSig = useComputed$(async () => {
    if (context.multiple) {
      // for more customization when multiple is true
      return <Slot />;
    }

    const currDisplayValue = await extractedStrOrArrFromMap('displayValue');
    console.log(currDisplayValue);

    if (currDisplayValue.length > 0) {
      return currDisplayValue;
    } else {
      return placeholder;
    }
  });

  return (
    <span
      id={valueId}
      data-open={context.isListboxOpenSig.value ? '' : undefined}
      data-closed={!context.isListboxOpenSig.value ? '' : undefined}
      data-value
      {...rest}
    >
      {displayStrSig.value}
    </span>
  );
});
