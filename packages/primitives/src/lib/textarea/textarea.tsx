import { QwikIntrinsicElements } from '@builder.io/qwik';

export type TextareaProps = QwikIntrinsicElements['textarea'];

export const Textarea = (textareaProps: TextareaProps) => (
  <textarea {...textareaProps}></textarea>
);
