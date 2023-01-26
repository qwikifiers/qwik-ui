import {
  component$,
  createContext,
  useContext,
  useContextProvider,
  Slot,
  useClientEffect$,
  useSignal,
  Signal,
  $,
  QRL,
  useOnWindow,
} from '@builder.io/qwik';
import { computePosition, flip } from '@floating-ui/dom';

interface SelectRootContextService {
  selectedOption: Signal<string>;
  isExpanded: Signal<boolean>;
  setTriggerRef$: QRL<(ref: Signal<HTMLElement | undefined>) => void>;
  setListBoxRef$: QRL<(ref: Signal<HTMLElement | undefined>) => void>;
}

const selectContext = createContext<SelectRootContextService>('select-root');

interface StyleProps {
  class?: string;
  style?: string;
}

interface RootProps extends StyleProps {
  defaultValue?: string;
}

const Root = component$(({ defaultValue, ...props }: RootProps) => {
  const selectedOption = useSignal(defaultValue ? defaultValue : '');
  const isExpanded = useSignal(false);

  const triggerRef = useSignal<HTMLElement>();
  const setTriggerRef$ = $((ref: Signal<HTMLElement | undefined>) => {
    if (ref) {
      triggerRef.value = ref.value;
    }
  });

  const listBoxRef = useSignal<HTMLElement>();
  const setListBoxRef$ = $((ref: Signal<HTMLElement | undefined>) => {
    if (ref) {
      listBoxRef.value = ref.value;
    }
  });

  const contextService: SelectRootContextService = {
    selectedOption,
    isExpanded,
    setTriggerRef$,
    setListBoxRef$,
  };

  useContextProvider(selectContext, contextService);

  useClientEffect$(async ({ track }) => {
    const trigger = track(() => triggerRef.value);
    const listBox = track(() => listBoxRef.value);
    const expanded = track(() => isExpanded.value);

    if (expanded && trigger && listBox) {
      computePosition(trigger, listBox, {
        placement: 'bottom',
        middleware: [flip()],
      }).then(({ x, y }) => {
        Object.assign(listBox.style, {
          left: `${x}px`,
          top: `${y}px`,
        });
      });
    }

    if (expanded === false) {
      trigger?.focus();
    }
  });

  useOnWindow(
    'click',
    $((e) => {
      const target = e.target as HTMLElement;
      if (
        isExpanded.value === true &&
        e.target !== triggerRef.value &&
        target.getAttribute('role') !== 'option' &&
        target.nodeName !== 'LABEL'
      ) {
        isExpanded.value = false;
      }
    })
  );

  return (
    <div
      onKeyUp$={(e) => {
        if (e.key === 'Escape') {
          contextService.isExpanded.value = false;
        }
      }}
      {...props}
    >
      <Slot />
    </div>
  );
});

interface TriggerProps extends StyleProps {
  disabled?: boolean;
}

const Trigger = component$(({ disabled, ...props }: TriggerProps) => {
  const ref = useSignal<HTMLElement>();
  const contextService = useContext(selectContext);

  useClientEffect$(() => {
    contextService.setTriggerRef$(ref);
  });

  return (
    <button
      ref={ref}
      aria-expanded={contextService.isExpanded.value}
      disabled={disabled}
      onClick$={() => {
        contextService.isExpanded.value = !contextService.isExpanded.value;
      }}
      {...props}
    >
      <Slot />
    </button>
  );
});

interface ValueProps extends StyleProps {
  placeholder?: string;
}

const Value = component$(({ placeholder, ...props }: ValueProps) => {
  const contextService = useContext(selectContext);
  const value = contextService.selectedOption.value;
  return <span {...props}>{value ? value : placeholder}</span>;
});

interface MarkerProps extends StyleProps {}

const Marker = component$(({ ...props }: MarkerProps) => {
  return (
    <span aria-hidden="true" {...props}>
      <Slot />
    </span>
  );
});

interface ListBoxProps extends StyleProps {}

const ListBox = component$(({ ...props }: ListBoxProps) => {
  const ref = useSignal<HTMLElement>();
  const contextService = useContext(selectContext);

  useClientEffect$(() => {
    contextService.setListBoxRef$(ref);
  });

  return (
    <ul
      ref={ref}
      role="listbox"
      style={`
      display: ${contextService.isExpanded.value ? 'block' : 'none'};
      position: absolute;
      z-index: 1;
      ${props.style}
    `}
      class={props.class}
    >
      <Slot />
    </ul>
  );
});

interface GroupProps extends StyleProps {
  disabled?: boolean;
}

const Group = component$(({ disabled, ...props }: GroupProps) => {
  return (
    <div role="group" aria-disabled={disabled} {...props}>
      <Slot />
    </div>
  );
});

interface LabelProps extends StyleProps {}

const Label = component$(({ ...props }: LabelProps) => {
  return (
    <label {...props}>
      <Slot />
    </label>
  );
});

interface OptionProps extends StyleProps {
  disabled?: boolean;
  value: string;
}

const Option = component$(({ disabled, value, ...props }: OptionProps) => {
  const contextService = useContext(selectContext);

  return (
    <li
      role="option"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      aria-selected={value === contextService.selectedOption.value}
      onClick$={() => {
        if (!disabled) {
          contextService.selectedOption.value = value;
          contextService.isExpanded.value = false;
        }
      }}
      onKeyUp$={(e) => {
        const target = e.target as HTMLElement;
        if (
          !disabled &&
          (e.key === 'Enter' || e.key === ' ') &&
          target.innerText === value
        ) {
          contextService.selectedOption.value = value;
          contextService.isExpanded.value = false;
        }
      }}
      onMouseEnter$={(e) => {
        if (!disabled) {
          const target = e.target as HTMLElement;
          target.focus();
        }
      }}
      {...props}
    >
      {value}
    </li>
  );
});

export {
  selectContext,
  Root,
  Trigger,
  Value,
  Marker,
  ListBox,
  Group,
  Label,
  Option,
};
