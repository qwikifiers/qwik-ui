import { createContextId } from '@builder.io/qwik';
import { ModalContext } from './modal-context.type';

export const modalContextId = createContextId<ModalContext>('qui--modal');
