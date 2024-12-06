import { PropsOf, Slot, component$, useContext, useStyles$ } from '@builder.io/qwik';
import { comboboxItemContextId } from './combobox-context';
import styles from './combobox.css?inline';

type HComboboxItemIndicatorProps = PropsOf<'span'>;

export const HComboboxItemIndicator = component$((props: HComboboxItemIndicatorProps) => {
  const itemContext = useContext(comboboxItemContextId);
  useStyles$(styles);

  return (
    <span
      data-selected={itemContext.isSelectedSig.value ? '' : undefined}
      data-item-indicator
      aria-hidden="true"
      {...props}
    >
      <Slot />
    </span>
  );
});
