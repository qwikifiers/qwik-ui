import { component$, Slot, useSignal } from '@builder.io/qwik';

export interface CollapseProps {
  class?: string;
  label: string;
}

export type CollapseState = 'open' | 'closed' | 'closing';

export const Collapse = component$((props: CollapseProps) => {
  return <div></div>;
});
