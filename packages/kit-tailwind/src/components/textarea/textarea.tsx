import { component$ } from '@builder.io/qwik';
import { Textarea as HeadlessTextarea, TextareaProps } from '@qwik-ui/primitives';
import { clsq } from '@qwik-ui/shared';

export const Textarea = component$((textareaProps: TextareaProps) => {
  return (
    <HeadlessTextarea
      {...textareaProps}
      class={clsq('p-4 border-[1px] rounded', textareaProps.class)}
    ></HeadlessTextarea>
  );
});
