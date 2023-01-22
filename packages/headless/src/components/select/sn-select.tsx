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
  placeholder?: string;
  name?: string;
  disabled?: boolean;
  required?: boolean;
}

const Root = component$(
  ({ defaultValue, name, disabled, required, ...props }: RootProps) => {
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

    return (
      <div
        onKeyUp$={(e) => {
          const target = e.target as HTMLElement;

          if (e.key === 'Escape') {
            contextService.isExpanded.value = false;
          }
          if (
            (e.key === 'Enter' || e.key === ' ') &&
            target.getAttribute('value')
          ) {
            const value = target.getAttribute('value') as string;
            selectedOption.value = value;
            contextService.isExpanded.value = false;
          }
        }}
        {...props}
      >
        <Slot />
      </div>
    );
  }
);

interface TriggerProps extends StyleProps {}

const Trigger = component$(({ ...props }: TriggerProps) => {
  const ref = useSignal<HTMLElement>();
  const contextService = useContext(selectContext);

  useClientEffect$(() => {
    contextService.setTriggerRef$(ref);
  });

  return (
    <button
      ref={ref}
      aria-expanded={contextService.isExpanded.value}
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
    <span {...props}>
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
    `}
      {...props}
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
    <div role="group" {...props}>
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
  label?: string;
  value?: string;
}

const Option = component$(
  ({ disabled, label, value, ...props }: OptionProps) => {
    const contextService = useContext(selectContext);

    return (
      <li
        role="option"
        tabIndex={0}
        value={value}
        aria-selected={value === contextService.selectedOption.value}
        onClick$={(e) => {
          const target = e.target as HTMLElement;
          const value = target.getAttribute('value') as string;
          contextService.selectedOption.value = value;
          contextService.isExpanded.value = false;
        }}
        {...props}
      >
        {label ? label : <Slot />}
      </li>
    );
  }
);

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
