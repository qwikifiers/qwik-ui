import { useContext, $, Signal } from '@builder.io/qwik';
import { comboboxContextId } from './combobox-context';

export function useCombobox() {
  const context = useContext(comboboxContextId);
  const selectionManager$ = $(
    async (index: number | null, action: 'add' | 'toggle' | 'remove') => {
      if (index === null) return;
      const selectedDisplayValue = context.itemsMapSig.value.get(index)?.displayValue;

      if (action === 'add') {
        if (context.multiple) {
          context.selectedIndexSetSig.value = new Set([
            ...context.selectedIndexSetSig.value,
            index,
          ]);
        } else {
          context.selectedIndexSetSig.value = new Set([index]);
        }
      }
      if (action === 'toggle') {
        if (context.selectedIndexSetSig.value.has(index)) {
          context.selectedIndexSetSig.value = new Set(
            [...context.selectedIndexSetSig.value].filter(
              (selectedIndex) => selectedIndex !== index,
            ),
          );
        } else {
          if (context.multiple) {
            context.selectedIndexSetSig.value = new Set([
              ...context.selectedIndexSetSig.value,
              index,
            ]);
          } else {
            context.selectedIndexSetSig.value = new Set([index]);
          }
        }
      }
      if (action === 'remove') {
        context.selectedIndexSetSig.value = new Set(
          [...context.selectedIndexSetSig.value].filter(
            (selectedIndex) => selectedIndex !== index,
          ),
        );
      }

      if (action === 'add' || action === 'toggle') {
        if (!context.inputRef.value) return;
        if (!selectedDisplayValue) return;

        if (!context.multiple && context.selectedIndexSetSig.value.has(index)) {
          context.inputRef.value.value = selectedDisplayValue;
        }
      }
    },
  );

  const filterManager$ = $((isVisible: boolean, itemRef: Signal, index: number) => {
    if (!itemRef.value) return;

    itemRef.value.style.display = isVisible ? '' : 'none';
    context.disabledIndexSetSig.value = new Set(
      isVisible
        ? [...context.disabledIndexSetSig.value].filter(
            (selectedIndex) => selectedIndex !== index,
          )
        : [...context.disabledIndexSetSig.value, index],
    );
  });

  const getNextEnabledItemIndex$ = $((index: number) => {
    const len = context.itemsMapSig.value.size;
    if (len === 1) {
      return context.disabledIndexSetSig.value.has(0) ? -1 : 0;
    }

    let offset = 1;
    if (!context.loop && index + 1 >= len) {
      return index;
    }
    while (offset < len) {
      const nextIndex = (index + offset) % len;
      if (!context.disabledIndexSetSig.value.has(nextIndex)) {
        return nextIndex;
      }
      offset++;
      if (!context.loop && index + offset >= len) {
        break;
      }
    }
    return index;
  });

  const getPrevEnabledItemIndex$ = $((index: number) => {
    let offset = 1;
    const len = context.itemsMapSig.value.size;
    if (!context.loop && index - 1 < 0) {
      return index;
    }
    while (offset <= len) {
      const prevIndex = (index - offset + len) % len;
      if (!context.disabledIndexSetSig.value.has(prevIndex)) {
        return prevIndex;
      }
      offset++;
      if (!context.loop && index - offset < 0) {
        break;
      }
    }
    return index;
  });

  const getActiveDescendant$ = $((index: number) => {
    if (index === -1 || context.disabledIndexSetSig.value.has(index)) {
      return '';
    }
    return `${context.localId}-${index}`;
  });

  return {
    getNextEnabledItemIndex$,
    getPrevEnabledItemIndex$,
    getActiveDescendant$,
    selectionManager$,
    filterManager$,
  };
}
