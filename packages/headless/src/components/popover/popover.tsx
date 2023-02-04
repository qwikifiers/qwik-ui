import { $, component$, PropFunction, QwikMouseEvent, Slot, useClientEffect$, useContextProvider, useSignal, useStore  } from '@builder.io/qwik';
import { AlignedPlacement, autoUpdate, computePosition, flip, offset, shift, Side, } from '@floating-ui/dom';
import { PopoverContext } from './popover-context';


interface PopoverProps {
  placement?: Side | AlignedPlacement
  triggerEvent?: 'click' | 'mouseOver';
  isOpen?: boolean;
  onUpdate$?: PropFunction<(isOpen: boolean) => void>
  offset?: number;
}

export const Popover = component$((props: PopoverProps) => {
  const { triggerEvent = 'click', onUpdate$ } = props;

  const ctx = useStore({ isOpen: false, triggerEvent });
  useContextProvider(PopoverContext, ctx);

  const wrapperRef = useSignal<HTMLElement>();
  const triggerRef = useSignal<HTMLElement>();
  const contentRef = useSignal<HTMLElement>();

  /**
   * Sync openProps props with internal state
   */
  const updatePosition = $(() => {
    if (!triggerRef.value || !contentRef.value) {
      throw new Error('Popover Component must include <PopoverTrigger /> and <PopoverContent />') ;
      return;
    }

  const triggerEl: HTMLElement = triggerRef.value;
  const contentEl: HTMLElement = contentRef.value;
   return autoUpdate(triggerEl, contentEl, () => {
     computePosition(triggerEl, contentEl, {
       middleware: [flip(), shift(), offset(props.offset || 0)],
       placement: props.placement,
     })
       .then(({x, y}) => {
         Object.assign(contentEl.style, {
           left: `${x}px`,
           top: `${y}px`,
         });
       });
    })
  })

  /**
   * Popover Initialization
   */
  useClientEffect$(() => {
    triggerRef.value = wrapperRef.value?.querySelector<HTMLElement>('[role="button"]') as HTMLElement;
    contentRef.value = wrapperRef.value?.querySelector<HTMLElement>('[role="tooltip"]') as HTMLElement;
    return updatePosition()
  });

  /**
   * Sync isOpen external property with internal state
   * NOTE: useful when the popover status is controlled by the parent
   */
  useClientEffect$(({ track }) => {
    track(() => props.isOpen);
    if (props.isOpen) {
      ctx.isOpen = !!props.isOpen;
    }
  })

  /**
   * Watch isOpen state and apply CSS classes to the Popover Content
   */
  useClientEffect$(({ track }) => {
    track(() => ctx.isOpen);
    if (ctx.isOpen) {
      contentRef.value!.classList.add('open');
      contentRef.value!.classList.remove('close');
    } else {
      contentRef.value!.classList.add('close');
      contentRef.value!.classList.remove('open');
    }
  })

  /**
   * Close the popover and sync external states
   */
  const closePopover = $(async () => {
    ctx.isOpen = false
    if (onUpdate$)
      await onUpdate$(ctx.isOpen)
  })
/**
   * Open the popover and sync external states
   */
  const openPopover = $(async () => {
    ctx.isOpen = true
    if (onUpdate$)
      await onUpdate$(ctx.isOpen)
  })

  /**
   * Toggle the popover and sync external states
   */
  const togglePopover = $(async () => {
    if (ctx.isOpen) {
      closePopover()
    } else {
      openPopover();
    }

    if (onUpdate$)
      await onUpdate$(ctx.isOpen)
  })



  /**
   * The popover is toggled  when the trigger is clicked, otherwise is closed
   */
  const triggerHandler = $((e: QwikMouseEvent) => {
    const isTriggerClicked = triggerRef.value?.contains(e.target as HTMLElement);
    if (isTriggerClicked && ctx.triggerEvent === 'click') {
      togglePopover();
    } else {
      closePopover();
    }
  })

  /**
   * Check click outside of the Popover content
   */
  const clickOutsideHandler = $((e: QwikMouseEvent) => {
    const isContentClicked = contentRef.value?.contains(e.target as HTMLElement);
    if (isContentClicked) {
      return;
    }
  })

  /**
   * Document click Handler
   */
  const clickHandler = $((e: QwikMouseEvent) => {
    clickOutsideHandler(e);
    triggerHandler(e);

  })

  return (
    <div
      ref={wrapperRef}
      document:onClick$={clickHandler}
    >
      <Slot />
    </div>
  )
});
