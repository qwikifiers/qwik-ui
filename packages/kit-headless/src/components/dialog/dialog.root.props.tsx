import { QwikIntrinsicElements } from '@builder.io/qwik';

export type RootProps = Pick<
  QwikIntrinsicElements['dialog'],
  'class' | 'aria-labelledby' | 'aria-describedby'
> & {
  fullScreen?: boolean;
};
