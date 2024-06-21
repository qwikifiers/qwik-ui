import {
  DropdownRadioGroupContext,
  dropdownRadioGroupContextId,
} from './dropdown-context';
import {
  QRL,
  Signal,
  Slot,
  component$,
  useContextProvider,
  useSignal,
  useTask$,
} from '@builder.io/qwik';

import { DropdownItemProps } from './dropdown-item';

type DropdownRadioGroupProps = {
  /** A signal that controls the current group value (controlled). */
  'bind:value'?: Signal<string>;

  //* If `true`, the group is disabled. */
  disabled?: boolean;

  //* The default value of the group. */
  defaultValue?: string;

  /**
   * QRL handler that runs when the user selects an item.
   */
  onChange$?: QRL<(value: string) => void>;
} & DropdownItemProps;

export const HDropdownRadioGroup = component$((props: DropdownRadioGroupProps) => {
  const { disabled = false, defaultValue = '', onChange$, ...rest } = props;

  const valueSig = useSignal(defaultValue);

  useTask$(function reactiveUserValue({ track }) {
    const bindValueSig = props['bind:value'];
    if (!bindValueSig) return;
    track(() => bindValueSig.value);

    valueSig.value = bindValueSig.value;
  });

  useTask$(function onChangeTask({ track }) {
    track(() => valueSig.value);

    onChange$?.(valueSig.value);
  });

  const radioGroupContext: DropdownRadioGroupContext = {
    valueSig,
    disabled,
  };

  useContextProvider(dropdownRadioGroupContextId, radioGroupContext);

  return (
    <div role="group" {...rest} data-disabled={disabled}>
      <Slot />
    </div>
  );
});
