import { $, PropsOf, Slot, component$, useContext, useOnWindow } from '@builder.io/qwik';
import { collapsibleContextId } from './collapsible-context-id';

export const CollapsibleTrigger = component$<PropsOf<'button'>>(
  ({ onClick$, ...props }) => {
    const context = useContext(collapsibleContextId);
    const contentId = `${context.itemId}-content`;

    const handleClick$ = $(async () => {
      setTimeout(() => {
        context.isOpenSig.value = !context.isOpenSig.value;
      }, 1);

      context.initialStateSig.value = false;
    });

    useOnWindow('resize', context.getContentDimensions$);

    return (
      <button
        {...props}
        ref={context.triggerRef}
        data-state={
          context.initialStateSig.value
            ? 'initial'
            : context.isOpenSig.value
            ? 'open'
            : 'closed'
        }
        aria-expanded={context.isOpenSig.value}
        aria-controls={contentId}
        onClick$={[context.getContentDimensions$, handleClick$, onClick$]}
      >
        <Slot />
      </button>
    );
  },
);
