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
import { useCombinedRef } from '../../hooks/combined-refs';

type SelectTriggerProps = PropsOf<'button'>;
export const HSelectTrigger = component$<SelectTriggerProps>((props) => {
  const context = useContext(SelectContextId);
  const { selectionManager$, getNextEnabledItemIndex$, getPrevEnabledItemIndex$ } =
    useSelect();
  const labelId = `${context.localId}-label`;
  const descriptionId = `${context.localId}-description`;
  const errorMessageId = `${context.localId}-error-message`;
  const triggerId = `${context.localId}-trigger`;
  const panelId = `${context.localId}-panel`;
  const valueId = `${context.localId}-value`;
  const initialKeyDownSig = useSignal(true);
  const { typeahead$ } = useTypeahead();
  const contextRefOpts = { context, givenContextRef: context.triggerRef };
  const triggerRef = useCombinedRef(props.ref, contextRefOpts);

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
      if (e.key === 'ArrowUp') {
        context.highlightedIndexSig.value = await getPrevEnabledItemIndex$(
          context.itemsMapSig.value.size,
        );
      } else {
        context.highlightedIndexSig.value = await getNextEnabledItemIndex$(-1);
      }
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
      id={triggerId}
      ref={triggerRef}
      onClick$={[handleClickSync$, handleClick$, props.onClick$]}
      onKeyDown$={[handleKeyDownSync$, handleKeyDown$, props.onKeyDown$]}
      data-open={context.isListboxOpenSig.value ? '' : undefined}
      data-closed={!context.isListboxOpenSig.value ? '' : undefined}
      data-disabled={context.isDisabledSig.value ? '' : undefined}
      data-invalid={context.isInvalidSig?.value ? '' : undefined}
      aria-labelledby={`${valueId} ${labelId} `}
      aria-describedby={`${descriptionId} 
      ${errorMessageId}`}
      aria-expanded={context.isListboxOpenSig.value ? true : false}
      aria-haspopup="listbox"
      aria-controls={panelId}
      disabled={context.isDisabledSig.value ? true : undefined}
      preventdefault:blur
    >
      <Slot />
    </button>
  );
});
