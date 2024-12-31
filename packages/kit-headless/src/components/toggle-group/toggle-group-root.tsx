import type { PropsOf, QRL, Signal } from '@builder.io/qwik';
import {
  component$,
  useContextProvider,
  Slot,
  useTask$,
  $,
  useStyles$,
} from '@builder.io/qwik';
import {
  toggleGroupRootApiContextId,
  type Direction,
  type Orientation,
  type ToggleGroupRootApiContext,
} from './toggle-group-context';
import { useToggleGroup } from './use-toggle';
import { isBrowser, isServer } from '@builder.io/qwik/build';
import styles from './toggle-group.css?inline';

export type ToggleGroupBaseProps = {
  /**
   * When true, prevents the user from interacting with the toggle group and all its items.
   */
  disabled?: boolean;
};

type ToggleGroupNavigationProps = {
  /**
   * The orientation of the component, which determines how focus moves:
   * horizontal for left/right arrows and vertical for up/down arrows.
   * Default to (left-to-right) reading mode.
   */
  orientation?: Orientation;
  /**
   * The reading direction of the toggle group.
   * Default to (left-to-right) reading mode.
   */
  direction?: Direction;
  /**
   * When true
   * keyboard navigation will loop from last item to first, and vice versa.
   */
  loop?: boolean;
};

export type ToggleGroupSingleProps = {
  /**
   * Determines if multi selection is enabled.
   */
  multiple?: false;
  /**
   * The initial value of the pressed item (uncontrolled).
   * Can be used in conjunction with onChange$.
   */
  value?: string;

  /**
   * The callback that fires when the value of the toggle group changes.
   * Event handler called when the pressed state of an item changes.
   */
  onChange$?: QRL<(value: string) => void>;
  /**
   * The reactive value (a signal) of the pressed item (the signal is the controlled value).
   * Controlling the pressed state with a bounded value.
   */
  'bind:value'?: Signal<string>;
};

export type ToggleGroupMultipleProps = {
  /**
   * Determines if multi selection is enabled.
   */
  multiple?: true;
  /**
   * The initial value of the pressed item (uncontrolled).
   * Can be used in conjunction with onChange$.
   */
  value?: string[];
  /**
   * The callback that fires when the value of the toggle group changes.
   * Event handler called when the pressed state of an item changes.
   */
  onChange$?: QRL<(value: string[]) => void>;
  /**
   * The reactive value (a signal) of the pressed item (the signal is the controlled value).
   * Controlling the pressed state with a bounded value.
   */
  'bind:value'?: Signal<string[]>;
};

export type ToggleGroupApiProps = (ToggleGroupSingleProps | ToggleGroupMultipleProps) &
  ToggleGroupBaseProps &
  ToggleGroupNavigationProps;

export type ToggleGroupRootProps = PropsOf<'div'> & ToggleGroupApiProps;

