import { InputHTMLAttributes, QwikIntrinsicElements } from '@builder.io/qwik';
import { JSX } from '@builder.io/qwik/jsx-runtime';

export type RadioProps = QwikIntrinsicElements['input'];

export const Radio: (props: InputHTMLAttributes<HTMLInputElement>) => JSX.Element = (
  props,
) => <input {...props} type="radio" />;
