import {
  $,
  QRL,
  Signal,
  Slot,
  component$,
  sync$,
  useSignal,
  useTask$,
} from '@builder.io/qwik';

import { CheckboxRoot } from '../checkbox/checkbox';
import { DropdownItemProps } from './dropdown-item';
import { useDropdownItem } from './use-dropdown-item';

export type DropdownCheckboxItemProps = {
  /**
   * A signal that controls the current checked value (controlled).
   */
  'bind:checked'?: Signal<boolean>;

  /**
   * QRL handler that runs when the checked value changes.
   */
  onChange$?: QRL<(checked: boolean) => void>;
} & Omit<DropdownItemProps, 'onChange$'>;

export const HDropdownCheckboxItem = component$((props: DropdownCheckboxItemProps) => {
  const { disabled, onChange$, closeOnSelect = false, ...rest } = props;

  const checkedSig = useSignal<boolean>(false);
  const checkboxRef = useSignal<HTMLDivElement>();

  useTask$(function reactiveUserChecked({ track }) {
    const bindCheckedSig = props['bind:checked'];
    if (!bindCheckedSig) return;
    track(() => bindCheckedSig.value);

    checkedSig.value = bindCheckedSig.value ?? checkedSig.value;
  });

  useTask$(function onChangeTask({ track }) {
    track(() => checkedSig.value);

    onChange$?.(checkedSig.value);
  });

  // Handle the toggle of the checked state when the item is selected trough the keyboard or click.
  const toggleChecked$ = $(() => {
    checkedSig.value = !checkedSig.value;
  });

  const {
    handleClick$,
    handleKeyDown$,
    handlePointerOver$,
    itemId,
    itemRef,
    isHighlightedSig,
  } = useDropdownItem({ ...props, onItemSelect: toggleChecked$, closeOnSelect });

  //Prevent default behavior for certain keys. This needs to be sync to prevent default behavior and can't be implemented in useDropdownItem.
  const handleKeyDownSync$ = sync$((e: KeyboardEvent) => {
    const keys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'Home', 'End', 'Enter', ' '];
    if (keys.includes(e.key)) {
      e.preventDefault();
    }
  });

  return (
    <div
      onClick$={[handleClick$, props.onClick$]}
      tabIndex={-1}
      id={itemId}
      onKeyDown$={[handleKeyDownSync$, handleKeyDown$, props.onKeyDown$]}
      onPointerOver$={[handlePointerOver$, props.onPointerOver$]}
      ref={itemRef}
      aria-disabled={disabled === true ? 'true' : 'false'}
      data-disabled={disabled}
      data-highlighted={isHighlightedSig.value}
      data-checked={checkedSig.value}
      data-menu-item
    >
      <CheckboxRoot
        bind:checked={checkedSig}
        preventdefault:click
        ref={checkboxRef}
        style={{ pointerEvents: 'none' }}
        {...rest}
      >
        <Slot />
      </CheckboxRoot>
    </div>
  );
});
