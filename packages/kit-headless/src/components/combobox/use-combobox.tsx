import { useContext, $, Signal } from '@builder.io/qwik';
import { comboboxContextId } from './combobox-context';

class ValueManager<T> {
  constructor(
    private isMultiple: boolean,
    private initialValue: T | T[],
  ) {}

  add(value: T): T | T[] {
    if (this.isMultiple) {
      const currentArray = Array.isArray(this.initialValue) ? [...this.initialValue] : [];
      return [...currentArray, value];
    }
    return value;
  }

  remove(value: T): T | T[] {
    if (this.isMultiple && Array.isArray(this.initialValue)) {
      return this.initialValue.filter((v) => v !== value);
    }
    return '' as T;
  }

  toggle(value: T): T | T[] {
    if (this.isMultiple) {
      const currentArray = Array.isArray(this.initialValue) ? [...this.initialValue] : [];
      return currentArray.includes(value)
        ? currentArray.filter((v) => v !== value)
        : [...currentArray, value];
    }
    return this.initialValue === value ? ('' as T) : value;
  }
}

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

      const valueManager = new ValueManager(
        context.multiple ?? false,
        context.selectedValuesSig.value,
      );

      switch (action) {
        case 'add':
          context.selectedValuesSig.value = valueManager.add(value);
          break;
        case 'remove':
          context.selectedValuesSig.value = valueManager.remove(value);
          return; // Early return for 'remove' action
        case 'toggle':
          context.selectedValuesSig.value = valueManager.toggle(value);
          break;
      }

      // Update input value for single-select combobox
      if (!context.multiple && context.inputRef.value && selectedDisplayValue) {
        context.inputRef.value.value = selectedDisplayValue;
      }
    },
  );

  const filterManager$ = $((isVisible: boolean, itemRef: Signal, index: number) => {
    if (!itemRef.value) return;

    const isDisabled = context.itemsMapSig.value.get(index)?.disabled;

    itemRef.value.style.display = isVisible ? '' : 'none';

    context.filteredIndexSetSig.value = new Set(
      isVisible
        ? [...context.filteredIndexSetSig.value].filter(
            (filteredIndex) => filteredIndex !== index,
          )
        : [...context.filteredIndexSetSig.value, index],
    );

    // Update disabledIndexSetSig
    if (isDisabled) {
      context.disabledIndexSetSig.value = new Set([
        ...context.disabledIndexSetSig.value,
        index,
      ]);
    } else {
      context.disabledIndexSetSig.value = new Set(
        [...context.disabledIndexSetSig.value].filter(
          (disabledIndex) => disabledIndex !== index,
        ),
      );
    }
  });

  const getNextEnabledItemIndex$ = $((index: number) => {
    const len = context.itemsMapSig.value.size;
    if (len === 0) return -1;

    const findNextEnabled = (start: number) => {
      for (let i = 0; i < len; i++) {
        const nextIndex = (start + i) % len;
        if (
          !context.disabledIndexSetSig.value.has(nextIndex) &&
          !context.filteredIndexSetSig.value.has(nextIndex)
        ) {
          return nextIndex;
        }
      }
      return -1;
    };

    if (index === -1 || len === 1) {
      return findNextEnabled(0);
    }

    const nextIndex = findNextEnabled(index + 1);
    return context.loop || nextIndex > index ? nextIndex : index;
  });

  const getPrevEnabledItemIndex$ = $((index: number) => {
    const len = context.itemsMapSig.value.size;
    if (len === 0) return -1;

    const findPrevEnabled = (start: number) => {
      for (let i = 0; i < len; i++) {
        const prevIndex = (start - i + len) % len;
        if (
          !context.disabledIndexSetSig.value.has(prevIndex) &&
          !context.filteredIndexSetSig.value.has(prevIndex)
        ) {
          return prevIndex;
        }
      }
      return -1;
    };

    if (index === -1 || len === 1) {
      return findPrevEnabled(len - 1);
    }

    const prevIndex = findPrevEnabled(index - 1);
    return context.loop || prevIndex < index ? prevIndex : index;
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
