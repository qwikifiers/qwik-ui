import {
  component$,
  useContext,
  type PropsOf,
  useComputed$,
  Slot,
} from '@builder.io/qwik';

import SelectContextId from './select-context';

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

  const displayStrSig = useComputed$(() => {
    if (context.multiple) {
      // for more customization when multiple is true
      return <Slot />;
    }

    if (context.selectedDisplayValuesSig.value.length > 0) {
      return context.selectedDisplayValuesSig.value;
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
