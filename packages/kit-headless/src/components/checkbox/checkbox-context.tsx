import { createContextId, type Signal } from '@qwik.dev/core';

export const CheckboxContext = createContextId<Signal<boolean>>('CheckBox.context');
