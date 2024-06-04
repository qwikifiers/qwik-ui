import {
  $,
  Slot,
  component$,
  sync$,
  useContext,
  useSignal,
  type PropsOf,
} from '@builder.io/qwik';
import SelectContextId from './select-context';
import { useSelect, useTypeahead } from './use-select';

type SelectTriggerProps = PropsOf<'button'>;
export const HSelectTrigger = component$<SelectTriggerProps>((props) => {
  const context = useContext(SelectContextId);
  const { selectionManager$, getNextEnabledItemIndex$, getPrevEnabledItemIndex$ } =
    useSelect();
  const labelId = `${context.localId}-label`;
  const descriptionId = `${context.localId}-description`;
  const initialKeyDownSig = useSignal(true);
  const { typeahead$ } = useTypeahead();

  const handleClickSync$ = sync$((e: MouseEvent) => {
    e.preventDefault();
  });

  // Both the space and enter keys run with handleClick$
  const handleClick$ = $(() => {
    context.isListboxOpenSig.value = !context.isListboxOpenSig.value;
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

    if (!context.isListboxOpenSig.value) {
      typeahead$(e.key);
    }

    switch (e.key) {
      case 'Tab':
      case 'Escape':
        context.isListboxOpenSig.value = false;
        break;

      case 'ArrowDown':
      case 'ArrowUp':
        if (!context.isListboxOpenSig.value) {
          context.isListboxOpenSig.value = true;
        }
        break;

      case 'ArrowRight':
        if (!context.multiple) {
          const currentIndex = context.highlightedIndexSig.value ?? -1;
          const nextIndex = await getNextEnabledItemIndex$(currentIndex);
          await selectionManager$(nextIndex, 'add');
          context.highlightedIndexSig.value = nextIndex;
        }
        break;

      case 'ArrowLeft':
        if (!context.multiple) {
          const currentIndex =
            context.highlightedIndexSig.value ?? context.itemsMapSig.value.size;
          const prevIndex = await getPrevEnabledItemIndex$(currentIndex);
          await selectionManager$(prevIndex, 'add');
          context.highlightedIndexSig.value = prevIndex;
        }
        break;

      case 'Enter':
      case ' ':
        context.isListboxOpenSig.value = context.multiple
          ? true
          : !context.isListboxOpenSig.value;
        break;
    }

    /** When initially opening the listbox, we want to grab the first enabled option index */
    if (context.highlightedIndexSig.value === null) {
      context.highlightedIndexSig.value = await getNextEnabledItemIndex$(-1);
    }

    // Wait for the popover code to be executed
    while (context.highlightedItemRef.value !== document.activeElement) {
      await new Promise((resolve) => setTimeout(resolve, 5));
      context.highlightedItemRef.value?.focus();
    }

    if (!initialKeyDownSig.value) return;
    document.dispatchEvent(new CustomEvent('typeaheadFn', { detail: typeahead$ }));
  });

  return (
    <button
      {...props}
      id={`${context.localId}-trigger`}
      ref={context.triggerRef}
      onClick$={[handleClickSync$, handleClick$, props.onClick$]}
      onKeyDown$={[handleKeyDownSync$, handleKeyDown$, props.onKeyDown$]}
      data-open={context.isListboxOpenSig.value ? '' : undefined}
      data-closed={!context.isListboxOpenSig.value ? '' : undefined}
      data-disabled={context.disabled ? '' : undefined}
      aria-expanded={context.isListboxOpenSig.value}
      aria-labelledby={labelId}
      aria-describedby={descriptionId}
      disabled={context.disabled}
      preventdefault:blur
    >
      <Slot />
    </button>
  );
});
