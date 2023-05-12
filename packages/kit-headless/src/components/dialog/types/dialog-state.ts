import { Signal } from '@builder.io/qwik';

export type DialogState = {
  opened: boolean;
  dialogRef: Signal<HTMLDialogElement | undefined>;
};
