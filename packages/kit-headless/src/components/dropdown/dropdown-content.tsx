import {
  component$,
  useStyles$,
  useTask$,
  Slot,
  type PropsOf,
  useContext,
  $,
} from '@builder.io/qwik';
import { dropdownContextId } from './dropdown-context';
import styles from './dropdown.css?inline';
import { isServer } from '@builder.io/qwik/build';

type DropdownContentProps = PropsOf<'div'>;

export const HDropdownContent = component$<DropdownContentProps>((props) => {
  useStyles$(styles);

  const context = useContext(dropdownContextId);
  const contentId = `${context.localId}-content`;

  const isOutside = $((rect: DOMRect, x: number, y: number) => {
    return x < rect.left || x > rect.right || y < rect.top || y > rect.bottom;
  });

  const handleDismiss$ = $(async (e: PointerEvent) => {
    if (!context.isOpenSig.value) {
      return;
    }

    if (!context.contentRef.value || !context.triggerRef.value) {
      return;
    }

    const contentRect = context.contentRef.value.getBoundingClientRect();
    const triggerRect = context.triggerRef.value.getBoundingClientRect();
    const { clientX, clientY } = e;

    const isOutsideContent = await isOutside(contentRect, clientX, clientY);
    const isOutsideTrigger = await isOutside(triggerRect, clientX, clientY);

    if (isOutsideContent && isOutsideTrigger) {
      context.isOpenSig.value = false;
    }
  });

  // Dismiss code should only matter when the content is open
  useTask$(({ track, cleanup }) => {
    track(() => context.isOpenSig.value);

    if (isServer) return;

    if (context.isOpenSig.value) {
      window.addEventListener('pointerdown', handleDismiss$);
    }

    cleanup(() => {
      window.removeEventListener('pointerdown', handleDismiss$);
    });
  });

  return (
    <div
      data-content
      {...props}
      id={contentId}
      role="content"
      ref={context.contentRef}
      data-open={context.isOpenSig.value ? true : undefined}
      data-closed={!context.isOpenSig.value ? true : undefined}
    >
      <Slot />
    </div>
  );
});
