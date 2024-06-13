import { createContextId } from '@builder.io/qwik';

export const comboboxContextId = createContextId<ComboboxContext>('qui-combobox');

export type ComboboxContext = {};

// export const groupContextId = createContextId<GroupContext>('Combobox-Group');

// export type GroupContext = {
//   groupLabelId: string;
// };

// export const ComboboxItemContextId = createContextId<ComboboxItemContext>('Combobox-Option');

// export type ComboboxItemContext = {
//   isSelectedSig: Signal<boolean>;
// };