export const HToggleGroupRoot = component$<ToggleGroupRootProps>((props) => {
  useStyles$(styles);
  const {
    onChange$: _,
    disabled = false,
    orientation = 'horizontal',
    direction = 'ltr',
    loop = false,
    ...divProps
  } = props;

  const commonProps = { role: 'group', 'aria-orientation': orientation, dir: direction };

  const api = useToggleGroup(props);

  const rootApiContext: ToggleGroupRootApiContext = {
    rootId: api.rootId,
    rootOrientation: orientation,
    rootDirection: direction,
    rootIsDisabled: disabled,
    rootIsLoopEnabled: loop,
    rootMultiple: api.multiple,
    activateItem$: api.activateItem$,
    deActivateItem$: api.deActivateItem$,
    getAllItem$: api.getAllItems$,
    pressedValuesSig: api.pressedValuesSig,
    getAndSetTabIndexItem$: api.getAndSetTabIndexItem$,
    registerItem$: api.registerItem$,
    itemsCSR: api.itemsCSR,
  };

  const setTabIndexInSSR = $(async () => {
    const allItems = await rootApiContext.getAllItem$();

    //if pressedItems exist, we set them to tabIndex = 0
    const currentPressedItems = allItems.filter((item) => item.isPressed.value === true);

    if (currentPressedItems.length > 0) {
      currentPressedItems.forEach(async (item) => {
        await rootApiContext.getAndSetTabIndexItem$(item.itemId, 0);
      });

      //and we ensure that the rest of items has tabIndex = -1
      allItems
        .filter((item) => item.isPressed.value === false)
        .forEach(async (item) => {
          await rootApiContext.getAndSetTabIndexItem$(item.itemId, -1);
        });

      return;
    }
    //However, if no pressedItems exit, we only set tabIndexx = 0 on the first item that is not disabled
    const firstNotDisabledItem = allItems.find((item) => item.isDisabled === false);

    if (currentPressedItems.length === 0 && firstNotDisabledItem !== undefined) {
      if (firstNotDisabledItem !== undefined) {
        await rootApiContext.getAndSetTabIndexItem$(firstNotDisabledItem.itemId, 0);
      }

      //and we ensure that the rest of items has tabIndex = -1
      allItems
        .filter((item) => item.itemId !== firstNotDisabledItem.itemId)
        .forEach(async (item) => {
          await rootApiContext.getAndSetTabIndexItem$(item.itemId, -1);
        });

      return;
    }
  });

  const setTabIndexInCSR = $(async () => {
    /*
    Note: given a "single" toggle group with one item already pressed. 
    - if we use: const allItems = rootApiContext.itemsCSR.value;
    - and we lookup for the currentPressedItems, we will get 2 items (the previous and the current)
    For that reason to get the currentPressedItems we use: rootApiContext.getAllItem$()
    However to get the firstNotDisabledItem, we need to use rootApiContext.itemsCSR.value (refs directly)
    as rootApiContext.getAllItem$() will be "out of order".

    Ideally, if rootApiContext.getAllItem$() would be in appropriate order, we could use the same logic
    for SSR and CSR. 
    In should be the case in v2, so we will refactor so both SSR and CSR will use the same API.


    The other solution that I consider was:
    to have a similar logic "setTabIndexInCSR" but this time which only use the refs
    meaning (rootApiContext.itemsCSR.value) within the "toggle-group-item": 
      useTask$(async ({ track }) => {
        if (isServer) return;
        track(() => rootApiContext.pressedValuesSig.value);
          await setTabIndexInCSR();
      });
    
    However, I decide to use that function in Root to avoid execute that same logic X times
    (X being the number of items) and the fact that Items are consumers that should work in isolation.
    They should not execute logic for other Items. This is what Root should do.
    */
    const allItems = await rootApiContext.getAllItem$();
    //if pressedItems exist, we set them to tabIndex = 0
    const currentPressedItems = allItems.filter((item) => item.isPressed.value === true);

    if (currentPressedItems.length > 0) {
      currentPressedItems.forEach(async (item) => {
        const pressedItem = allItems.find((i) => i.itemId === item.itemId);
        if (!pressedItem) throw 'Item Not Found';
        if (pressedItem.ref.value) {
          pressedItem.ref.value.tabIndex = 0;
        }
      });

      //and we ensure that the rest of items has tabIndex = -1
      allItems
        .filter((item) => item.isPressed.value === false)
        .forEach(async (item) => {
          const notPressedItem = allItems.find((i) => i.itemId === item.itemId);
          if (!notPressedItem) throw 'Item Not Found';
          if (notPressedItem.ref.value) {
            notPressedItem.ref.value.tabIndex = -1;
          }
        });

      return;
    }

    //However, if no pressedItems exit, we only set tabIndexx = 0 on the first item that is not disabled
    /*
    Unfortunately, rootApiContext.itemsCSR.value is empty because in the toggle-group-item
    the first useTask is tracking the pressedValue changes.
    If we put that task at the bottom, we will get the register itemsRef in rootApiContext.itemsCSR.value.
    However it will cause other missbehaviors. 

    Instead the safe way is to populate manually using the "document".
    In v2, we will not this all those workarounds as the items will be in order and we will use the same API for both SSR and CSR.
    */
    rootApiContext.itemsCSR.value = Array.from(
      document.querySelectorAll(`.toggle-group-item-${rootApiContext.rootId}`),
    ) as HTMLElement[];

    const firstNotDisabledItem = rootApiContext.itemsCSR.value.find(
      (item) => item.ariaDisabled === 'false',
    );

    if (currentPressedItems.length === 0 && firstNotDisabledItem !== undefined) {
      if (firstNotDisabledItem !== undefined) {
        firstNotDisabledItem.tabIndex = 0;
      }

      //and we ensure that the rest of items has tabIndex = -1
      allItems
        .filter((item) => item.itemId !== firstNotDisabledItem.id)
        .forEach(async (item) => {
          const otherItem = allItems.find((i) => i.itemId === item.itemId);
          if (!otherItem) throw 'Item Not Found';
          if (otherItem.ref.value) {
            otherItem.ref.value.tabIndex = -1;
          }
        });

      return;
    }
  });

  /*
  TODO: optimize this code to make it faster (its a library)
  Optimization = use a for loop instead of iterating multiple times.
  Status: As the ToggleGroup component is in "Draft" state, I decided to not optimize it for now.
  As it will decrease readability even more.
  Decision: wait for v2, to refactor the code and have the same API for both SSR and CSR.
  And then make the optimization.
  */
  //side-effect, to setTabIndex
  useTask$(async ({ track }) => {
    track(() => api.pressedValuesSig.value);

    if (isServer) {
      await setTabIndexInSSR();
    }

    if (isBrowser) {
      await setTabIndexInCSR();
    }
  });

  useContextProvider(toggleGroupRootApiContextId, rootApiContext);

  return (
    <div
      {...divProps}
      {...commonProps}
      data-qui-togglegroup-root
      data-orientation={orientation}
    >
      <Slot />
    </div>
  );
});
