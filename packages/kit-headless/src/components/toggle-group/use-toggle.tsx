import { $, useSignal, useTask$ } from '@builder.io/qwik';

import { ToggleGroupValueContext } from './toggle-group-context';
import {
  ToggleGroupApiProps,
  ToggleGroupMultipleProps,
  ToggleGroupSingleProps,
} from './toggle-group-root';
import { useBoundSignal } from '../../utils/bound-signal2';

function useCreateSingleToggleGroup(props: ToggleGroupSingleProps) {
  const {
    multiple = false,
    defaultValue,
    value,
    onValueChange$,
    'bind:value': givenValueSig,
  } = props;

  //internal state
  const pressedValuesSig = useBoundSignal(givenValueSig, defaultValue);

  useTask$(({ track }) => {
    if (value === undefined) return;
    track(() => value);
    pressedValuesSig.value = value;
  });

  const handleValueChange$ = $((newValue: string) => {
    pressedValuesSig.value = newValue;
    console.log('newState', newValue);
    if (onValueChange$) onValueChange$(pressedValuesSig.value);
  });

  const handleItemActivate$ = $((itemValue: string) => handleValueChange$(itemValue));
  const handleItemDeactivate$ = $(() => handleValueChange$(''));

  return {
    multiple,
    pressedValuesSig,
    onItemActivate$: handleItemActivate$,
    onItemDeactivate$: handleItemDeactivate$,
  } as const;
}

function useCreateMultipleToggleGroup(props: ToggleGroupMultipleProps) {
  const {
    multiple = true,
    'bind:value': givenValueSig,
    value,
    defaultValue,
    onValueChange$,
  } = props;

  const pressedValuesSig = useSignal(givenValueSig?.value ?? value ?? defaultValue ?? []);

  const handleValueChange$ = $((newValue: string[]) => {
    pressedValuesSig.value = newValue;
    if (onValueChange$) onValueChange$(pressedValuesSig.value);
  });

  const handleItemActivate$ = $((itemValue: string) =>
    handleValueChange$([...pressedValuesSig.value, itemValue]),
  );

  const handleItemDeactivate$ = $((itemValue: string) =>
    handleValueChange$(pressedValuesSig.value.filter((value) => value !== itemValue)),
  );

  return {
    multiple,
    pressedValuesSig,
    onItemActivate$: handleItemActivate$,
    onItemDeactivate$: handleItemDeactivate$,
  } as const;
}

function isSingleProps(props: ToggleGroupApiProps): props is ToggleGroupSingleProps {
  return props.multiple === undefined || props.multiple === false;
}

export function useToggleGroup(props: ToggleGroupApiProps): ToggleGroupValueContext {
  if (isSingleProps(props)) {
    // TODO:
    // this is fine cuz
    // eslint-disable-next-line qwik/use-method-usage
    return useCreateSingleToggleGroup(props);
  }
  return useCreateMultipleToggleGroup(props);
}
