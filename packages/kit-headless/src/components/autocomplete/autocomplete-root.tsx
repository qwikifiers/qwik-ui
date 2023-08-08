import {
  component$,
  Slot,
  useContextProvider,
  useSignal,
  QwikIntrinsicElements,
  useStore,
  useVisibleTask$,
  $,
  useId,
  useOnWindow,
  QwikKeyboardEvent
} from '@builder.io/qwik';

import { computePosition, flip } from '@floating-ui/dom';

import AutocompleteContextId from './autocomplete-context-id';
import { AutocompleteContext } from './autocomplete-context.type';

/*

    Input Textbox - Role Combobox.
    Listbox - Role Listbox.

    Notes:

    https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-autocomplete-list/

    https://headlessui.com/react/combobox
    
    https://thejackshelton.notion.site/Combobox-e82cae2325914c3c82d4cbfcab574825?pvs=4

    
    Current thoughts for API implementation

    <AutocompleteRoot>
      <AutocompleteLabel />
      <AutocompleteControl>
          <AutocompleteInput />
          <AutocompleteTrigger />
      </AutocompleteControl>
      <AutoCompleteListbox>
          <AutoCompleteOption />
      </AutoCompleteListbox>
    </AutocompleteRoot>

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
    const rootRef = useSignal<HTMLElement>();
    const labelRef = useSignal<HTMLElement>();
    const inputValue = useSignal(defaultValue ? defaultValue : '');
    const listBoxId = useId();
    const inputId = useId();
    const triggerId = useId();
    const activeOptionId = useSignal(null);
    const focusInput$ = $((inputId: string) => {
      rootRef.value
        ?.querySelector<HTMLElement>(`[data-autocomplete-input-id="${inputId}"]`)
        ?.focus();
    });

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
      triggerId,
      activeOptionId,
      focusInput$
    };

    useContextProvider(AutocompleteContextId, contextService);

    const updatePosition = $((referenceEl: HTMLElement, floatingEl: HTMLElement) => {
      computePosition(referenceEl, floatingEl, {
        placement: 'bottom',
        middleware: [flip()]
      }).then(({ x, y }) => {
        Object.assign(floatingEl.style, {
          left: `${x}px`,
          top: `${y}px`
        });
      });
    });

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
          props.onKeyDown$
        ]}
        {...props}
        ref={rootRef}
      >
        <Slot />
      </div>
    );
  }
);
