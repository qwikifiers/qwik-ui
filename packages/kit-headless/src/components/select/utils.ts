import { type Opt } from './select-inline';

export const getActiveDescendant = (index: number, options: Opt[], localId: string) => {
  const option = options[index];

  if (index === -1 || option?.isDisabled) {
    return '';
  }

  return `${localId}-${index}`;
};
