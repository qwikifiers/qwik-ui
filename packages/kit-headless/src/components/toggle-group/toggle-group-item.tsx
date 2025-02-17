import type { PropsOf } from '@builder.io/qwik';
import {
  component$,
  useContext,
  Slot,
  $,
  useId,
  useSignal,
  useTask$,
} from '@builder.io/qwik';
import { isBrowser, isServer } from '@builder.io/qwik/build';

import {
  Direction,
  Item,
  Orientation,
  toggleGroupRootApiContextId,
} from './toggle-group-context';
import { Toggle } from '../toggle';
import { KeyCode } from '../../utils/key-code.type';

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

  const rootApiContext = useContext(toggleGroupRootApiContextId);

  const disabled = rootApiContext.rootIsDisabled || itemDisabled;

  const itemId = useId();
  const isPressedSig = useSignal(false);
  const itemRef = useSignal<HTMLButtonElement>();
  const itemTabIndex = useSignal(isPressedSig.value ? 0 : -1);

  const itemSig = useSignal<Item>(() => ({
    itemId: itemId,
    isPressed: isPressedSig,
    isDisabled: disabled,
    ref: itemRef,
    tabIndex: itemTabIndex,
  }));

  useTask$(async ({ track }) => {
    const pressedValue = track(() => rootApiContext.pressedValuesSig.value);

    if (pressedValue == null) {
      itemSig.value.isPressed.value = false;
      return;
    }

    if (typeof pressedValue === 'string') {
      itemSig.value.isPressed.value = pressedValue === value;
    } else {
      itemSig.value.isPressed.value = pressedValue.includes(value);
    }
  });

  //Item instantiation
  useTask$(async () => {
    /*
    Instatiation of items with their itemIds
    Attention: in CSR, items are registered "out of order" (itemId generation)
    you can notice:
    - the first itemId "generate" before the useTask is wrong
    - the itemId read within this useTask is not the same as the one read locally.

    Still, the order how items render is correct.

    So we doing stuff on the client (CSR, onKeyDown, etc) 
    we can't use rootApiContext.getAllItem$() as we get Items "out of order").
    Perhaps this can be fix in v2?

    Solution: if we want to get the list of items in order, we need to use "refs" directly.
    Meaning we need to use this api:  rootApiContext.itemsCSR
    */

    //Note: this line execute X times in a row. (X = number of items)
    await rootApiContext.registerItem$(itemId, itemSig);

    //setup the tabIndex for each item
    const allItems = await rootApiContext.getAllItem$();

    if (isBrowser) return;

    //ensure each pressedItems have tabIndex = 0
    const currentPressedItems = allItems.filter((item) => item.isPressed.value === true);

    if (currentPressedItems.length > 0) {
      return currentPressedItems.forEach(async (item) => {
        await rootApiContext.getAndSetTabIndexItem$(item.itemId, 0);
      });
    }

    //ensure the first item that is not disabled have tabIndex = 0
    const firstNotDisabledItem = allItems.find((item) => item.isDisabled === false);

    if (firstNotDisabledItem !== undefined) {
      await rootApiContext.getAndSetTabIndexItem$(firstNotDisabledItem.itemId, 0);
    }
  });

  //instantiate setTabIndex for CSR
  useTask$(async ({ track }) => {
    if (isServer) return;
    track(() => itemRef.value);

    //register refs to the Root
    if (!itemRef.value) return;
    rootApiContext.itemsCSR.value = [...rootApiContext.itemsCSR.value, itemRef.value];

    if (
      rootApiContext.itemsCSR.value.length === (await rootApiContext.getAllItem$()).length
    ) {
      const allItems = rootApiContext.itemsCSR.value;

      //ensure each pressedItems have tabIndex = 0
      const currentPressedItems = allItems.filter((item) => item.ariaPressed === 'true');

      if (currentPressedItems.length > 0) {
        return currentPressedItems.forEach(async (item) => {
          const itemRef = allItems.find((i) => i.id === item.id);
          if (!itemRef) throw 'Item Not Found';
          itemRef.tabIndex = 0;
        });
      }

      //ensure the first item that is not disabled have tabIndex = 0
      const firstNotDisabledItem = allItems.find((item) => item.ariaDisabled === 'false');

      if (firstNotDisabledItem !== undefined) {
        firstNotDisabledItem.tabIndex = 0;
      }
    }
  });

  const handlePressed$ = $((pressed: boolean) => {
    if (pressed) {
      rootApiContext.activateItem$(value);
    } else {
      rootApiContext.deActivateItem$(value);
    }
  });

  const handleKeyDown$ = $(async (event: KeyboardEvent) => {
    //Note: here we can't use use rootApiContext.items.value as when instantiante its []
    //we might need to make a QRL same as "rootApiContext.getAllItems$()"
    const items = Array.from(
      document.querySelectorAll(`.toggle-group-item-${rootApiContext.rootId}`),
    ) as HTMLElement[];

    if (items.length === 0) return;

    const enabledItems = items.filter((item) => item.ariaDisabled === 'false');
    //each item has an id (see below the Toggle JSX output)
    const currentElement = event.target as HTMLElement;
    const currentIndex = enabledItems.findIndex((e) => e.id === currentElement.id);

    if (currentIndex === -1) return;

    //read the direction for the key based on the orientation
    const direction =
      keyNavigationMap[rootApiContext.rootOrientation][rootApiContext.rootDirection][
        event.key as NavigationKeys
      ];

    //find and nextFocus
    if (direction !== 0) {
      let nextIndex = currentIndex + direction;
      if (rootApiContext.rootIsLoopEnabled) {
        // If looping is enabled, wrap around, skipping disabled items
        nextIndex =
          (currentIndex + direction + enabledItems.length) % enabledItems.length;
      } else {
        // If looping is disabled, clamp to valid indices
        if (nextIndex >= enabledItems.length) nextIndex = enabledItems.length - 1;
        if (nextIndex < 0) nextIndex = 0;
      }
      enabledItems[nextIndex]?.focus();
    }
  });

  return (
    <Toggle
      ref={itemRef}
      {...itemProps}
      bind:pressed={itemSig.value.isPressed}
      disabled={disabled}
      onPressedChange$={handlePressed$}
      onKeyDown$={handleKeyDown$}
      class={`toggle-group-item-${rootApiContext.rootId} ${props.class}`}
      id={itemId}
      tabIndex={itemSig.value.tabIndex.value}
      aria-orientation={rootApiContext.rootOrientation}
      dir={rootApiContext.rootDirection}
      data-qui-togglegroup-item
    >
      <Slot />
    </Toggle>
  );
});
