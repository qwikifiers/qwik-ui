/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { PropsOf, QRL, Slot, component$, sync$ } from '@qwik.dev/core';

import { useDropdownItem } from './use-dropdown-item';

export type DropdownItemProps = {
  /** Internal index we get from the inline component. Please see dropdown-inline.tsx */
  _index?: number;

  /** If true, item is not selectable or focusable. */
  disabled?: boolean;

  /** If true, dropdown will close after selecting the item. */
  closeOnSelect?: boolean;
  /**
   * QRL handler that runs when the user selects an item.
   */
  onClick$?: QRL<() => void>;
} & Omit<PropsOf<'div'>, 'onCLick$'>;

export const HDropdownItem = component$((props: DropdownItemProps) => {
  /* look at dropdown-inline on how we get the index. */
  const { _index, disabled, closeOnSelect = true, ...rest } = props;

  const {
    handleClick$,
    handleKeyDown$,
    handlePointerOver$,
    itemId,
    itemRef,
    isHighlightedSig,
  } = useDropdownItem({ closeOnSelect, ...props });

  // Prevent default behavior for certain keys. This needs to be sync to prevent default behavior and can't be implemented in useDropdownItem.
  const handleKeyDownSync$ = sync$((e: KeyboardEvent) => {
    const keys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'Home', 'End', 'Enter', ' '];
    if (keys.includes(e.key)) {
      e.preventDefault();
    }
  });

  return (
    <div
      {...rest}
      role="menuitem"
      onClick$={[handleClick$, props.onClick$]}
      onKeyDown$={[handleKeyDownSync$, handleKeyDown$, props.onKeyDown$]}
      onPointerOver$={[handlePointerOver$, props.onPointerOver$]}
      tabIndex={-1}
      id={itemId}
      ref={itemRef}
      aria-disabled={disabled === true ? 'true' : 'false'}
      data-disabled={disabled}
      data-highlighted={isHighlightedSig.value}
      data-menu-item
      data-close-on-select={closeOnSelect}
    >
      <Slot />
    </div>
  );
});
