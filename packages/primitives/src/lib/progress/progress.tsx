import { ProgressHTMLAttributes, QwikIntrinsicElements } from '@builder.io/qwik';
import { JSX } from '@builder.io/qwik/jsx-runtime';
export type { ProgressHTMLAttributes } from '@builder.io/qwik/core';

export type ProgressProps = QwikIntrinsicElements['progress'];

export const Progress: (
  props: ProgressHTMLAttributes<HTMLProgressElement>,
) => JSX.Element = (props) => {
  return <progress {...props} />;
};
