import { OptionsType } from './select-trigger';

export const getNextEnabledOptionIndex = (index: number, options: OptionsType) => {
  let offset = 1;
  let currentIndex = index;
  const opts = options;
  const len = opts.length;

  while (opts[(currentIndex + offset) % len].isDisabled) {
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

export const getPrevEnabledOptionIndex = (index: number, options: OptionsType) => {
  let offset = 1;
  let currentIndex = index;
  const opts = options;
  const len = opts.length;
  while (opts[(currentIndex - offset + len) % len]?.isDisabled) {
    offset++;
    if (currentIndex - offset < 0) {
      currentIndex = len - 1;
      offset = 0;
    }
  }
  return (currentIndex - offset + len) % len;
};
