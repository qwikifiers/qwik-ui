import {
  QwikIntrinsicElements,
  Slot,
  component$,
  useComputed$,
  useContext,
  useSignal,
  useVisibleTask$,
  $,
} from '@builder.io/qwik';
import ComboboxContextId from './combobox-context-id';

import { ResolvedOption } from './combobox';

export type ComboboxOptionProps = {
  index: number;
  resolved: ResolvedOption;
} & QwikIntrinsicElements['li'];

export const ComboboxOption = component$(
  // remove non-li props from props
  ({ index, resolved, onMouseEnter$, onClick$, ...liProps }: ComboboxOptionProps) => {
    const context = useContext(ComboboxContextId);
    const optionId = `${context.localId}-${resolved.key}`;

    const isHighlightedSig = useComputed$(
      // eslint-disable-next-line qwik/valid-lexical-scope
      () => !resolved.disabled && context.highlightedIndexSig.value === index,
    );

    const onClickBehavior$ = $(() => {
      // eslint-disable-next-line qwik/valid-lexical-scope
      if (!context.inputRef.value || resolved.disabled) {
        return;
      }

      (context.inputRef.value.value =
        context.filteredOptionsSig.value[context.highlightedIndexSig.value]?.label),
        (context.isListboxOpenSig.value = false);
    });

    const optionRef = useSignal<HTMLLIElement>();

    useVisibleTask$(function preventFocusChangeTask({ cleanup }) {
      if (optionRef.value) {
        const handleMousedown = (e: MouseEvent): void => {
          const isOption = e.target === context.triggerRef.value;
          const isOptionDescendant =
            e.target && optionRef.value?.contains(e.target as Node);

          if (isOption || isOptionDescendant) {
            e.preventDefault();
          }

          if (!context.inputRef.value) {
            return;
          }

          context.inputRef.value.focus();
        };

        optionRef.value.addEventListener('mousedown', handleMousedown);

        cleanup(() => {
          optionRef.value?.removeEventListener('mousedown', handleMousedown);
        });
      }
    });

    return (
      <li
        {...liProps}
        id={optionId}
        ref={optionRef}
        tabIndex={0}
        role="option"
        aria-selected={isHighlightedSig.value}
        aria-disabled={resolved.disabled}
        data-disabled={resolved.disabled}
        onClick$={[onClickBehavior$, onClick$]}
        onMouseEnter$={[
          $(() => (context.highlightedIndexSig.value = index)),
          onMouseEnter$,
        ]}
      >
        <Slot />
      </li>
    );
  },
);
