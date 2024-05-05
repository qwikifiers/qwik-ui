import { $, Slot, component$, sync$, useContext, type PropsOf } from '@builder.io/qwik';
import SelectContextId from './select-context';
import { useSelect, useTypeahead } from './use-select';

type SelectTriggerProps = PropsOf<'button'>;
export const SelectTrigger = component$<SelectTriggerProps>((props) => {
  const context = useContext(SelectContextId);
  const { selectionManager$, getNextEnabledItemIndex$, getPrevEnabledItemIndex$ } =
    useSelect();
  const labelId = `${context.localId}-label`;
  const descriptionId = `${context.localId}-description`;

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

    typeahead$(e.key);

    if (context.isListboxOpenSig.value) {
      // select options
      if (e.key === 'Enter' || e.key === ' ') {
        if (context.multiple) {
          await selectionManager$(context.highlightedIndexSig.value, 'toggle');
        } else {
          await selectionManager$(context.highlightedIndexSig.value, 'add');
        }
      }

      if (e.key === 'ArrowDown') {
        context.highlightedIndexSig.value = await getNextEnabledItemIndex$(
          context.highlightedIndexSig.value!,
        );
      }

      if (e.key === 'ArrowUp') {
        context.highlightedIndexSig.value = await getPrevEnabledItemIndex$(
          context.highlightedIndexSig.value!,
        );
      }

      if (e.key === 'Home') {
        context.highlightedIndexSig.value = await getNextEnabledItemIndex$(-1);
      }

      if (e.key === 'End') {
        const lastEnabledOptionIndex = await getPrevEnabledItemIndex$(
          context.itemsMapSig.value.size,
        );
        context.highlightedIndexSig.value = lastEnabledOptionIndex;
      }

      if (e.key === 'Tab' || e.key === 'Escape') {
        context.isListboxOpenSig.value = false;
      }

      if (context.multiple) {
        if ((e.key === 'ArrowDown' || e.key === 'ArrowUp') && e.shiftKey) {
          await selectionManager$(context.highlightedIndexSig.value, 'toggle');
        }

        if (e.key === 'a' && e.ctrlKey) {
          context.selectedIndexSetSig.value.clear();
          for (const [index, item] of context.itemsMapSig.value) {
            if (!item.disabled) {
              await selectionManager$(index, 'add');
            }
          }
        }
      }
    } else {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        context.isListboxOpenSig.value = true;
      }

      if (!context.multiple) {
        if (e.key === 'ArrowRight' && context.highlightedIndexSig.value === null) {
          const firstIndex = await getNextEnabledItemIndex$(-1);
          await selectionManager$(firstIndex, 'add');
          context.highlightedIndexSig.value = firstIndex;
          return;
        }

        if (e.key === 'ArrowRight' && context.highlightedIndexSig.value !== null) {
          const firstSelectedIndex = context.selectedIndexSetSig.value
            .values()
            .next().value;

          const nextIndex = await getNextEnabledItemIndex$(firstSelectedIndex);
          await selectionManager$(nextIndex, 'add');
          context.highlightedIndexSig.value = nextIndex;
        }

        if (e.key === 'ArrowLeft' && context.highlightedIndexSig.value === null) {
          const lastIndex = await getPrevEnabledItemIndex$(
            context.itemsMapSig.value.size,
          );

          await selectionManager$(lastIndex, 'add');
          context.highlightedIndexSig.value = context.selectedIndexSetSig.value
            .values()
            .next().value;
          return;
        }

        if (e.key === 'ArrowLeft' && context.highlightedIndexSig.value !== null) {
          const prevIndex = await getPrevEnabledItemIndex$(
            context.highlightedIndexSig.value,
          );

          await selectionManager$(prevIndex, 'add');
          context.highlightedIndexSig.value = context.selectedIndexSetSig.value
            .values()
            .next().value;
        }
      }
    }

    if (e.key === 'Enter' || e.key === ' ') {
      if (context.multiple) {
        context.isListboxOpenSig.value = true;
      } else {
        context.isListboxOpenSig.value = !context.isListboxOpenSig.value;
      }
    }

    /** When initially opening the listbox, we want to grab the first enabled option index */
    if (context.highlightedIndexSig.value === null) {
      context.highlightedIndexSig.value = await getNextEnabledItemIndex$(-1);
      return;
    }
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
