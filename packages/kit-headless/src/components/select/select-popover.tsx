import { component$, useContext, Slot, useTask$ } from '@builder.io/qwik';
import { Popover, usePopover } from '../popover';

import SelectContextId from './select-context';
import { type FloatingProps } from '../popover/floating';
import { type PopoverImplProps } from '../popover/popover-impl';
import { isServer } from '@builder.io/qwik/build';

export const SelectPopover = component$(
  (props: Partial<FloatingProps & PopoverImplProps>) => {
    const context = useContext(SelectContextId);
    const popoverId = `${context.localId}-popover`;
    const { showPopover, hidePopover } = usePopover(popoverId);

    useTask$(async ({ track }) => {
      track(() => context.isListboxOpenSig.value);

      if (isServer) return;

      if (context.isListboxOpenSig.value) {
        await showPopover();
      } else {
        await hidePopover();
      }
    });

    return (
      <Popover
        {...props}
        id={popoverId}
        floating={true}
        anchorRef={context.triggerRef}
        ref={context.popoverRef}
        class={['listbox', props.class]}
        manual
        data-state={context.isListboxOpenSig.value ? 'open' : 'closed'}
      >
        <Slot />
      </Popover>
    );
  },
);
