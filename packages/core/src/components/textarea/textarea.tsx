import { component$, PropFunction } from '@builder.io/qwik';

interface TextareaProps {
  class?: string;
  className?: string;
  placeholder?: string;
  onChange?: PropFunction<(evt: InputEvent) => void>;
}

export const Textarea = component$((props: TextareaProps) => {
  return (
    <textarea
      class="textarea"
      placeholder={props.placeholder}
      {...props}
      onChange$={props.onChange}
    />
  );
});
