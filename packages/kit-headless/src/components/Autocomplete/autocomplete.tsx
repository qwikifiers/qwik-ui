import {
  component$,
  Slot,
  useContext,
  useContextProvider,
  createContextId,
  useSignal,
  Signal,
  QwikIntrinsicElements,
  useStore,
  useVisibleTask$,
  $,
  useStylesScoped$,
} from '@builder.io/qwik';

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
      - Key events work 
      - Listbox toggles - ✅
      - Floating UI anchor working - ✅
      - Listbox is anchored to a wrapper containing the input and button - ✅
      - Autocomplete/filter functionality
      - Select Value, and value is displayed in input



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

*/

// Taken similar props from select + input Value
interface AutocompleteContext {
  options: Signal<HTMLElement | undefined>[];
  selectedOption: Signal<string>;
  isExpanded: Signal<boolean>;
  triggerRef: Signal<HTMLElement | undefined>;
  listBoxRef: Signal<HTMLElement | undefined>;
  inputValue: Signal<string>;
}

export const AutocompleteContextId =
  createContextId<AutocompleteContext>('autocomplete-root');

export type AutocompleteRootProps = {
  defaultValue?: string;
} & QwikIntrinsicElements['div'];

export const AutocompleteRoot = component$(
  ({ defaultValue, ...props }: AutocompleteRootProps) => {
    useStylesScoped$(`
      div {
        background: blue;
        width: fit-content;
        position: relative;
      }
    `);

    const options = useStore([]);
    const selectedOption = useSignal(defaultValue ? defaultValue : '');
    const isExpanded = useSignal(false);
    const triggerRef = useSignal<HTMLElement>();
    const listBoxRef = useSignal<HTMLElement>();
    const inputValue = useSignal(defaultValue ? defaultValue : '');

    const contextService: AutocompleteContext = {
      options,
      selectedOption,
      isExpanded,
      triggerRef,
      listBoxRef,
      inputValue,
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

    return (
      <div {...props}>
        <Slot />
      </div>
    );
  }
);

export type AutocompleteLabelProps = QwikIntrinsicElements['label'];

export const AutocompleteLabel = component$((props: AutocompleteLabelProps) => {
  return (
    <label {...props} for="autocomplete-test">
      <Slot />
    </label>
  );
});

export type AutocompleteTriggerProps = QwikIntrinsicElements['div'];

export const AutocompleteTrigger = component$(
  (props: AutocompleteTriggerProps) => {
    // useStylesScoped$(`
    //     div {
    //       margin-left: 80px;
    //     }
    //   `);

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
  // required prop here
  return <input id="autocomplete-test" role="combobox" {...props} />;
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
    >
      <Slot />
    </button>
  );
});

export type ListboxProps = {
  isExpanded?: boolean;
} & QwikIntrinsicElements['ul'];

export const AutocompleteListbox = component$((props: ListboxProps) => {
  // useStylesScoped$(`
  //     @keyframes opacity {
  //       from {
  //         opacity: 0;
  //       }
  //       to {
  //         opacity: 1;
  //       }
  //     }

  //     ul {
  //       animation: opacity 2000ms ease-in-out;
  //       width: 100%;
  //     }
  //   `);

  const ref = useSignal<HTMLElement>();
  const contextService = useContext(AutocompleteContextId);
  contextService.listBoxRef = ref;
  return (
    <ul
      ref={ref}
      style={`
    display: ${
      contextService.isExpanded.value ? 'block' : 'none'
    }; background: yellow; position: absolute; ${props.style}
  `}
      role="listbox"
      {...props}
    >
      <Slot />
    </ul>
  );
});

export type OptionProps = QwikIntrinsicElements['li'];

export const AutocompleteOption = component$((props: OptionProps) => {
  return (
    <li role="option" {...props}>
      <Slot />
    </li>
  );
});
