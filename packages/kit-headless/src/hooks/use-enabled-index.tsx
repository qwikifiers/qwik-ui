import { $ } from '@builder.io/qwik';

export function useEnabledIndex() {
  const getNextEnabledItemIndex$ = $(
    (index: number, itemsMap: Map<number, boolean>, loop?: boolean) => {
      let offset = 1;
      const len = itemsMap.size;

      if (loop !== undefined && !loop && index + 1 >= len) {
        return index;
      }

      while (offset < len) {
        const nextIndex = (index + offset) % len;
        // whether it's disabled or not
        if (!itemsMap.get(nextIndex)) {
          return nextIndex;
        }
        offset++;
        if (loop !== undefined && !loop && index + offset >= len) {
          break;
        }
      }

      return index;
    },
  );

  const getPrevEnabledItemIndex$ = $(
    (index: number, itemsMap: Map<number, boolean>, loop?: boolean) => {
      let offset = 1;
      const len = itemsMap.size;

      if (loop !== undefined && !loop && index - 1 < 0) {
        return index;
      }

      while (offset <= len) {
        const prevIndex = (index - offset + len) % len;
        if (!itemsMap.get(prevIndex)) {
          return prevIndex;
        }
        offset++;
        if (loop !== undefined && !loop && index - offset < 0) {
          break;
        }
      }

      return index;
    },
  );

  return {
    getNextEnabledItemIndex$,
    getPrevEnabledItemIndex$,
  };
}
