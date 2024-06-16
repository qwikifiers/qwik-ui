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

export const HSelectDisplayValue = component$((props: SelectValueProps) => {
  const { placeholder, ...rest } = props;
  const context = useContext(SelectContextId);
  const valueId = `${context.localId}-value`;

  const displayStrSig = useComputed$(async () => {
    if (context.multiple) {
      // for more customization when multiple is true
      return <Slot />;
    }

    if (context.selectedIndexSetSig.value.size === 0) {
      return placeholder;
    } else {
      return context.multiple
        ? context.currDisplayValueSig.value
        : context.currDisplayValueSig.value?.[0] ?? placeholder;
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
