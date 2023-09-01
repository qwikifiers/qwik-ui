import {
  component$,
  useContext,
  useVisibleTask$,
  type QwikIntrinsicElements,
} from '@builder.io/qwik';
import {
  ReferenceElement,
  arrow,
  autoUpdate,
  computePosition,
  flip,
  offset,
  shift,
} from '@floating-ui/dom';
import ComboboxContextId from './combobox-context-id';
import type { ComboboxContext, Option } from './combobox-context.type';

// type ArrowData = { element: HTMLElement; padding?: number | undefined };

export type ComboboxListboxProps = {
  // come back to shift later
  arrowData?: { element: HTMLElement; padding?: number | undefined };
  setArrow?: boolean;
  setShift?: {
    mainAxis?: boolean;
    crossAxis?: boolean;
    limiter?: {
      fn: (state: unknown) => unknown;
      options?: unknown;
    };
  };
  setOffset?:
    | number
    | {
        mainAxis?: number;
        crossAxis?: number;
        alignmentAxis?: number | null;
      };
  setFlip?: boolean;
  placement?:
    | 'top'
    | 'top-start'
    | 'top-end'
    | 'right'
    | 'right-start'
    | 'right-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end'
    | 'left'
    | 'left-start'
    | 'left-end';
  ancestorScroll?: boolean;
  ancestorResize?: boolean;
  elementResize?: boolean;
  layoutShift?: boolean;
  animationFrame?: boolean;
} & QwikIntrinsicElements['ul'];

export const ComboboxListbox = component$(
  <O extends Option = Option>({
    setOffset,
    setFlip = true,
    placement = 'bottom',
    setShift,
    setArrow,
    arrowData,
    ancestorScroll = true,
    ancestorResize = true,
    elementResize = true,
    animationFrame = false,
    ...props
  }: ComboboxListboxProps) => {
    const context = useContext<ComboboxContext<O>>(ComboboxContextId);
    const listboxId = `${context.localId}-listbox`;

    useVisibleTask$(function setListboxPosition({ cleanup }) {
      // Our settings from Floating UI
      function updatePosition() {
        const middleware = [offset(setOffset), setFlip && flip(), setShift && shift()];

        if (setArrow && arrowData) {
          middleware.push(arrow(arrowData));
        }

        computePosition(
          context.inputRef.value as ReferenceElement,
          context.listboxRef.value as HTMLElement,
          {
            placement: placement,
            middleware: middleware,
          },
        ).then(({ x, y }) => {
          if (context.listboxRef.value) {
            Object.assign(context.listboxRef.value.style, {
              left: `${x}px`,
              top: `${y}px`,
            });
          }
        });
      }

      if (context.inputRef.value && context.listboxRef.value) {
        updatePosition();

        const cleanupFunc = autoUpdate(
          context.inputRef.value,
          context.listboxRef.value,
          updatePosition,
          {
            ancestorScroll: ancestorScroll,
            ancestorResize: ancestorResize,
            elementResize: elementResize,
            animationFrame: animationFrame,
          },
        );

        cleanup(() => {
          cleanupFunc();
        });
      }
    });

    return (
      <ul
        {...props}
        id={listboxId}
        ref={context.listboxRef}
        aria-label={
          context.labelRef.value
            ? context.labelRef.value?.innerText
            : context.inputRef.value?.value
        }
        role="listbox"
        hidden={!context.isListboxOpenSig.value}
        style={{ ...(props.style as object), position: 'absolute' }}
      >
        {context.filteredOptionsSig.value.map((resolved, filteredIndex) =>
          context.renderOption$?.(resolved, filteredIndex),
        )}
      </ul>
    );
  },
);
