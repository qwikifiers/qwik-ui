import { useOn, type Signal, $ } from '@builder.io/qwik';

export enum LogicalKeys {
  'ArrowBlockEnd' = 'ArrowBlockEnd',
  'ArrowBlockStart' = 'ArrowBlockStart',
  'ArrowInlineStart' = 'ArrowInlineStart',
  'ArrowInlineEnd' = 'ArrowInlineEnd',
}

const ltf = new Map()
  .set('ArrowLeft', 'ArrowInlineStart')
  .set('ArrowRight', 'ArrowInlineEnd');

const rtl = new Map()
  .set('ArrowLeft', 'ArrowInlineEnd')
  .set('ArrowRight', 'ArrowInlineStart');

type Params = {
  dir?: 'ltr' | 'rtl';
};

export const useLogicalKeys = (
  ref: Signal<HTMLElement | undefined>,
  params: Params | void,
) => {
  useOn(
    'keydown',
    $((e) => {
      if (!params || !ref?.value) {
        return;
      }

      const direction = !params.dir ? 'ltr' : params.dir;
      const logicalKey =
        direction === 'ltr'
          ? ltf.get((e as KeyboardEvent).key)
          : rtl.get((e as KeyboardEvent).key);

      if (!logicalKey) {
        return;
      }

      ref.value.dispatchEvent(new CustomEvent(logicalKey));

      e.preventDefault();
      e.stopPropagation();
    }),
  );
};
