import type { PropsOf } from '@builder.io/qwik';
import {
  component$,
  useContext,
  Slot,
  $,
  useComputed$,
  useId,
  useSignal,
  useTask$,
} from '@builder.io/qwik';
import { Toggle } from '@qwik-ui/headless';
import {
  Direction,
  Orientation,
  toggleGroupBaseContextId,
  toggleGroupValueContextId,
} from './toggle-group-context';
import { KeyCode } from '../../utils';

type NavigationKeys =
  | KeyCode.ArrowRight
  | KeyCode.ArrowLeft
  | KeyCode.ArrowDown
  | KeyCode.ArrowUp;

type Step = -1 | 0 | 1;

const keyNavigationMap: Record<
  Orientation,
  Record<Direction, Record<NavigationKeys, Step>>
> = {
  horizontal: {
    ltr: {
      ArrowRight: 1,
      ArrowLeft: -1,
      ArrowDown: 0,
      ArrowUp: 0,
    },
    rtl: {
      ArrowRight: -1,
      ArrowLeft: 1,
      ArrowDown: 0,
      ArrowUp: 0,
    },
  },
  vertical: {
    ltr: {
      ArrowDown: 1,
      ArrowUp: -1,
      ArrowRight: 0,
      ArrowLeft: 0,
    },
    rtl: {
      ArrowDown: -1,
      ArrowUp: 1,
      ArrowRight: 0,
      ArrowLeft: 0,
    },
  },
};

type ToggleGroupItemProps = PropsOf<typeof Toggle> & {
  value: string;
};

export const HToggleGroupItem = component$<ToggleGroupItemProps>((props) => {
  const { value, disabled: itemDisabled = false, ...itemProps } = props;
  const valueContext = useContext(toggleGroupValueContextId);
  const baseContext = useContext(toggleGroupBaseContextId);
  const disabled = baseContext.disabled || itemDisabled;

  const itemId = useId();

  const pressed = useComputed$(() => {
    const pressedValue = valueContext.pressedValuesSig.value;
    if (pressedValue == null) return false;

    if (typeof pressedValue === 'string') {
      return pressedValue === value;
    }
    return pressedValue.includes(value);
  });

  // const pressed = useComputed$(() => valueContext.pressedValuesSig.value.includes(value));

  const tabIndex = useComputed$(() => (pressed.value ? 0 : -1));

  const itemRef = useSignal<HTMLButtonElement>();

  useTask$(() => {
    baseContext.itemsRefs.value = baseContext.itemsRefs.value.set(itemId, itemRef);
  });

  const handlePressed$ = $((pressed: boolean) => {
    if (pressed) {
      valueContext.onItemActivate$(value);
    } else {
      valueContext.onItemDeactivate$(value);
    }
  });

  const handleKeyDownSync$ = $((event: KeyboardEvent) => {
    const isNavigationKey = (key: string): key is NavigationKeys => {
      return ['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp'].includes(key);
    };

    if (!isNavigationKey(event.key)) return;
    event.preventDefault();
  });
  // const handleKeyDownSync$ = sync$((event: KeyboardEvent) => {
  //   if (!['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp'].includes(event.key)) return;
  //   console.log('sync');
  //   event.preventDefault();
  // });
  const handleKeyDown$ = $(async (event: KeyboardEvent) => {
    //grab items by rootId
    const items = baseContext.itemsRefs.value;

    //another technique to grab items
    //   const items = Array.from(
    //     document.querySelectorAll(`.toggle-group-item-${baseContext.rootId}`),
    //   ) as HTMLElement[];
    //   // Filter out disabled items
    //   const enabledItems = items.filter((item) => item.ariaDisabled === 'false');

    if (items.size === 0) return; // Avoid errors if no items are found

    // Filter out disabled items
    const enabledItems = Array.from(items.values()).filter(
      (item) => item.value.ariaDisabled === 'false',
    );

    //each item has an id (see below the Toggle JSX output)
    const currentElement = event.target as HTMLElement;
    const currentIndex = enabledItems.findIndex((e) => e.value.id === currentElement.id);

    if (currentIndex === -1) return;

    //read the direction for the key based on the orientation
    const direction =
      keyNavigationMap[baseContext.orientation][baseContext.direction][
        event.key as NavigationKeys
      ];

    //find and nextFocus
    if (direction !== 0) {
      let nextIndex = currentIndex + direction;
      if (baseContext.loop) {
        // If looping is enabled, wrap around, skipping disabled items
        nextIndex =
          (currentIndex + direction + enabledItems.length) % enabledItems.length;
      } else {
        // If looping is disabled, clamp to valid indices
        if (nextIndex >= enabledItems.length) nextIndex = enabledItems.length - 1;
        if (nextIndex < 0) nextIndex = 0;
      }
      enabledItems[nextIndex]?.value.focus();
    }
  });

  return (
    <Toggle
      ref={itemRef}
      {...itemProps}
      pressed={pressed.value}
      disabled={disabled}
      onPressedChange$={handlePressed$}
      onKeyDown$={[handleKeyDownSync$, handleKeyDown$]}
      class={`toggle-group-item-${baseContext.rootId} gap-2 ${props.class}`}
      id={itemId}
      tabIndex={tabIndex.value}
      aria-orientation={baseContext.orientation}
      dir={baseContext.direction}
      data-qui-togglegroup-item
    >
      <Slot />
    </Toggle>
  );
});
