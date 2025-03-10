import { $, Signal, useId, useSignal } from '@qwik.dev/core';

import { Item, ItemId } from './toggle-group-context';
import {
  ToggleGroupApiProps,
  ToggleGroupMultipleProps,
  ToggleGroupSingleProps,
} from './toggle-group-root';
import { useBoundSignal } from '../../utils/bound-signal2';

function useRootItemsRepo() {
  const items = useSignal<Map<ItemId, Signal<Item>>>(new Map());

  const rootId = useId();

  //only used to register itemRef in CSR land
  const itemsCSR = useSignal<HTMLElement[]>([]);

  const registerItem$ = $((itemId: ItemId, itemSig: Signal<Item>) => {
    items.value = items.value.set(itemId, itemSig);
  });

  const getAndSetTabIndexItem$ = $((itemId: ItemId, tabIndexValue: 0 | -1) => {
    const itemSig = items.value.get(itemId);
    if (!itemSig) throw 'Item Not Found';
    if (itemSig) {
      itemSig.value.tabIndex.value = tabIndexValue;
    }
  });

  const getAllItems$ = $(() =>
    Array.from(items.value.values()).map((signal) => signal.value),
  );

  return {
    getAllItems$,
    getAndSetTabIndexItem$,
    registerItem$,
    rootId,
    itemsCSR,
  } as const;
}

function useCreateSingleToggleGroup(props: ToggleGroupSingleProps) {
  const { multiple = false, value, onChange$, 'bind:value': givenValueSig } = props;

  const pressedValuesSig = useBoundSignal(givenValueSig, value);
  const rootItemsRepo = useRootItemsRepo();

  const handleValueChange$ = $((newValue: string) => {
    pressedValuesSig.value = newValue;

    if (onChange$) onChange$(pressedValuesSig.value);
  });

  const activateItem$ = $((itemValue: string) => handleValueChange$(itemValue));
  const deActivateItem$ = $(() => handleValueChange$(''));

  return {
    multiple,
    pressedValuesSig,
    activateItem$,
    deActivateItem$,
    getAllItems$: rootItemsRepo.getAllItems$,
    getAndSetTabIndexItem$: rootItemsRepo.getAndSetTabIndexItem$,
    registerItem$: rootItemsRepo.registerItem$,
    rootId: rootItemsRepo.rootId,
    itemsCSR: rootItemsRepo.itemsCSR,
  } as const;
}

function useCreateMultipleToggleGroup(props: ToggleGroupMultipleProps) {
  const { multiple = true, 'bind:value': givenValueSig, value, onChange$ } = props;

  /*
  Need to pass an empty array if not I got: TypeError when toggle
  Uncaught (in promise) TypeError: pressedValuesSig.value is not iterable
  */
  const pressedValuesSig = useBoundSignal(givenValueSig, value || []);

  const rootItemsRepo = useRootItemsRepo();

  const handleValueChange$ = $((newValue: string[]) => {
    pressedValuesSig.value = newValue;

    if (onChange$) onChange$(pressedValuesSig.value);
  });

  const activateItem$ = $((itemValue: string) =>
    handleValueChange$([...pressedValuesSig.value, itemValue]),
  );
  const deActivateItem$ = $((itemValue: string) =>
    handleValueChange$(pressedValuesSig.value.filter((value) => value !== itemValue)),
  );

  return {
    multiple,
    pressedValuesSig,
    activateItem$,
    deActivateItem$,
    getAllItems$: rootItemsRepo.getAllItems$,
    getAndSetTabIndexItem$: rootItemsRepo.getAndSetTabIndexItem$,
    registerItem$: rootItemsRepo.registerItem$,
    rootId: rootItemsRepo.rootId,
    itemsCSR: rootItemsRepo.itemsCSR,
  } as const;
}

function isSingleProps(props: ToggleGroupApiProps): props is ToggleGroupSingleProps {
  return props.multiple === undefined || props.multiple === false;
}

export function useToggleGroup(props: ToggleGroupApiProps) {
  if (isSingleProps(props)) {
    // this is fine as the ToggleGroup will always be either Single or Multiple during its lifecycle
    // eslint-disable-next-line qwik/use-method-usage
    return useCreateSingleToggleGroup(props);
  }
  return useCreateMultipleToggleGroup(props);
}
