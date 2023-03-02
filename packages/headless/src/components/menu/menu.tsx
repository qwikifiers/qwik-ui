import {
  $,
  component$,
  createContextId,
  QRL,
  QwikKeyboardEvent,
  Signal,
  Slot,
  useBrowserVisibleTask$,
  useContext,
  useContextProvider,
  useId,
  useOnWindow,
  useSignal,
  useStore,
} from '@builder.io/qwik';
import { JSX } from '@builder.io/qwik/jsx-runtime';
import { clsq } from '@qwik-ui/shared';
import { Button } from '@qwik-ui/primitives';

interface MenuProps {
  class?: string;
  isExpanded?: boolean;
  triggerElement?: string | JSX.Element;
}

interface MenuContextService {
  currentId: Signal<string>;
}

const MENU_CONTEXT_NAME = 'qui-menu';
export const quiMenuContext =
  createContextId<MenuContextService>(MENU_CONTEXT_NAME);

export enum KEYBOARD_KEY_NAME {
  ARROW_UP = 'ArrowUp',
  ARROW_DOWN = 'ArrowDown',
  ESCAPE = 'Escape',
}

export enum CSS_CLASS_NAMES {
  IS_EXPANDED = 'quiIsExpanded',
  IS_FOCUSED = 'quiIsFocused',
  IS_HOVERED = 'quiIsHovered',
}

export const Menu = component$((props: MenuProps) => {
  const parentId = useId();
  const childId = useId();
  const isExpanded = useSignal<boolean>(props?.isExpanded || false);
  const isHovered = useSignal(false);
  const container = useSignal<HTMLElement>();
  const children = useStore<HTMLElement[]>([]);
  const currentButtonInFocusIndex = useSignal<number>(-1);
  const triggerElementRef = useSignal<HTMLElement>();
  const currentId = useSignal<string>('');

  const menuContextService: MenuContextService = {
    currentId,
  };

  useContextProvider(quiMenuContext, menuContextService);

  useBrowserVisibleTask$(({ track }) => {
    track(() => isExpanded.value);
    if (!isExpanded.value) {
      currentButtonInFocusIndex.value = -1;
      currentId.value = '';
    }
  });

  useBrowserVisibleTask$(() => {
    const options = container.value?.querySelectorAll<HTMLElement>('button');
    if (options?.length) {
      options.forEach((option) => children.push(option));
    }
  });

  useOnWindow(
    'click',
    $((event) => {
      const target = event.target as HTMLElement;
      if (isExpanded.value && target !== triggerElementRef.value) {
        isExpanded.value = false;
      }
    })
  );

  return (
    <div
      id={parentId}
      class={clsq(props.class, {
        [CSS_CLASS_NAMES.IS_EXPANDED]: isExpanded.value,
        [CSS_CLASS_NAMES.IS_HOVERED]: isHovered.value,
      })}
      onMouseEnter$={() => (isHovered.value = true)}
      onMouseLeave$={() => (isHovered.value = false)}
      onKeyDown$={(event: QwikKeyboardEvent) => {
        if (event.key === KEYBOARD_KEY_NAME.ESCAPE && isExpanded.value) {
          isExpanded.value = false;
          triggerElementRef.value?.focus();
          return;
        }
        if (
          event.key === KEYBOARD_KEY_NAME.ARROW_DOWN ||
          event.key === KEYBOARD_KEY_NAME.ARROW_UP
        ) {
          let idx = currentButtonInFocusIndex.value;
          if (event.key === KEYBOARD_KEY_NAME.ARROW_DOWN) {
            idx = currentButtonInFocusIndex.value + 1;
            if (idx >= children.length) {
              idx = 0;
            }
          } else if (event.key === KEYBOARD_KEY_NAME.ARROW_UP) {
            idx = currentButtonInFocusIndex.value - 1;
            if (idx < 0) {
              idx = children.length - 1;
            }
          }
          children[idx].focus();
          currentId.value = children[idx].id;
          currentButtonInFocusIndex.value = idx;
        }
      }}
    >
      <Button
        ref={triggerElementRef}
        aria-haspopup
        aria-expanded={isExpanded.value}
        aria-controls={isExpanded.value ? childId : ''}
        onClick$={() => (isExpanded.value = !isExpanded.value)}
      >
        {props.triggerElement || 'Menu'}
      </Button>
      <nav
        id={childId}
        role="menu"
        aria-labelledby={parentId}
        ref={container}
        style={{ visibility: isExpanded.value ? 'visible' : 'hidden' }}
      >
        <Slot />
      </nav>
    </div>
  );
});

interface MenuItemProps {
  class?: string;
  disabled?: boolean;
  onClick$?: QRL;
}

export const MenuItem = component$((props: MenuItemProps) => {
  const myId = useId();
  const contextService = useContext(quiMenuContext);
  const isFocused = contextService.currentId.value === myId;

  return (
    <div class={props.class}>
      {props.onClick$ ? (
        <Button
          tabIndex={-1}
          id={myId}
          class={clsq({
            [CSS_CLASS_NAMES.IS_FOCUSED]: isFocused,
          })}
          onClick$={props.onClick$}
          disabled={props.disabled || false}
        >
          <Slot />
        </Button>
      ) : (
        <Slot />
      )}
    </div>
  );
});
