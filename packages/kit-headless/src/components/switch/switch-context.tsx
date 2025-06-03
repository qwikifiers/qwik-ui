import { createContextId, QRL, type Signal } from '@builder.io/qwik';

export interface SwitchState {
  'bind:checked'?: Signal<boolean>;
  checked?: boolean;
  disabled?: boolean;
  onChange$?: QRL<(event: MouseEvent | KeyboardEvent) => void>;
  onClick$?: QRL<(event: MouseEvent | KeyboardEvent) => void>;
  onKeyPress$?: QRL<(event: KeyboardEvent) => void>;
  autoFocus?: boolean;
}
//
export type SwitchContextState = Omit<SwitchState, 'bind:checked'|'disabled' | 'autoFocus'> & {
  bindChecked: Signal<boolean>;
  switchRef?: Signal<HTMLInputElement | undefined>;
  disabled?: Signal<boolean | undefined>;
  autoFocus?: Signal<boolean | undefined>;
};

export const SwitchContext = createContextId<SwitchContextState>('SwitchContext');
