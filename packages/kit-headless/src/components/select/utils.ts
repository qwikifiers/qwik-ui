import { type Opt } from './select-inline';

export const getNextEnabledOptionIndex = (
  index: number,
  options: Opt[],
  loop: boolean,
) => {
  let offset = 1;
  const len = options.length;

  if (!loop && index + 1 >= len) {
    return index;
  }

  while (offset < len) {
    const nextIndex = (index + offset) % len;
    if (!options[nextIndex].isDisabled) {
      return nextIndex;
    }
    offset++;
    if (!loop && index + offset >= len) {
      break;
    }
  }

  return index;
};

export const getPrevEnabledOptionIndex = (
  index: number,
  options: Opt[],
  loop: boolean,
) => {
  let offset = 1;
  const len = options.length;

  if (!loop && index - 1 < 0) {
    return index;
  }

  while (offset <= len) {
    const prevIndex = (index - offset + len) % len;
    if (!options[prevIndex].isDisabled) {
      return prevIndex;
    }
    offset++;
    if (!loop && index - offset < 0) {
      break;
    }
  }

  return index;
};

export const getActiveDescendant = (index: number, options: Opt[], localId: string) => {
  const option = options[index];

  if (index === -1 || option?.isDisabled) {
    return '';
  }

  return `${localId}-${index}`;
};
