import { component$, QwikIntrinsicElements } from '@builder.io/qwik';

export type RadioProps = QwikIntrinsicElements['input'];

export const Radio = component$((props: RadioProps) => {
  return (
    <>
      <input {...props} type="radio" />
    </>
  );
});
