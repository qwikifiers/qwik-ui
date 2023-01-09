import {
  component$,
  createContext,
  Signal,
  Slot,
  $,
  QwikChangeEvent,
  useContext,
  useContextProvider,
  useSignal,
  PropFunction,
} from '@builder.io/qwik';

interface SelectItem {
  value?: string;
  label: string;
}

interface SelectContext {
  selected: Signal<string>;
}

export const selectContext = createContext<SelectContext>('select');

export interface SelectProps {
  onChange?: PropFunction<(evt: QwikChangeEvent) => void>;
  class?: string;
}

export const Select = component$(({ onChange, ...props }: SelectProps) => {
  const selected = useSignal('');

  const contextService: SelectContext = {
    selected,
  };

  useContextProvider(selectContext, contextService);

  return (
    <select
      role="listbox"
      onChange$={$((evt: QwikChangeEvent) => {
        contextService.selected = evt.target.value;
        if (onChange) {
          onChange(evt);
        }
      })}
      {...props}
    >
      <Slot />
    </select>
  );
});

export interface SelectItemProps extends SelectItem {
  disabled?: boolean;
  class?: string;
}

// single select option
export const SelectOption = component$(
  ({ value, label, disabled, ...props }: SelectItemProps) => {
    const contextService = useContext(selectContext);

    return (
      <option
        role="option"
        value={value}
        selected={value === contextService.selected.value}
        disabled={disabled}
        {...props}
      >
        {label}
      </option>
    );
  }
);
