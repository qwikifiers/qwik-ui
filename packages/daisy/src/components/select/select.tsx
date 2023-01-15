import { component$, PropFunction } from '@builder.io/qwik';
import {
  Select as HeadlessSelect,
  SelectOption as HeadlessSelectOption,
  SelectOptionProps,
} from '@qwik-ui/headless';

interface SelectProps {
  options: SelectOptionProps[];
  onChange$?: PropFunction<(evt: any) => void>;
  placeholder?: string;
}

export const Select = component$(
  ({ onChange$, placeholder, options, ...props }: SelectProps) => {
    return (
      <HeadlessSelect
        class="select w-full max-w-xs"
        onChange={onChange$}
        {...props}
      >
        {placeholder && <HeadlessSelectOption disabled label={placeholder} />}
        {options.map((option) => (
          <HeadlessSelectOption
            value={option.value}
            label={option.label}
            disabled={option.disabled}
          />
        ))}
      </HeadlessSelect>
    );
  }
);
