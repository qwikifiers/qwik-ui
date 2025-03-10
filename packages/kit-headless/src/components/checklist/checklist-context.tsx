import { createContextId, type Signal } from '@qwik.dev/core';

export interface ChecklistState {
  items: Signal<boolean[]>;
  // toggleItem: (index: number) => void;
  allSelected: Signal<boolean>;
  toggleAllSelected: () => void;
  indeterminate: Signal<boolean>;
  initialStates: boolean[];
}

export const ChecklistContext = createContextId<ChecklistState>('ChecklistContext');
