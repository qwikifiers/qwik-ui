import { createContextId, type Signal } from '@builder.io/qwik';

export interface SwitchState {
  'bind:checked': Signal<boolean>;
  defaultChecked: boolean;
  disabled: boolean;
  label: string;
}
//
export type SwitchContextState = Omit<SwitchState, 'bind:checked'> & { bindChecked: Signal<boolean> }

export const SwitchContext = createContextId<SwitchContextState>('SwitchContext');
