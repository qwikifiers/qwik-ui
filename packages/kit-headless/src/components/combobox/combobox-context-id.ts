import { createContextId } from '@builder.io/qwik';
import { ComboboxContext } from './combobox-context.type';

const ComboboxContextId = createContextId<ComboboxContext>('combobox');

export default ComboboxContextId;
