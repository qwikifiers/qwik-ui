export const getNextEnabledOptionIndexFromDisabledArr = (
  disabledArr: number,
  opts: Array<{ disabled: boolean }>,
): number => {
  let offset = 1;
  const len = opts.length;

  while (opts[(disabledArr + offset) % len]?.disabled) {
    offset++;
    if (offset + disabledArr > len - 1) {
      disabledArr = 0;
      offset = 0;
    }

    // no enabled opt found
    if (offset >= len) {
      return -1;
    }
  }
  return (disabledArr + offset) % len;
};

export const getPrevEnabledOptionIndexFromDisabledArr = (
  currentIndex: number,
  disabledArr: Array<{ disabled: boolean }>,
) => {
  let offset = 1;
  const len = disabledArr.length;
  while (disabledArr[(currentIndex - offset + len) % len]?.disabled) {
    offset++;
    if (currentIndex - offset < 0) {
      currentIndex = len - 1;
      offset = 0;
    }
  }
  return (currentIndex - offset + len) % len;
};
