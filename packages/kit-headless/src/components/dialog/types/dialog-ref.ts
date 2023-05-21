import { DialogContext } from './dialog-context';

export type DialogRef = Pick<DialogContext, 'open$' | 'close$'>;
