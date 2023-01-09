import { component$, PropFunction } from '@builder.io/qwik';
import {
  Select as HeadlessSelect,
  SelectItemProps,
  SelectOption as HeadlessSelectOption,
} from '@qwik-ui/headless';

interface SelectProps {
  options: SelectItemProps[];
  onChange$?: PropFunction<(evt: any) => void>;
  placeholder?: string;
}

export const Select = component$(
  ({ onChange$, placeholder, options }: SelectProps) => {
    return (
      <HeadlessSelect class="select w-full max-w-xs" onChange={onChange$}>
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
