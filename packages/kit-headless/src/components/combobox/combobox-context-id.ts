import { createContextId } from '@builder.io/qwik';
import { ComboboxContext } from './combobox-context.type';
import { ComboboxControlContext } from './combobox-context.type';

const ComboboxContextId = createContextId<ComboboxContext>('combobox');
export const ComboboxControlContextId =
  createContextId<ComboboxControlContext>('combobox-control');

export default ComboboxContextId;
