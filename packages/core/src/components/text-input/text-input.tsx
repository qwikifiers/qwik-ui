import { component$, PropFunction } from '@builder.io/qwik';

interface TextInputProps {
  class?: string;
  className?: string;
  placeholder?: string;
  onChange$?: PropFunction<(evt: InputEvent) => void>;
}

export const TextInput = component$((props: TextInputProps) => {
  return (
    <input
      type="text"
      placeholder={props.placeholder}
      class="input w-full max-w-xs"
      {...props}
      onChange$={props.onChange$}
    />
  );
});
