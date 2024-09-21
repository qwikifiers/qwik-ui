import { useContext, $, Signal } from '@builder.io/qwik';
import { comboboxContextId } from './combobox-context';

export function useCombobox() {
  const context = useContext(comboboxContextId);
  const selectionManager$ = $(
    async (index: number | null, action: 'add' | 'toggle' | 'remove') => {
      if (index === null) return;
      const selectedDisplayValue = context.itemsMapSig.value.get(index)?.displayValue;

      const value = context.itemsMapSig.value.get(index)?.value;

      if (!value) {
        throw new Error(
          'Qwik UI: value not found when trying to select or unselect an item.',
        );
      }

      const currentValue = context.selectedValuesSig.value;
      const isArray = Array.isArray(currentValue);

      if (action === 'add') {
        if (context.multiple) {
          context.selectedValuesSig.value = isArray ? [...currentValue, value] : [value];
        } else {
          context.selectedValuesSig.value = value;
        }
      }

      if (action === 'toggle') {
        if (context.multiple) {
          if (isArray) {
            context.selectedValuesSig.value = currentValue.includes(value)
              ? currentValue.filter((selectedValue) => selectedValue !== value)
              : [...currentValue, value];
          } else {
            context.selectedValuesSig.value = [value];
          }
        } else {
          context.selectedValuesSig.value = currentValue === value ? '' : value;
        }
      }

      if (action === 'remove') {
        if (context.multiple && isArray) {
          context.selectedValuesSig.value = currentValue.filter(
            (selectedValue) => selectedValue !== value,
          );
        } else {
          context.selectedValuesSig.value = '';
        }
      }

      if (action === 'add' || action === 'toggle') {
        if (!context.inputRef.value) return;
        if (!selectedDisplayValue) return;

        if (!context.multiple && context.selectedValuesSig.value === value) {
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
