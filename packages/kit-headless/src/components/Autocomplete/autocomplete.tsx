import {
  component$,
  Slot,
  useContext,
  useContextProvider,
  createContextId,
  useSignal,
  type Signal,
  QwikIntrinsicElements,
  useStore,
  useVisibleTask$,
  $,
  useId,
  useOnWindow,
  useTask$,
  QwikKeyboardEvent,
} from '@builder.io/qwik';

import { isBrowser, isServer } from '@builder.io/qwik/build';

import { KeyCode } from '../../utils/key-code.type';

// import { Popover, PopoverContent, PopoverTrigger } from '../popover';

import { computePosition, flip } from '@floating-ui/dom';

/*
    
    Input Textbox - Role Combobox
    Listbox - Role Listbox

    Notes: 

    https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-autocomplete-list/

    https://headlessui.com/react/combobox
    
    https://thejackshelton.notion.site/Combobox-e82cae2325914c3c82d4cbfcab574825?pvs=4


    Current thoughts for API implementation

    <Autocomplete>
        <AutocompleteLabel />
        <AutocompleteTrigger>
            <AutocompleteInput />
            <AutocompleteButton />
        </AutocompleteTrigger>
        <AutoCompleteListbox>
            <AutoCompleteOption />
        </AutoCompleteListbox>
    </Autocomplete>

    Side note: This is based off of both the ARIA combobox pattern linked above and headless UI

    In Headless UI Label is automatically the input value, unless specified otherwise

    For AutocompleteLabel, we believe that it uses aria-labelledby to 
    automatically give a label to screenreaders if the label is not specified.

    If it is, then you use <AutocompleteLabel />


    TODO:

    - Get it working
      - Context - 🏗️
      - Key events work - ✅
      - Listbox toggles - ✅
      - Floating UI anchor working - ✅
      - Listbox is anchored to a wrapper containing the input and button - ✅
      - Autocomplete/filter functionality - ✅
      - Select Value, and value is displayed in input - ✅



    Autocomplete functionality - Look at codepen for functionality reference

    - Collapsed by default
    - Up to the user to decide when to expand on button on focus
    - Toggle on open button, and when matching characters are typed
      - Up to user to decide if it opens on focus (maybe a prop?)
      - Up to user to decide if it opens on down key (maybe a prop?)
    - Maybe: selected value context for the combobox?
    

    APG Type: 
    List autocomplete with manual selection

    Refer to Combobox Pattern for General Changes & Listbox Pattern for Listbox Changes
    https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-autocomplete-list/

    Refer to Combobox Pattern for aria-roles, states, and properties
    https://www.w3.org/WAI/ARIA/apg/patterns/combobox/#wai-ariaroles,states,andproperties
    https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-autocomplete-list/


    Jack's Notes
    Refs we need to update with context. 
    1 Box - Search & Button
    2 Listbox 
    
    Shai showed Marcus "inversion of control" pattern
    Example:
    const ref = useSignal<HTMLElement>(); <-- this gets the ref of the box you want
    const contextService = useContext(AutocompleteContextId);
    contextService.listBoxRef = ref; <-- updates the context with the ref of the box so the root component knows it exists

    ^ Because the parent doesn't know its children yet

    Floating UI:
    Compute position & our triggerRef is what determines what is anchored with floating UI.
    https://floating-ui.com/docs/computePosition


    Autocomplete implementation:
    - grab reference to input box and listbox
    - search function that has an array of results, returns results
    - searchHandler function
      - sets input signal as whatever is in the text box
      - sets results to empty array
      - if input is not empty set results equal to the search function with our input signal value as param
      - showSuggestions function with results and our input signal value as params
      

*/

// Taken similar props from select + input Value
interface AutocompleteContext {
  options: Signal<HTMLElement | undefined>[];
  filteredOptions: Signal<HTMLElement | undefined>[];
  selectedOption: Signal<string>;
  isExpanded: Signal<boolean>;
  triggerRef: Signal<HTMLElement | undefined>;
  listBoxRef: Signal<HTMLElement | undefined>;
  labelRef: Signal<HTMLElement | undefined>;
  listBoxId: string;
  inputId: string;
  activeOptionId: Signal<string | null>;
  inputValue: Signal<string>;
}

