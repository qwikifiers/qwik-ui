import {
  $,
  Slot,
  component$,
  sync$,
  useContext,
  useSignal,
  useTask$,
} from '@builder.io/qwik';

import { CheckboxRoot } from '../checkbox/checkbox';
import { DropdownCheckboxItemProps } from './dropdown-checkbox-item';
import { dropdownRadioGroupContextId } from './dropdown-context';
import { useDropdownItem } from './use-dropdown-item';

type DropdownRadioItemProps = {
  /** Value of the item. */
  value: string;
} & DropdownCheckboxItemProps;

export const HDropdownRadioItem = component$((props: DropdownRadioItemProps) => {
  const { disabled = false, value, closeOnSelect = false, onChange$, ...rest } = props;

  const groupContext = useContext(dropdownRadioGroupContextId);

  const checkedSig = useSignal<boolean>(value === groupContext.valueSig.value);
  const checkboxRef = useSignal<HTMLDivElement>();

  useTask$(function trackGroupValue({ track }) {
    track(() => groupContext.valueSig.value);

    checkedSig.value = value === groupContext.valueSig.value;

    onChange$?.(checkedSig.value);
  });

  //Prevent default behavior for certain keys. This needs to be sync to prevent default behavior and can't be implemented in useDropdownItem.
  const handleKeyDownSync$ = sync$((e: KeyboardEvent) => {
    const keys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'Home', 'End', 'Enter', ' '];
    if (keys.includes(e.key)) {
      e.preventDefault();
    }
  });

  const onItemSelect$ = $(() => {
    groupContext.valueSig.value = value;
  });

  const {
    handleClick$,
    handleKeyDown$,
    handlePointerOver$,
    itemId,
    itemRef,
    isHighlightedSig,
  } = useDropdownItem({ ...props, onItemSelect: onItemSelect$, closeOnSelect });

  return (
    <div
      onClick$={[handleClick$, props.onClick$]}
      tabIndex={-1}
      id={itemId}
      onKeyDown$={[handleKeyDownSync$, handleKeyDown$, props.onKeyDown$]}
      onPointerOver$={[handlePointerOver$, props.onPointerOver$]}
      ref={itemRef}
      role="menuitemradio"
      aria-checked={checkedSig.value ? 'true' : 'false'}
      aria-disabled={disabled || groupContext.disabled}
      data-disabled={disabled || groupContext.disabled}
      data-highlighted={isHighlightedSig.value}
      data-checked={checkedSig.value}
      data-close-on-select={props.closeOnSelect}
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
