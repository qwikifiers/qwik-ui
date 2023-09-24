import {
  component$,
  useContext,
  type QwikIntrinsicElements,
  QRL,
} from '@builder.io/qwik';

import { JSX } from '@builder.io/qwik/jsx-runtime';

import ComboboxContextId from './combobox-context-id';
import type { ComboboxContext, Option } from './combobox-context.type';
import { ResolvedOption } from './combobox';

export type ComboboxListboxProps<O extends Option = Option> = {
  optionRenderer$?: QRL<
    (resolved: ResolvedOption<O>, filteredIndex: number) => JSX.Element
  >;
} & QwikIntrinsicElements['ul'];

export const ComboboxListbox = component$(
  <O extends Option = Option>({ optionRenderer$, ...props }: ComboboxListboxProps<O>) => {
    const context = useContext<ComboboxContext<O>>(ComboboxContextId);
    const listboxId = `${context.localId}-listbox`;

    return (
      <ul
        {...props}
        id={listboxId}
        ref={context.listboxRef}
        aria-label={
          context.labelRef.value ? context.labelRef.value?.innerText : 'Suggestions'
        }
        role="listbox"
        style={{ ...(props.style as object) }}
      >
        {context.filteredOptionsSig.value.map((resolved, filteredIndex) =>
          optionRenderer$?.(resolved, filteredIndex),
        )}
      </ul>
    );
  },
);
