import { component$, Slot } from '@builder.io/qwik';
import { Collapse as HeadlessCollapse } from '@qwik-ui/headless';
export interface CollapseProps {
  class?: string;
  showArrow?: boolean;
  showPlus?: boolean;
}

export type CollapseState = 'open' | 'closed' | 'closing';

export const Collapse = component$(
  ({ showArrow = false, showPlus = false, ...props }: CollapseProps) => {
    return (
      <HeadlessCollapse
        class={`border-base-300 rounded-box collapse border 
                        ${showArrow && !showPlus && 'collapse-arrow'} 
                        ${showPlus && !showArrow && 'collapse-plus'}`}
        {...props}
      >
        <span class="collapse-title text-xl font-medium" q:slot="label">
          <Slot name="label" />
        </span>
        <span class="collapse-content max-h-fit" q:slot="content">
          <Slot name="content" />
        </span>
      </HeadlessCollapse>
    );
  },
);
