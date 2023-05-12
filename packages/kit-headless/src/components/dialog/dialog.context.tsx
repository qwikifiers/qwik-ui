import { createContextId } from '@builder.io/qwik';
import { DialogContext } from './types';

export const dialogContext = createContextId<DialogContext>('dialog');
