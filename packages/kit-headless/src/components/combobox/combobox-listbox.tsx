import {
  component$,
  useContext,
  useVisibleTask$,
  type QwikIntrinsicElements,
} from '@builder.io/qwik';

import {
  ReferenceElement,
  autoUpdate,
  computePosition,
  offset as _offset,
  flip as _flip,
  shift as _shift,
  arrow as _arrow,
  size as _size,
  autoPlacement as _autoPlacement,
  hide as _hide,
  inline as _inline,
  type Placement,
  type DetectOverflowOptions,
  type ComputePositionReturn,
} from '@floating-ui/dom';

import type {
  ShiftOptions,
  OffsetOptions,
  ArrowOptions,
  FlipOptions,
  SizeOptions,
  AutoPlacementOptions,
  HideOptions,
  InlineOptions,
} from '@floating-ui/core';

import ComboboxContextId from './combobox-context-id';
import type { ComboboxContext, Option } from './combobox-context.type';

export type ComboboxListboxProps = {
  // main floating UI props
  placement?: Placement;
  ancestorScroll?: boolean;
  ancestorResize?: boolean;
  elementResize?: boolean;
  layoutShift?: boolean;
  animationFrame?: boolean;

  // middleware
  offset?: OffsetOptions;
  shift?: Partial<ShiftOptions & DetectOverflowOptions> | boolean;
  flip?: FlipOptions | boolean;
  arrow?: ArrowOptions;
  size?: SizeOptions;
  autoPlacement?: AutoPlacementOptions | boolean;
  hide?: HideOptions | boolean;
  inline?: InlineOptions | boolean;
  onPositionComputed?: (resolvedData: ComputePositionReturn) => void;

  // misc
  transform?: string;
} & QwikIntrinsicElements['ul'];

export const ComboboxListbox = component$(
  <O extends Option = Option>({
    offset,
    flip = true,
    placement = 'bottom',
    shift,
    arrow,
    size,
    hide,
    inline,
    autoPlacement = false,
    ancestorScroll = true,
    ancestorResize = true,
    elementResize = true,
    animationFrame = false,
    onPositionComputed,
    transform,
    ...props
  }: ComboboxListboxProps) => {
    const context = useContext<ComboboxContext<O>>(ComboboxContextId);
    const listboxId = `${context.localId}-listbox`;

    useVisibleTask$(function setFloatingUIConfig({ cleanup }) {
      function updatePosition() {
        const middleware = [_offset(offset), arrow && _arrow(arrow), size && _size(size)];

        // offers a bool to turn on or off default config, or customize it.
        const middlewareFunctions = [_flip, _shift, _autoPlacement, _hide, _inline];
        const middlewareProps = [flip, shift, autoPlacement, hide, inline];

        middlewareFunctions.forEach((func, index) => {
          const isMiddlewareEnabled = middlewareProps[index];

          if (isMiddlewareEnabled) {
            const middlewareConfig =
              isMiddlewareEnabled === true ? undefined : isMiddlewareEnabled;
            middleware.push(func(middlewareConfig));
          }
        });

        computePosition(
          context.inputRef.value as ReferenceElement,
          context.listboxRef.value as HTMLElement,
          {
            placement,
            middleware,
          },
        ).then((resolvedData) => {
          const { x, y } = resolvedData;
          if (context.listboxRef.value) {
            Object.assign(context.listboxRef.value.style, {
              left: `${x}px`,
              top: `${y}px`,
              transform,
            });
          }

          // user-provided resolved code
          if (onPositionComputed) {
            onPositionComputed(resolvedData);
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
            ancestorScroll,
            ancestorResize,
            elementResize,
            animationFrame,
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
          context.labelRef.value ? context.labelRef.value?.innerText : 'Suggestions'
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
