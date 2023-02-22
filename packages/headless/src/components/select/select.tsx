import {
  component$,
  useContext,
  useContextProvider,
  Slot,
  useSignal,
  Signal,
  $,
  QRL,
  useOnWindow,
  useStore,
  useBrowserVisibleTask$,
  createContextId,
} from '@builder.io/qwik';
import { computePosition, flip } from '@floating-ui/dom';

interface SelectRootContextService {
  options: HTMLElement[];
  selectedOption: Signal<string>;
  isExpanded: Signal<boolean>;
  setTriggerRef$: QRL<(ref: Signal<HTMLElement | undefined>) => void>;
  setListBoxRef$: QRL<(ref: Signal<HTMLElement | undefined>) => void>;
}

export const selectContext =
  createContextId<SelectRootContextService>('select-root');

interface StyleProps {
  class?: string;
  style?: string;
}

interface RootProps extends StyleProps {
  defaultValue?: string;
}

const Root = component$(({ defaultValue, ...props }: RootProps) => {
  const options = useStore([]);

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
    options,
    selectedOption,
    isExpanded,
    setTriggerRef$,
    setListBoxRef$,
  };

  useContextProvider(selectContext, contextService);

  const updatePosition = $(
    (referenceEl: HTMLElement, floatingEl: HTMLElement) => {
      computePosition(referenceEl, floatingEl, {
        placement: 'bottom',
        middleware: [flip()],
      }).then(({ x, y }) => {
        Object.assign(floatingEl.style, {
          left: `${x}px`,
          top: `${y}px`,
        });
      });
    }
  );

  useBrowserVisibleTask$(async ({ track }) => {
    const trigger = track(() => triggerRef.value);
    const listBox = track(() => listBoxRef.value);
    const expanded = track(() => isExpanded.value);

    if (expanded && trigger && listBox) {
      updatePosition(trigger, listBox);
    }

    if (expanded === false) {
      trigger?.focus();
    }

    if (expanded === true) {
      listBox?.focus();
    }
  });

  useOnWindow(
    'click',
    $((e) => {
      const target = e.target as HTMLElement;
      if (
        contextService.isExpanded.value === true &&
        e.target !== triggerRef.value &&
        target.getAttribute('role') !== 'option' &&
        target.nodeName !== 'LABEL'
      ) {
        contextService.isExpanded.value = false;
      }
    })
  );

  return (
    <div
      onKeyDown$={(e) => {
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

  useBrowserVisibleTask$(() => {
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
      onKeyDown$={(e) => {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
          contextService.isExpanded.value = true;
        }
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

const Marker = component$(({ ...props }: StyleProps) => {
  return (
    <span aria-hidden="true" {...props}>
      <Slot />
    </span>
  );
});

const ListBox = component$(({ ...props }: StyleProps) => {
  const ref = useSignal<HTMLElement>();
  const contextService = useContext(selectContext);

  useBrowserVisibleTask$(() => {
    contextService.setListBoxRef$(ref);
    const options = ref.value?.querySelectorAll<HTMLElement>('[role="option"]');
    if (options?.length) {
      options.forEach((option) => contextService.options.push(option));
    }
  });

  return (
    <ul
      ref={ref}
      role="listbox"
      tabIndex={0}
      style={`
      display: ${contextService.isExpanded.value ? 'block' : 'none'};
      position: absolute;
      z-index: 1;
      ${props.style}
    `}
      class={props.class}
      onKeyDown$={(e) => {
        const availableOptions = contextService.options.filter(
          (option) => !(option.getAttribute('aria-disabled') === 'true')
        );
        const target = e.target as HTMLElement;
        const currentIndex = availableOptions.indexOf(target);

        if (e.key === 'ArrowDown') {
          if (currentIndex === availableOptions.length - 1) {
            availableOptions[0].focus();
          } else {
            availableOptions[currentIndex + 1].focus();
          }
        }

        if (e.key === 'ArrowUp') {
          if (currentIndex <= 0) {
            availableOptions[availableOptions.length - 1].focus();
          } else {
            availableOptions[currentIndex - 1].focus();
          }
        }
      }}
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

const Label = component$(({ ...props }: StyleProps) => {
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
      onKeyDown$={(e) => {
        const target = e.target as HTMLElement;
        if (!disabled && e.key === 'Tab' && target.innerText === value) {
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

export { Root, Trigger, Value, Marker, ListBox, Group, Label, Option };
