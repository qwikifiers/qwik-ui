import { createContextId } from '@builder.io/qwik';
import { ComboboxContext } from './combobox-context.type';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ComboboxContextId = createContextId<ComboboxContext<any>>('combobox');

export default ComboboxContextId;