export const AutocompleteContextId =
  createContextId<AutocompleteContext>('autocomplete-root');

export type AutocompleteRootProps = {
  defaultValue?: string;
} & QwikIntrinsicElements['div'];

export const AutocompleteRoot = component$(
  ({ defaultValue, ...props }: AutocompleteRootProps) => {
    const options = useStore([]);
    const filteredOptions = useStore([]);
    const selectedOption = useSignal(defaultValue ? defaultValue : '');
    const isExpanded = useSignal(false);
    const triggerRef = useSignal<HTMLElement>();
    const listBoxRef = useSignal<HTMLElement>();
    const labelRef = useSignal<HTMLElement>();
    const inputValue = useSignal(defaultValue ? defaultValue : '');
    const listBoxId = useId();
    const inputId = useId();
    const activeOptionId = useSignal(null);

    const contextService: AutocompleteContext = {
      options,
      filteredOptions,
      selectedOption,
      isExpanded,
      triggerRef,
      listBoxRef,
      labelRef,
      inputValue,
      listBoxId,
      inputId,
      activeOptionId,
    };

    useContextProvider(AutocompleteContextId, contextService);

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

    useVisibleTask$(async ({ track }) => {
      const trigger = track(() => contextService.triggerRef.value);
      const listBox = track(() => contextService.listBoxRef.value);
      const expanded = track(() => isExpanded.value);

      if (!trigger || !listBox) return;

      if (expanded === true) {
        listBox.style.visibility = 'hidden';

        await updatePosition(trigger, listBox);

        listBox.style.visibility = 'visible';

        listBox?.focus();
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
          contextService.isExpanded.value === true &&
          !contextService.listBoxRef.value?.contains(target) &&
          !contextService.triggerRef.value?.contains(target)
        ) {
          contextService.isExpanded.value = false;
        }
      })
    );

    return (
      <div
        onKeyDown$={[
          $((e: QwikKeyboardEvent) => {
            if (e.key === 'Escape') {
              contextService.isExpanded.value = false;
              const inputElement = contextService.triggerRef.value
                ?.firstElementChild as HTMLElement;
              inputElement?.focus();
            }
          }),
          props.onKeyDown$,
        ]}
        {...props}
      >
        <Slot />
      </div>
    );
  }
);

export type AutocompleteLabelProps = QwikIntrinsicElements['label'];

export const AutocompleteLabel = component$((props: AutocompleteLabelProps) => {
  const ref = useSignal<HTMLElement>();
  const contextService = useContext(AutocompleteContextId);
  contextService.labelRef = ref;

  return (
    <label {...props} for={contextService.inputId}>
      <Slot />
    </label>
  );
});

export type AutocompleteTriggerProps = QwikIntrinsicElements['div'];

export const AutocompleteTrigger = component$(
  (props: AutocompleteTriggerProps) => {
    const ref = useSignal<HTMLElement>();
    const contextService = useContext(AutocompleteContextId);
    contextService.triggerRef = ref;

    return (
      <div ref={ref} {...props}>
        <Slot />
      </div>
    );
  }
);

export type InputProps = QwikIntrinsicElements['input'];

// Add required context here
export const AutocompleteInput = component$((props: InputProps) => {
  const ref = useSignal<HTMLElement>();
  const contextService = useContext(AutocompleteContextId);

  /* 
    previously had useTask here, but noticed whenever it first renders, 
    it won't focus the first option when hitting the down arrow key to open the listbox
    Also, all of our tests break on useTask, BUT it seems to work fine in the browser with useTask.
    Very odd.
  */
  useVisibleTask$(({ track }) => {
    track(() => contextService.inputValue.value);

    contextService.filteredOptions = contextService.options.filter(
      (option: Signal) => {
        const optionValue = option.value.getAttribute('optionValue');
        const inputValue = contextService.inputValue.value;

        if (
          contextService.inputValue.value.length >= 0 &&
          document.activeElement === ref.value
        ) {
          if (optionValue === inputValue) {
            contextService.isExpanded.value = false;
          } else if (optionValue.match(new RegExp(inputValue, 'i'))) {
            contextService.isExpanded.value = true;
          }
        } else {
          contextService.isExpanded.value = false;
        }

        return optionValue.match(new RegExp(inputValue, 'i'));
      }
    );

    // Probably better to refactor Signal type later
    contextService.options.map((option: Signal) => {
      if (
        !option.value
          .getAttribute('optionValue')
          .match(new RegExp(contextService.inputValue.value, 'i'))
      ) {
        option.value.style.display = 'none';
      } else {
        option.value.style.display = '';
      }
    });
  });

  return (
    <input
      ref={ref}
      role="combobox"
      id={contextService.inputId}
      aria-autocomplete="list"
      aria-controls={contextService.listBoxId}
      bind:value={contextService.inputValue}
      onKeyDown$={[
        $((e: QwikKeyboardEvent) => {
          if (e.key === 'ArrowDown') {
            contextService.isExpanded.value = true;
            contextService.filteredOptions[0]?.value?.focus();
          }
        }),
        props.onKeyDown$,
      ]}
      {...props}
    />
  );
});

