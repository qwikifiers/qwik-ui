import {
  $,
  component$,
  createContext,
  QwikKeyboardEvent,
  Signal,
  Slot,
  useClientEffect$,
  useContext,
  useContextProvider,
  useId,
  useSignal, useStore,
} from '@builder.io/qwik';
import { JSX } from '@builder.io/qwik/jsx-runtime';

//import { Button } from '../button/button';

interface MenuProps {
  isOpen?: boolean;
  class?: string;
  triggerElement?: string | JSX.Element;
}

export const quiMenuContext = createContext('qui-menu');

export const Menu = component$((props: MenuProps) => {
  const parentId = useId();
  const childId = useId();
  const triggerId = useId();
  const isOpen = useSignal(props?.isOpen || false);
  const container = useSignal<HTMLElement>();
  const children = useSignal([]);
  const currentButtonInFocusIndex = useSignal(-1);
  const triggerElementRef = useSignal<HTMLElement>();
  const currentId = useSignal('');

  const registerSelf = $((ref: Signal<HTMLElement | undefined>) => {
    if (ref) {
      children.value.push(ref);
    }
    console.log(children.value.map((item) => item.value.id).join(', '));
  });

  useContextProvider(quiMenuContext, {
    registerSelf,
    currentId,
  });

  useClientEffect$(({ track }) => {
    track(() => isOpen.value);
    triggerElementRef.value.focus();
    if (isOpen.value === false) {
      currentButtonInFocusIndex.value = -1;
      currentId.value = '';
    }
  });

  return (
    <div
      style={{ marginTop: '100px' }}
      class={props.class ? props.class : ''}
      id={parentId}
      onKeyDown$={(event: QwikKeyboardEvent) => {
        if (event.key === 'Escape' && isOpen.value === true) {
          isOpen.value = false;
          return;
        }
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
          let idx;
          if (event.key === 'ArrowDown') {
            idx = currentButtonInFocusIndex.value + 1;
            if (idx >= children.value.length) {
              idx = 0;
            }
          } else if (event.key === 'ArrowUp') {
            idx = currentButtonInFocusIndex.value - 1;
            if (idx < 0) {
              idx = children.value.length - 1;
            }
          }
          children.value[idx].value.focus();
          currentId.value = children.value[idx].value.id;
          currentButtonInFocusIndex.value = idx;
        }
      }}
    >
      <button
        id={triggerId}
        aria-haspopup
        aria-expanded={isOpen.value}
        aria-controls={isOpen.value ? childId : null}
        ref={triggerElementRef}
        onClick$={() => {
          isOpen.value = !isOpen.value;
        }}

        /*document:onClick$={(event) => {
          if (event.target.id !== triggerId && isOpen.value === true) {
            isOpen.value = false;
          }
        }}*/
      >
        {props.triggerElement || 'Menu'}
      </button>
      {isOpen.value && (
        <nav
          id={childId}
          role="menu"
          aria-labelledby={parentId}
          ref={container}
          style={{ visibility: isOpen.value ? 'visible' : 'hidden' }}
        >
          <Slot {...props} />
        </nav>
      )}
    </div>
  );
});

interface MenuItemProps {
  class?: string;
  onClick$?: any;
  id?: any;
}

export const MenuItem = component$((props: MenuItemProps) => {
  const contextService = useContext(quiMenuContext);
  const ref = useSignal<HTMLElement>();
  const myId = useId();
  const isFocused = contextService.currentId.value === myId;

  useClientEffect$(() => {
    contextService?.registerSelf(ref);
    //console.log('called in useClientEffect$ for ', myId);
  });

  return (
    <div class={props.class ? props.class : ''}>
      {props.onClick$ ? (
        <button
          class={isFocused ? 'quiIsFocused' : ''}
          tabIndex={-1}
          id={myId}
          ref={ref}
          onClick$={props.onClick$}
        >
          <Slot />
          {' - '}
          {myId} {/*isFocused ? ' - i am focused' : ''*/}
        </button>
      ) : (
        <Slot />
      )}
    </div>
  );
});
