import { component$, type PropsOf, useContext, sync$, $ } from '@builder.io/qwik';
import SelectContextId from './select-context';
import { getNextEnabledOptionIndex } from './utils';

export type OptionsType = {
  element: HTMLLIElement;
  isDisabled: boolean;
}[];

type SelectTriggerProps = PropsOf<'button'>;
export type DisabledArr = Array<{ disabled: boolean }>;
export const SelectTrigger = component$<SelectTriggerProps>((props) => {
  const context = useContext(SelectContextId);
  const openKeys = ['ArrowUp', 'ArrowDown'];
  const closedKeys = [`Escape`];

  // Both the space and enter keys run with handleClick$
  const handleClick$ = $(() => {
    context.isListboxOpenSig.value = !context.isListboxOpenSig.value;
  });

  const handleKeyDownSync$ = sync$((e: KeyboardEvent) => {
    const keys = ['ArrowUp', 'ArrowDown', 'Home', 'End', 'PageDown', 'PageUp'];
    if (keys.includes(e.key)) {
      e.preventDefault();
    }
  });

  const handleKeyDown$ = $((e: KeyboardEvent) => {
    const shouldOpen = !context.isListboxOpenSig.value && openKeys.includes(e.key);
    const shouldClose = context.isListboxOpenSig.value && closedKeys.includes(e.key);

    const options: OptionsType = context.optionRefsArray.value.map((option) => {
      if (option.value === undefined) {
        throw new Error('Qwik UI: internal select option is undefined');
      }

      const isDisabled = option.value.ariaDisabled === 'true';

      return { element: option.value, isDisabled };
    });

    if (shouldOpen) {
      context.isListboxOpenSig.value = true;
    }

    if (shouldClose) {
      context.isListboxOpenSig.value = false;
    }

    if (e.key === 'Home') {
      context.highlightedIndexSig.value = 0;
    }

    if (e.key === 'End') {
      context.highlightedIndexSig.value = context.optionRefsArray.value.length - 1;
    }

    /** When initially opening the listbox, we want to grab the first enabled option index */
    if (context.highlightedIndexSig.value === null) {
      context.highlightedIndexSig.value = getNextEnabledOptionIndex(-1, options);
      console.log(context.highlightedIndexSig.value);
      return;
    }

    if (context.isListboxOpenSig.value) {
      if (e.key === 'ArrowDown') {
        context.highlightedIndexSig.value = getNextEnabledOptionIndex(
          context.highlightedIndexSig.value,
          options,
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
    >
      {context.selectedOptionRef.value?.textContent ?? 'Select an option'}
    </button>
  );
});
