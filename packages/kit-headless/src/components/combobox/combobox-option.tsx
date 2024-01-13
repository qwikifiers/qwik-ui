import {
  Slot,
  component$,
  useComputed$,
  useContext,
  useSignal,
  $,
  PropsOf,
} from '@builder.io/qwik';
import ComboboxContextId from './combobox-context-id';

import { ResolvedOption } from './combobox';

export type ComboboxOptionProps = PropsOf<'li'> & {
  index: number;
  resolved: ResolvedOption;
};

export const ComboboxOption = component$(
  // remove non-li props from props
  ({ index, resolved, ...props }: ComboboxOptionProps) => {
    const context = useContext(ComboboxContextId);
    const optionId = `${context.localId}-${resolved.key}`;

    const isHighlightedSig = useComputed$(
      () => !resolved.disabled && context.highlightedIndexSig.value === index,
    );

    const onClickBehavior$ = $(() => {
      if (!context.inputRef.value || resolved.disabled) {
        return;
      }

      (context.inputRef.value.value = context.filteredOptionsSig.value[index]?.label),
        (context.isListboxOpenSig.value = false);

      context.selectedIndexSig.value = index;
    });

    const optionRef = useSignal<HTMLLIElement>();

    return (
      <li
        {...props}
        id={optionId}
        ref={optionRef}
        tabIndex={-1}
        role="option"
        data-highlighted={isHighlightedSig.value}
        aria-selected={index === context.selectedIndexSig.value}
        data-selected={index === context.selectedIndexSig.value}
        aria-disabled={resolved.disabled}
        data-disabled={resolved.disabled}
        onClick$={[onClickBehavior$, props.onClick$]}
        onMouseEnter$={[
          $(() => (context.highlightedIndexSig.value = index)),
          props.onMouseEnter$,
        ]}
        preventdefault:mousedown
      >
        <Slot />
      </li>
    );
  },
);
