import {
  component$,
  useContext,
  useVisibleTask$,
  type QwikIntrinsicElements,
  QRL,
} from '@builder.io/qwik';

import {
  ReferenceElement,
  autoUpdate,
  computePosition,
  offset as _offset,
  flip as _flip,
  shift as _shift,
  autoPlacement as _autoPlacement,
  hide as _hide,
} from '@floating-ui/dom';

import { JSX } from '@builder.io/qwik/jsx-runtime';

// FULL FloatingUI integration. DONT REMOVE ANY COMMENTED LINES.
// import type {
//   ShiftOptions,
//   OffsetOptions,
//   ArrowOptions,
//   FlipOptions,
//   SizeOptions,
//   AutoPlacementOptions,
//   HideOptions,
//   InlineOptions,
// } from '@floating-ui/core';

// full API middleware
// offset?: OffsetOptions;
// shift?: Partial<ShiftOptions & DetectOverflowOptions> | boolean;
// flip?: FlipOptions | boolean;
// arrow?: ArrowOptions;
// size?: SizeOptions;
// autoPlacement?: AutoPlacementOptions | boolean;
// hide?: HideOptions | boolean;
// inline?: InlineOptions | boolean;
// onPositionComputed?: (resolvedData: ComputePositionReturn) => void;

import ComboboxContextId from './combobox-context-id';
import type { ComboboxContext, Option } from './combobox-context.type';
import { ResolvedOption } from './combobox';

export type ComboboxListboxProps<O extends Option = Option> = {
  optionRenderer$?: QRL<
    (resolved: ResolvedOption<O>, filteredIndex: number) => JSX.Element
  >;

  // main floating UI props
  placement?: 'top' | 'bottom' | 'right' | 'left';
  ancestorScroll?: boolean;
  ancestorResize?: boolean;
  elementResize?: boolean;
  layoutShift?: boolean;
  animationFrame?: boolean;

  // middleware
  gutter?: number;
  shift?: boolean;
  flip?: boolean;
  size?: boolean;
  autoPlacement?: boolean;
  hide?: 'referenceHidden' | 'escaped';
  inline?: boolean;

  // misc
  transform?: string;
} & QwikIntrinsicElements['ul'];

export const ComboboxListbox = component$(
  <O extends Option = Option>({
    optionRenderer$,
    gutter,
    flip = true,
    placement = 'bottom',
    shift,
    hide,
    autoPlacement = false,
    ancestorScroll = true,
    ancestorResize = true,
    elementResize = true,
    animationFrame = false,
    transform,
    ...props
  }: ComboboxListboxProps<O>) => {
    const context = useContext<ComboboxContext<O>>(ComboboxContextId);
    const listboxId = `${context.localId}-listbox`;

    useVisibleTask$(function setFloatingUIConfig({ cleanup }) {
      function updatePosition() {
        // const middleware = [_offset(offset), arrow && _arrow(arrow), size && _size(size)];
        const middleware = [_offset(gutter), _hide({ strategy: hide })];

        const middlewareFunctions = [_flip, _shift, _autoPlacement];
        const middlewareProps = [flip, shift, autoPlacement];

        middlewareFunctions.forEach((func, index) => {
          const isMiddlewareEnabled = middlewareProps[index];

          // non-commented push is boolean, no option property customization.
          if (isMiddlewareEnabled) {
            middleware.push(func());

            // commented ternary offers a bool to turn on or off default config, or customize it.
            // const middlewareConfig =
            //   isMiddlewareEnabled === true ? undefined : isMiddlewareEnabled;
            // middleware.push(func(middlewareConfig));
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
          // if (onPositionComputed) {
          //   onPositionComputed(resolvedData);
          // }
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
        style={{ ...(props.style as object), position: 'absolute' }}
      >
        {context.filteredOptionsSig.value.map((resolved, filteredIndex) =>
          optionRenderer$?.(resolved, filteredIndex),
        )}
      </ul>
    );
  },
);
