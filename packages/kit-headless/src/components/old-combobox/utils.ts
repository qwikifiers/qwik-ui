interface Option {
  key: number;
  disabled: boolean;
}

export const getNextEnabledOptionIndex = <O extends Option = Option>(
  index: number,
  filteredOptionsSig: { value: O[] },
) => {
  let offset = 1;
  let currentIndex = index;
  const opts = filteredOptionsSig.value;
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
  filteredOptionsSig: { value: O[] },
) => {
  let offset = 1;
  let currentIndex = index;
  const opts = filteredOptionsSig.value;
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
  highlightedIndexSig: { value: number },
  filteredOptionsSig: { value: O[] },
  localId: string,
) => {
  const highlightedIndex = highlightedIndexSig.value;
  const option = filteredOptionsSig.value[highlightedIndex];

  if (highlightedIndex === -1 || option?.disabled) {
    return '';
  }

  return `${localId}-${option?.key}`;
};
