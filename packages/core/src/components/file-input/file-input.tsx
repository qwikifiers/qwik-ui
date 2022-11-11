import { component$, PropFunction } from '@builder.io/qwik';

interface FileInputProps {
  class?: string;
  className?: string;
  onChange$?: PropFunction<(evt: any) => void>;
}

export const FileInput = component$((props: FileInputProps) => {
  return (
    <input
      type="file"
      class="file-input w-full max-w-xs"
      {...props}
      onChange$={props.onChange$}
    />
  );
});
