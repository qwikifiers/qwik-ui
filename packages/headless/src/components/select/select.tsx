import {
  $,
  component$,
  createContext,
  PropFunction,
  QRL,
  Signal,
  Slot,
  useClientEffect$,
  useContext,
  useContextProvider,
  useSignal,
} from '@builder.io/qwik';
import { computePosition } from '@floating-ui/dom';

interface SelectContextService {
  selectedOptionSignal: Signal<string>;
  isListVisibleSignal: Signal<boolean>;
  listXSignal: Signal<number>;
  listYSignal: Signal<number>;
  setTriggerAnchor$: QRL<
    (triggerAnchorRef: Signal<HTMLElement | undefined>) => void
  >;
  setListAnchor$: QRL<
    (triggerAnchorRef: Signal<HTMLElement | undefined>) => void
  >;
}

export const selectContextToken = createContext<SelectContextService>('select');

export interface SelectProps {
  onChange?: PropFunction<(selectedValue: string) => void>;
  class?: string;
}

export const Select = component$(({ onChange, ...props }: SelectProps) => {
  const selectedOptionSignal = useSignal('');
  const isListVisibleSignal = useSignal(false);
  const triggerRefSignal = useSignal<HTMLElement>();
  const listRefSignal = useSignal<HTMLElement>();
  const listXSignal = useSignal<number>(0);
  const listYSignal = useSignal<number>(0);

  const setTriggerAnchor$ = $((triggerRef: Signal<HTMLElement | undefined>) => {
    if (triggerRef) {
      triggerRefSignal.value = triggerRef.value;
    }
  });

  const setListAnchor$ = $((listRef: Signal<HTMLElement | undefined>) => {
    if (listRef) {
      listRefSignal.value = listRef.value;
    }
  });

  const contextService: SelectContextService = {
    selectedOptionSignal,
    isListVisibleSignal,
    listXSignal,
    listYSignal,
    setTriggerAnchor$,
    setListAnchor$,
  };

  useContextProvider(selectContextToken, contextService);

  useClientEffect$(async ({ track }) => {
    const listRefValue = track(() => listRefSignal.value);
    const triggerRefValue = track(() => triggerRefSignal.value);
    const visible = track(() => isListVisibleSignal.value);

    if (visible && listRefValue && triggerRefValue) {
      const { x, y } = await computePosition(triggerRefValue, triggerRefValue, {
        placement: 'bottom',
      });
      console.log(`x: ${x} y: ${y}`);
      listXSignal.value = x;
      listYSignal.value = y;
    }
  });

  useClientEffect$(({ track }) => {
    const selectedValue = track(() => selectedOptionSignal.value);
    if (onChange) {
      onChange(selectedValue);
    }
  });

  return <Slot />;
});

export interface SelectOptionsListProps {
  class?: string;
  style?: string;
}

export const SelectOptionsList = component$(
  ({ ...props }: SelectOptionsListProps) => {
    const ref = useSignal<HTMLElement>();
    const selectContextService = useContext(selectContextToken);

    useClientEffect$(() => {
      selectContextService.setListAnchor$(ref);
    });

    return (
      <ul
        ref={ref}
        role="listbox"
        style={`display: ${
          selectContextService.isListVisibleSignal.value ? 'block' : 'none'
        };
        position: absolute;
        left: ${selectContextService.listXSignal.value}px;
        top: ${selectContextService.listYSignal.value}px;
        z-index: 300;
        ${props.style}`}
        class={props.class}
      >
        <Slot />
      </ul>
    );
  }
);

export interface SelectTriggerProps {
  class?: string;
  style?: string;
}

export const SelectTrigger = component$(({ ...props }: SelectTriggerProps) => {
  const ref = useSignal<HTMLElement>();
  const selectContextService = useContext(selectContextToken);

  useClientEffect$(() => {
    selectContextService.setTriggerAnchor$(ref);
  });

  return (
    <div
      ref={ref}
      onClick$={() => {
        selectContextService.isListVisibleSignal.value =
          !selectContextService.isListVisibleSignal.value;
      }}
      {...props}
    >
      {selectContextService.selectedOptionSignal.value !== '' ? (
        selectContextService.selectedOptionSignal.value
      ) : (
        <Slot />
      )}
    </div>
  );
});

export interface SelectOptionData {
  value?: string;
  label: string;
}

export interface SelectOptionProps extends SelectOptionData {
  disabled?: boolean;
  class?: string;
}

// single select option
export const SelectOption = component$(
  ({ value, label, disabled, ...props }: SelectOptionProps) => {
    const contextService = useContext(selectContextToken);

    return (
      <li
        role="option"
        value={value}
        aria-selected={value === contextService.selectedOptionSignal.value}
        onClick$={() => {
          if (!disabled) {
            contextService.selectedOptionSignal.value = value ?? label;
            contextService.isListVisibleSignal.value = false;
          }
        }}
        {...props}
      >
        {label}
      </li>
    );
  }
);
