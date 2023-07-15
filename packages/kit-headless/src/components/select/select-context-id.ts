import { createContextId } from '@builder.io/qwik';
import { SelectContext } from './select-context.type';

const SelectContextId = createContextId<SelectContext>('select-root');

export default SelectContextId;
