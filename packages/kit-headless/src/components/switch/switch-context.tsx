import { createContextId, QRL, type Signal } from '@builder.io/qwik';

export interface SwitchState {
  'bind:checked': Signal<boolean>;
  defaultChecked?: boolean;
  disabled?: boolean;
  onChange$?: QRL<(checked: boolean, event: MouseEvent | KeyboardEvent) => void>;
  onClick$?: QRL<(checked: boolean, event: MouseEvent | KeyboardEvent) => void>;
  autoFocus?: boolean;
}
//
export type SwitchContextState = Omit<SwitchState, 'bind:checked'> & {
  bindChecked: Signal<boolean>;
  switchRef?: Signal<HTMLInputElement | undefined>;
};

export const SwitchContext = createContextId<SwitchContextState>('SwitchContext');
