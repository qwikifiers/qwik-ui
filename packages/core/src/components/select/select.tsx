import { component$, PropFunction } from '@builder.io/qwik';

interface SelectProps {
  placeholder: string;
  options: string[];
  onChange?: PropFunction<(evt: InputEvent) => void>;
}

export const Select = component$(
  ({ placeholder, options, onChange }: SelectProps) => {
    return (
      <select class="select w-full max-w-xs" onChange$={onChange}>
        <option disabled selected>
          {placeholder}
        </option>
        {options.map((option, i) => (
          <option>{option}</option>
        ))}
      </select>
    );
  }
);
