import {
  type QwikIntrinsicElements,
  component$,
  useSignal,
  useVisibleTask$,
  Signal,
  useStylesScoped$,
  useOn,
  $,
  useTask$,
  Slot,
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
import { isServer, isBrowser } from '@builder.io/qwik/build';

declare global {
  interface Document {
    __NEEDS_POPOVER__?: true;
  }
  interface HTMLDivElement {
    popover?: 'manual' | 'auto' | true;
  }
}

export type PopoverProps = {
  anchorRef?: Signal<HTMLElement | undefined>;
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
  gutter?: number;
  shift?: boolean;
  flip?: boolean;
  size?: boolean;
  autoPlacement?: boolean;
  hide?: 'referenceHidden' | 'escaped';
  inline?: boolean;
  transform?: string;
} & QwikIntrinsicElements['div'];

const isSupported =
  isBrowser &&
  typeof HTMLElement !== 'undefined' &&
  typeof HTMLElement.prototype === 'object' &&
  'popover' in HTMLElement.prototype;

const moduleScope: { containerDiv?: HTMLDivElement; imported?: boolean } = {};

function getPortalParent() {
  if (!moduleScope.containerDiv) {
    moduleScope.containerDiv = document.createElement('div');
    moduleScope.containerDiv.style.position = 'absolute';
    document.body.appendChild(moduleScope.containerDiv);
  }
  return moduleScope.containerDiv;
}

function getPopoverParent(floatingElement: HTMLElement) {
  const portalParent = getPortalParent();

  return isSupported ? floatingElement : portalParent;
}

export const Popover = component$(
  ({
    anchorRef,
    gutter,
    flip = true,
    placement = 'bottom-start',
    shift,
    hide,
    autoPlacement = false,
    ancestorScroll = true,
    ancestorResize = true,
    elementResize = true,
    animationFrame = false,
    transform,
    ...props
  }: PopoverProps) => {
    const base = useSignal<HTMLElement>();
    const popoverRef = useSignal<HTMLElement>();
    const popped = useSignal(false);

    useStylesScoped$(`
        [data-child] {
          margin: 0;
          padding: 0;
          position: absolute;
          border: 0;
        }
      `);

    // sets floating UI config
    useVisibleTask$(({ track, cleanup }) => {
      if (!anchorRef || !anchorRef.value) return;
      const ref = track(() => anchorRef.value)!;

      const updatePosition = () => {
        const middleware = [
          _offset(gutter),
          _hide({ strategy: hide }),
          flip && _flip(),
          shift && _shift(),
          autoPlacement && _autoPlacement(),
        ];

        computePosition(
          anchorRef?.value as ReferenceElement,
          getPopoverParent(popoverRef.value!),
          {
            placement,
            middleware,
          },
        ).then((resolvedData) => {
          if (!popoverRef.value) return;

          const { x, y } = resolvedData;

          const popoverParent = getPopoverParent(popoverRef.value);

          Object.assign(popoverParent.style, {
            left: `${x}px`,
            top: `${y}px`,
            transform,
          });

          console.log(x, y);
        });
      };

      const cleanupFunc = autoUpdate(
        ref,
        getPopoverParent(popoverRef.value!),
        updatePosition,
        {
          ancestorScroll,
          ancestorResize,
          elementResize,
          animationFrame,
        },
      );
      cleanup(cleanupFunc);
    });

    useOn(
      'qvisible',
      $(async () => {
        const isSupported =
          typeof HTMLElement !== 'undefined' &&
          typeof HTMLElement.prototype === 'object' &&
          'popover' in HTMLElement.prototype;
        console.log('POLYFILL:', !isSupported);
        if (isSupported) return;
        document.__NEEDS_POPOVER__ = true;
        if (document.querySelector('style[data-qwik-ui-popover-polyfill]')) return;
        const [{ default: css }] = await Promise.all([
          import('@oddbird/popover-polyfill/css?inline'),
          import('@oddbird/popover-polyfill'),
        ]);
        const styleNode = document.createElement('style');
        styleNode.setAttribute('data-qwik-ui-popover-polyfill', '');
        styleNode.textContent = css;
        document.head.appendChild(styleNode);
      }),
    );

    type ToggleEvent = {
      newState: string;
    };

    useTask$(({ track }) => {
      const popState = track(() => popped.value);
      if (isServer || !popState) return;
      return () => base.value?.appendChild(popoverRef.value as Node);
    });

    return (
      <div aria-hidden={true} ref={base}>
        <div
          {...props}
          onToggle$={(e: ToggleEvent) => {
            if (!document.__NEEDS_POPOVER__) {
              return;
            }

            console.log(`TOGGLE!`);
            if (e.newState === 'open') {
              const containerDiv: HTMLDivElement | null = document.querySelector(
                'div[data-qwik-ui-popover-polyfill]',
              );
              if (!containerDiv) {
                containerDiv.style.position = 'absolute';
                document.body.appendChild(containerDiv!);
              }
              containerDiv.appendChild(popoverRef.value!);
              popped.value = true;
            } else {
              base.value!.appendChild(popoverRef.value!);
              popped.value = false;
            }
          }}
          ref={popoverRef}
          popover
        >
          <Slot />
        </div>
      </div>
    );
  },
);
