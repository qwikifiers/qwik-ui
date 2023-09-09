import type { ComboboxContext, Option } from './combobox-context.type';

export const getNextEnabledOptionIndex = <O extends Option = Option>(
  index: number,
  context: ComboboxContext<O>,
) => {
  let offset = 1;
  let currentIndex = index;
  const opts = context.filteredOptionsSig.value;
  const len = opts.length;

  while (opts[(currentIndex + offset) % len]?.disabled) {
    offset++;
    if (offset + currentIndex > len - 1) {
      currentIndex = 0;
      offset = 0;
    }

    // no enabled opt found
    if (offset >= len) {
      return -1;
    }
  }
  return (currentIndex + offset) % len;
};

export const getPrevEnabledOptionIndex = <O extends Option = Option>(
  index: number,
  context: ComboboxContext<O>,
) => {
  let offset = 1;
  let currentIndex = index;
  const opts = context.filteredOptionsSig.value;
  const len = opts.length;
  while (opts[(currentIndex - offset + len) % len]?.disabled) {
    offset++;
    if (currentIndex - offset < 0) {
      currentIndex = len - 1;
      offset = 0;
    }
  }
  return (currentIndex - offset + len) % len;
};

export const getActiveDescendant = <O extends Option = Option>(
  context: ComboboxContext<O>,
) => {
  const highlightedIndex = context.highlightedIndexSig.value;
  const option = context.filteredOptionsSig.value[highlightedIndex];

  if (highlightedIndex === -1 || option?.disabled) {
    return '';
  }

  return `${context.localId}-${option?.key}`;
};
