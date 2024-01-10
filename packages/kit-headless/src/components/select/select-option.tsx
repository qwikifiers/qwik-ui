import {
  component$,
  QwikIntrinsicElements,
  useComputed$,
  useContext,
  useSignal,
  useVisibleTask$,
} from '@builder.io/qwik';
import SelectContextId from './select-context-id';

import { KeyCode } from '../../utils/key-code.type';
import { Slot } from '@builder.io/qwik';

export type SelectOptionProps = {
  disabled?: boolean;
  optionValue: string;
} & QwikIntrinsicElements['li'];

export const selectOptionPreventedKeys = [KeyCode.ArrowDown, KeyCode.ArrowUp];

export const SelectOption = component$<SelectOptionProps>(
  ({ disabled, optionValue, ...props }) => {
    const selectContext = useContext(SelectContextId);
    const optionRef = useSignal<HTMLElement>();

    // const lol = selectContext.optionsStore.find(optionRef.value);
    // const isHighlightedSig = useComputed$(
    //   // eslint-disable-next-line qwik/valid-lexical-scope
    //   () => !disabled && selectContext.ariaSelectedIndex.value === index,
    // );
    const neoE = useSignal(optionRef.value);
    const neoIndex = useComputed$(() => {
      console.log('helo meme ');
      return selectContext.ariaSelectedIndex.value;
    });
    console.log('fav index ', neoIndex.value);

    useVisibleTask$(function setKeyHandler({ cleanup, track }) {
      // console.log(' post my option2 ', optionRef.value, index, isAriaSelected);
      function keyHandler(e: KeyboardEvent) {
        const target = e.target as HTMLElement;
        if (selectOptionPreventedKeys.includes(e.key as KeyCode)) {
          e.preventDefault();
        }

        if (!disabled && e.key === 'Tab' && target.dataset.optionValue === optionValue) {
          selectContext.selectedOptionSig.value = optionValue;
          selectContext.isOpenSig.value = false;
        }

        if (
          !disabled &&
          (e.key === 'Enter' || e.key === ' ') &&
          target.dataset.optionValue === optionValue
        ) {
          selectContext.selectedOptionSig.value = optionValue;
          selectContext.isOpenSig.value = false;
        }
      }
      optionRef.value?.addEventListener('keydown', keyHandler);
      cleanup(() => {
        optionRef.value?.removeEventListener('keydown', keyHandler);
      });
    });

    return (
      <li
        ref={optionRef}
        role="option"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        aria-selected={
          selectContext.optionsStore.indexOf(optionRef.value) ===
          selectContext.ariaSelectedIndex.value
        }
        data-option-value={optionValue}
        onClick$={() => {
          if (!disabled) {
            selectContext.selectedOptionSig.value = optionValue;
            selectContext.isOpenSig.value = false;
          }
        }}
        onMouseEnter$={(e) => {
          if (!disabled) {
            const target = e.target as HTMLElement;
            target.focus();
          }
        }}
        {...props}
      >
        <Slot />
      </li>
    );
  },
);
