import { $, QRL, Signal, Slot, component$, useSignal, useTask$ } from '@builder.io/qwik';
import { DropdownItemProps, HDropdownItem } from './dropdown-item';

type DropdownCheckboxItemProps = {
  /** A signal that controls the current checked state (controlled). */
  'bind:checked'?: Signal<boolean>;

  /**
   * QRL handler that runs when the user selects an item.
   */
  onChange$?: QRL<(checked: boolean) => void>;
} & DropdownItemProps;

export const HDropdownCheckboxItem = component$((props: DropdownCheckboxItemProps) => {
  const { disabled = false, closeOnSelect = false, onChange$, ...rest } = props;

  const checkedSig = useSignal<boolean>(false);

  useTask$(function reactiveUserOpen({ track }) {
    const bindCheckedSig = props['bind:checked'];
    if (!bindCheckedSig) return;
    track(() => bindCheckedSig.value);

    checkedSig.value = bindCheckedSig.value ?? checkedSig.value;
  });

  useTask$(function onChangeTask({ track }) {
    track(() => checkedSig.value);

    onChange$?.(checkedSig.value);
  });

  const onSelect = $(() => {
    checkedSig.value = !checkedSig.value;
    props.onSelect$?.();
  });

  return (
    <HDropdownItem
      {...rest}
      onSelect$={onSelect}
      role="menuitemcheckbox"
      closeOnSelect={closeOnSelect}
      disabled={disabled}
      aria-checked={checkedSig.value ? 'true' : 'false'}
      aria-disabled={disabled}
      style={{ display: 'flex', alignItems: 'center' }}
      data-disabled={disabled}
      data-checked={checkedSig.value}
    >
      <Slot name="dropdown-item-indicator" />
      <Slot />
    </HDropdownItem>
  );
});
