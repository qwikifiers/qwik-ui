import { $, Slot, component$, sync$, useContext, type PropsOf } from '@builder.io/qwik';
import SelectContextId from './select-context';
import { useSelect, useTypeahead } from './use-select';

type SelectTriggerProps = PropsOf<'button'>;
export const SelectTrigger = component$<SelectTriggerProps>((props) => {
  const context = useContext(SelectContextId);
  const { getNextEnabledOptionIndex, getPrevEnabledOptionIndex } = useSelect();
  const openKeys = ['ArrowUp', 'ArrowDown'];
  const closedKeys = [`Escape`];

  const { typeahead$ } = useTypeahead();

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
    ];
    if (keys.includes(e.key)) {
      e.preventDefault();
    }
  });

  const handleKeyDown$ = $(async (e: KeyboardEvent) => {
    typeahead$(e.key);
    const shouldOpen = !context.isListboxOpenSig.value && openKeys.includes(e.key);
    const shouldClose = context.isListboxOpenSig.value && closedKeys.includes(e.key);
    if (!context.optionsSig.value) return;

    if (shouldOpen) {
      context.isListboxOpenSig.value = true;
    }

    if (shouldClose) {
      context.isListboxOpenSig.value = false;
    }

    if (e.key === 'Home') {
      context.highlightedIndexSig.value = await getNextEnabledOptionIndex(
        -1,
        context.optionsSig.value,
        context.loop,
      );
    }

    if (e.key === 'End') {
      const lastEnabledOptionIndex = await getPrevEnabledOptionIndex(
        context.optionsSig.value.length,
        context.optionsSig.value,
        context.loop,
      );
      context.highlightedIndexSig.value = lastEnabledOptionIndex;
    }

    if (!context.isListboxOpenSig.value) {
      if (e.key === 'ArrowRight' && context.highlightedIndexSig.value === null) {
        context.selectedIndexSig.value = await getNextEnabledOptionIndex(
          -1,
          context.optionsSig.value,
          context.loop,
        );

        context.highlightedIndexSig.value = context.selectedIndexSig.value;
        return;
      }

      if (e.key === 'ArrowRight' && context.highlightedIndexSig.value !== null) {
        context.selectedIndexSig.value = await getNextEnabledOptionIndex(
          context.selectedIndexSig.value!,
          context.optionsSig.value,
          context.loop,
        );

        console.log('selectedIndex', context.selectedIndexSig.value);

        context.highlightedIndexSig.value = context.selectedIndexSig.value;
      }

      if (e.key === 'ArrowLeft' && context.highlightedIndexSig.value === null) {
        context.selectedIndexSig.value = await getPrevEnabledOptionIndex(
          context.optionsSig.value.length,
          context.optionsSig.value,
          context.loop,
        );

        context.highlightedIndexSig.value = context.selectedIndexSig.value;
        return;
      }

      if (e.key === 'ArrowLeft' && context.highlightedIndexSig.value !== null) {
        context.selectedIndexSig.value = await getPrevEnabledOptionIndex(
          context.highlightedIndexSig.value,
          context.optionsSig.value,
          context.loop,
        );

        context.highlightedIndexSig.value = context.selectedIndexSig.value;
      }
    }

    /** When initially opening the listbox, we want to grab the first enabled option index */
    if (context.highlightedIndexSig.value === null) {
      context.highlightedIndexSig.value = await getNextEnabledOptionIndex(
        -1,
        context.optionsSig.value,
        context.loop,
      );
      return;
    }

    if (context.isListboxOpenSig.value && !shouldOpen) {
      if (e.key === 'Tab') {
        context.isListboxOpenSig.value = false;
      }

      // select options
      if (e.key === 'Enter' || e.key === ' ') {
        context.selectedIndexSig.value = context.highlightedIndexSig.value;
      }

      if (e.key === 'ArrowDown') {
        context.highlightedIndexSig.value = await getNextEnabledOptionIndex(
          context.highlightedIndexSig.value,
          context.optionsSig.value,
          context.loop,
        );
      }

      if (e.key === 'ArrowUp') {
        context.highlightedIndexSig.value = await getPrevEnabledOptionIndex(
          context.highlightedIndexSig.value,
          context.optionsSig.value,
          context.loop,
        );
      }
    }
  });

  return (
    <button
      {...props}
      ref={context.triggerRef}
      onClick$={[handleClick$, props.onClick$]}
      onKeyDown$={[handleKeyDownSync$, handleKeyDown$, props.onKeyDown$]}
      data-open={context.isListboxOpenSig.value ? '' : undefined}
      data-closed={!context.isListboxOpenSig.value ? '' : undefined}
      aria-expanded={context.isListboxOpenSig.value}
      preventdefault:blur
    >
      <Slot />
    </button>
  );
});
