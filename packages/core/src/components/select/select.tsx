import { component$, PropFunction } from '@builder.io/qwik';

interface SelectProps {
  placeholder: string;
  options: string[];
  onChange$?: PropFunction<(evt: any) => void>;
}

export const Select = component$((props: SelectProps) => {
  return (
    <select class="select w-full max-w-xs" onChange$={props.onChange$}>
      <option disabled selected>
        {props.placeholder}
      </option>
      {props.options.map((option) => (
        <option>{option}</option>
      ))}
    </select>
  );
});
