import { useContext, $ } from '@builder.io/qwik';
import { comboboxContextId } from './combobox-context';

export function useCombobox() {
  const context = useContext(comboboxContextId);
  const selectionManager$ = $(
    async (index: number | null, action: 'add' | 'toggle' | 'remove') => {
      if (index === null) return;
      const currItem = context.itemsMapSig.value.get(index);
      const enabledIndex =
        currItem && currItem.disabled ? await getNextEnabledItemIndex$(index) : index;
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
        if (context.selectedIndexSetSig.value.has(enabledIndex)) {
          context.selectedIndexSetSig.value = new Set(
            [...context.selectedIndexSetSig.value].filter(
              (selectedIndex) => selectedIndex !== enabledIndex,
            ),
          );
        } else {
          context.selectedIndexSetSig.value = new Set([
            ...context.selectedIndexSetSig.value,
            enabledIndex,
          ]);
        }
      }
      if (action === 'remove') {
        context.selectedIndexSetSig.value = new Set(
          [...context.selectedIndexSetSig.value].filter(
            (selectedIndex) => selectedIndex !== index,
          ),
        );
      }
    },
  );
  const getNextEnabledItemIndex$ = $((index: number) => {
    let offset = 1;
    const len = context.itemsMapSig.value.size;
    if (!context.loop && index + 1 >= len) {
      return index;
    }
    while (offset < len) {
      const nextIndex = (index + offset) % len;
      if (!context.itemsMapSig.value.get(nextIndex)?.disabled) {
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
      if (!context.itemsMapSig.value.get(prevIndex)?.disabled) {
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
    if (index === -1 || context.itemsMapSig.value.get(index)?.disabled) {
      return '';
    }
    return `${context.localId}-${index}`;
  });
  return {
    getNextEnabledItemIndex$,
    getPrevEnabledItemIndex$,
    getActiveDescendant$,
    selectionManager$,
  };
}
