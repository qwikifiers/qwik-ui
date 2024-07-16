import {
  $,
  Slot,
  component$,
  sync$,
  useContext,
  useSignal,
  type PropsOf,
} from '@builder.io/qwik';
import { dropdownContextId } from './dropdown-context';
import { useDropdown } from './use-dropdown';

type DropdownTriggerProps = PropsOf<'button'>;
export const HDropdownTrigger = component$<DropdownTriggerProps>((props) => {
  const context = useContext(dropdownContextId);
  const { getNextEnabledItemIndex$ } = useDropdown();
  const triggerId = `${context.localId}-trigger`;
  const isInitialKeyDownSig = useSignal(true);

  const handleClickSync$ = sync$((e: MouseEvent) => {
    e.preventDefault();
  });

  // Both the space and enter keys run with handleClick$
  const handleClick$ = $(() => {
    context.isOpenSig.value = !context.isOpenSig.value;
  });

  const handleKeyDownSync$ = sync$((e: KeyboardEvent) => {
    const keys = [
      'ArrowUp',
      'ArrowDown',
      'ArrowRight',
      'ArrowLeft',
      'Home',
      'End',
      'PageDown',
      'PageUp',
      'Enter',
      ' ',
    ];
    if (keys.includes(e.key)) {
      e.preventDefault();
    }
  });

  const handleKeyDown$ = $(async (e: KeyboardEvent) => {
    if (!context.itemsMapSig.value) return;

    switch (e.key) {
      case 'Tab':
      case 'Escape':
        context.isOpenSig.value = false;
        break;

      case 'ArrowDown':
      case 'ArrowUp':
      case 'Enter':
      case ' ':
        if (!context.isOpenSig.value) {
          context.isOpenSig.value = true;
        }
        break;
    }

    /** When initially opening the menu, we want to grab the first enabled option index */
    if (context.highlightedIndexSig.value === null) {
      context.highlightedIndexSig.value = await getNextEnabledItemIndex$(-1);
    }

    // Wait for the popover code to be executed
    while (context.highlightedItemRef.value !== document.activeElement) {
      await new Promise((resolve) => setTimeout(resolve, 5));
      context.highlightedItemRef.value?.focus();
    }

    if (!isInitialKeyDownSig.value) return;
  });

  return (
    <button
      data-trigger
      {...props}
      id={triggerId}
      ref={context.triggerRef}
      onClick$={[handleClickSync$, handleClick$, props.onClick$]}
      onKeyDown$={[handleKeyDownSync$, handleKeyDown$, props.onKeyDown$]}
      data-open={context.isOpenSig.value ? true : undefined}
      data-closed={!context.isOpenSig.value ? true : undefined}
      aria-expanded={context.isOpenSig.value}
      aria-haspopup="true"
      preventdefault:blur
    >
      <Slot />
    </button>
  );
});
