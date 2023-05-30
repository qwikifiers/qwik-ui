import { QwikIntrinsicElements, Signal } from '@builder.io/qwik';
import { DialogRef } from './dialog-ref';

export type DialogIntrinsicElementProps = Pick<
  QwikIntrinsicElements['dialog'],
  'class' | 'style' | 'aria-labelledby' | 'aria-describedby'
>;

export type RootProps = DialogIntrinsicElementProps & {
  fullScreen?: boolean;
  ref?: Signal<DialogRef | undefined>;
};
