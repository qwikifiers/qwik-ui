import {
  QwikIntrinsicElements,
  component$,
  useContext,
  useSignal,
  useVisibleTask$,
} from '@builder.io/qwik';
import { OptionProps } from '../autocomplete';
import SelectContextId from './select-context-id';

import { KeyCode } from '../../utils/key-code.type';

export type SelectOptionProps = {
  disabled?: boolean;
  optionValue: string;
} & QwikIntrinsicElements['li'];

export const selectOptionPreventedKeys = [KeyCode.ArrowDown, KeyCode.ArrowUp];

export const SelectOption = component$(
  ({ disabled, optionValue, ...props }: OptionProps) => {
    const selectContext = useContext(SelectContextId);
    const ref = useSignal<HTMLElement>();

    useVisibleTask$(function preventDefaultOnKeys({ cleanup }) {
      function handler(e: KeyboardEvent) {
        const target = e.target as HTMLElement;
        if (selectOptionPreventedKeys.includes(e.key as KeyCode)) {
          e.preventDefault();
        }

        if (!disabled && e.key === 'Tab' && target.innerText === optionValue) {
          selectContext.selection.value = optionValue;
          selectContext.isExpanded.value = false;
        }

        if (
          !disabled &&
          (e.key === 'Enter' || e.key === ' ') &&
          target.innerText === optionValue
        ) {
          selectContext.selection.value = optionValue;
          selectContext.isExpanded.value = false;
        }
      }
      ref.value?.addEventListener('keydown', handler);
      cleanup(() => {
        ref.value?.removeEventListener('keydown', handler);
      });
    });

    return (
      <li
        ref={ref}
        role="option"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        aria-selected={optionValue === selectContext.selection.value}
        data-optionvalue={optionValue}
        onClick$={() => {
          if (!disabled) {
            selectContext.selection.value = optionValue;
            selectContext.isExpanded.value = false;
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
        {optionValue}
      </li>
    );
  }
);
