import { createContextId } from '@builder.io/qwik';

export const modalContextId = createContextId<ModalContext>('qui-modal');

export type ModalContext = {
  // core state
  localId: string;
};
