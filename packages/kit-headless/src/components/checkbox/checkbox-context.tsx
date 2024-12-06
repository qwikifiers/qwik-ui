import { createContextId, type Signal } from '@builder.io/qwik';

export const CheckboxContext = createContextId<Signal<boolean>>('CheckBox.context');
