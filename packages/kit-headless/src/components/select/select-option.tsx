import {
  QwikIntrinsicElements,
  component$,
  useContext,
  useSignal,
} from '@builder.io/qwik';
import { OptionProps } from '../autocomplete';
import SelectContextId from './select-context-id';

export type SelectOptionProps = {
  disabled?: boolean;
  optionValue: string;
} & QwikIntrinsicElements['li'];

export const SelectOption = component$(
  ({ disabled, optionValue, ...props }: OptionProps) => {
    const selectContext = useContext(SelectContextId);
    const ref = useSignal<HTMLElement>();
    return (
      <li
        ref={ref}
        role="option"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        aria-selected={optionValue === selectContext.selection.value}
        onClick$={() => {
          if (!disabled) {
            selectContext.selection.value = optionValue;
            selectContext.isExpanded.value = false;
          }
        }}
        onKeyUp$={(e) => {
          const target = e.target as HTMLElement;
          if (
            !disabled &&
            (e.key === 'Enter' || e.key === ' ') &&
            target.innerText === optionValue
          ) {
            selectContext.selection.value = optionValue;
            selectContext.isExpanded.value = false;
          }
        }}
        onKeyDown$={(e) => {
          const target = e.target as HTMLElement;
          if (
            !disabled &&
            e.key === 'Tab' &&
            target.innerText === optionValue
          ) {
            selectContext.selection.value = optionValue;
            selectContext.isExpanded.value = false;
          }
        }}
        onMouseEnter$={(e) => {
          if (!disabled) {
            const target = e.target as HTMLElement;
            target.focus();
            console.log('focus');
          }
        }}
        {...props}
      >
        {optionValue}
      </li>
    );
  }
);
