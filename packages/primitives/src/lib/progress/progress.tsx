import { QwikIntrinsicElements } from '@builder.io/qwik';

export type ProgressProps = QwikIntrinsicElements['progress'];

export const Progress = (props: ProgressProps) => {
  return <progress {...props} />;
};
