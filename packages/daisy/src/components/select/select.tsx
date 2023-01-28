import { component$, PropFunction } from '@builder.io/qwik';
import {
  Select as HeadlessSelect,
  SelectTrigger as HeadlessSelectTrigger,
  SelectOptionsList as HeadlessSelectOptionList,
  SelectOption as HeadlessSelectOption,
  SelectOptionProps,
  SelectTrigger,
} from '@qwik-ui/headless';

interface SelectProps {
  options: SelectOptionProps[];
  onChange$?: PropFunction<(evt: any) => void>;
  placeholder?: string;
}

export const Select = component$(
  ({ onChange$, placeholder, options, ...props }: SelectProps) => {
    return (
      <HeadlessSelect onChange={onChange$} {...props}>
        <HeadlessSelectTrigger class="dropdown">
          <button class="btn">{placeholder}</button>
        </HeadlessSelectTrigger>
        <HeadlessSelectOptionList class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
          {options.map((option) => (
            <HeadlessSelectOption
              value={option.value}
              label={option.label}
              disabled={option.disabled}
            />
          ))}
        </HeadlessSelectOptionList>
      </HeadlessSelect>
    );
  }
);
