import { QwikIntrinsicElements } from '@builder.io/qwik';

export type RadioProps = QwikIntrinsicElements['input'];

export const Radio = (props: RadioProps) => (
  <input {...props} type="radio" />
);
