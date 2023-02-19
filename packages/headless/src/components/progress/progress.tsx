import { component$, QwikIntrinsicElements, Slot } from '@builder.io/qwik';

export type ProgressProps = QwikIntrinsicElements['progress'];

export const Progress = component$((props: ProgressProps) => {
  return <progress {...props} />;
});
