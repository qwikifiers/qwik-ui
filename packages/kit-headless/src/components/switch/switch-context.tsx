import { createContextId, QRL, type Signal } from '@builder.io/qwik';

export interface SwitchState {
  'bind:checked': Signal<boolean>;
  defaultChecked?: boolean;
  disabled?: boolean;
  onChange$?: QRL<() => void>
}
//
export type SwitchContextState = Omit<SwitchState, 'bind:checked'> & { bindChecked?: Signal<boolean> }

export const SwitchContext = createContextId<SwitchContextState>('SwitchContext');
