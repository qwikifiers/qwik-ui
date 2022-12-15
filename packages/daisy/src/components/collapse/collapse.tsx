import { component$, Slot, useSignal } from '@builder.io/qwik';
import { Collapse as HeadlessCollapse } from '@qwik-ui/headless';
export interface CollapseProps {
  label: string;
  class?: string;
  showArrow?: boolean;
  showPlus?: boolean;
}

export type CollapseState = 'open' | 'closed' | 'closing';

export const Collapse = component$(
  ({ showArrow = false, showPlus = false, ...props }: CollapseProps) => {
    return (
      <HeadlessCollapse
        class={`collapse border border-base-300 bg-base-100 rounded-box 
    ${showArrow && !showPlus && 'collapse-arrow'} 
    ${showPlus && !showArrow && 'collapse-plus'}`}
        {...props}
      >
        <Slot />
      </HeadlessCollapse>
    );
  }
);