export type ButtonProps = QwikIntrinsicElements['button'];

export const AutocompleteButton = component$((props: ButtonProps) => {
  const contextService = useContext(AutocompleteContextId);

  return (
    <button
      {...props}
      aria-expanded={contextService.isExpanded.value}
      // add their own custom onClick with our onClick functionality
      onClick$={[
        $(
          () =>
            (contextService.isExpanded.value = !contextService.isExpanded.value)
        ),
        props.onClick$,
      ]}
      tabIndex={-1}
    >
      <Slot />
    </button>
  );
});

export type ListboxProps = {
  isExpanded?: boolean;
} & QwikIntrinsicElements['ul'];

export const AutocompleteListbox = component$((props: ListboxProps) => {
  const ref = useSignal<HTMLElement>();
  const contextService = useContext(AutocompleteContextId);
  contextService.listBoxRef = ref;

  return (
    <ul
      id={contextService.listBoxId}
      ref={ref}
      style={`
        display: ${
          contextService.isExpanded.value ? 'block' : 'none'
        }; position: absolute; z-index: 1; ${props.style}
    `}
      role="listbox"
      {...props}
      // aria-label={!contextService.labelRef.value ? contextService.inputValue.value : undefined}
      onKeyDown$={[
        $((e: QwikKeyboardEvent) => {
          const availableOptions = contextService.filteredOptions.map(
            (option) => option.value
          );

          const target = e.target as HTMLElement;
          const currentIndex = availableOptions.indexOf(target);

          if (e.key === 'ArrowDown') {
            if (currentIndex === availableOptions.length - 1) {
              availableOptions[0]?.focus();
            } else {
              availableOptions[currentIndex + 1]?.focus();
            }
          }

          if (e.key === 'ArrowUp') {
            if (currentIndex <= 0) {
              availableOptions[availableOptions.length - 1]?.focus();
            } else {
              availableOptions[currentIndex - 1]?.focus();
            }
          }

          if (e.key === 'Home') {
            availableOptions[0]?.focus();
          }

          if (e.key === 'End') {
            availableOptions[availableOptions.length - 1]?.focus();
          }
        }),
        props.onKeyDown$,
      ]}
    >
      <Slot />
    </ul>
  );
});

export type OptionProps = { optionValue: string } & QwikIntrinsicElements['li'];

export const AutocompleteOption = component$((props: OptionProps) => {
  const ref = useSignal<HTMLElement>();
  const contextService = useContext(AutocompleteContextId);

  contextService.options = [...contextService.options, ref];

  return (
    <li
      ref={ref}
      role="option"
      onClick$={[
        $(() => {
          contextService.inputValue.value = props.optionValue;
          contextService.isExpanded.value = false;
        }),
        props.onClick$,
      ]}
      onKeyDown$={[
        $((e: QwikKeyboardEvent) => {
          if (e.key === 'Enter' || e.key === ' ') {
            contextService.inputValue.value = props.optionValue;
            contextService.isExpanded.value = false;
            const inputElement = contextService.triggerRef.value
              ?.firstElementChild as HTMLElement;
            inputElement?.focus();
          }
        }),
        props.onKeyDown$,
      ]}
      tabIndex={0}
      {...props}
    >
      <Slot />
    </li>
  );
});
