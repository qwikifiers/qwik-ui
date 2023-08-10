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
  QwikKeyboardEvent,
  Signal,
  useComputed$
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

    // inline impl: iterate over children & pass correct index. each group: Build index of inner children

    <AutocompleteRoot>
      <AutocompleteLabel />
      <AutocompleteControl>
          <AutocompleteInput />
          <AutocompleteTrigger />
      </AutocompleteControl>
      Inline component here 
      <AutoCompleteListbox>
        <AutocompleteGroup> <== Countries
          <AutoCompleteOption />
        </AutocompleteGroup>
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
    const optionsStore = useStore<Signal<HTMLElement>[]>([]);
    const filteredOptionsStore = useStore([]);
    const selectedOption = useSignal(defaultValue ? defaultValue : '');
    const isTriggerExpandedSig = useSignal(false);
    const inputRefSig = useSignal<HTMLElement>();
    const triggerRefSig = useSignal<HTMLElement>();
    const listBoxRefSig = useSignal<HTMLElement>();
    const rootRef = useSignal<HTMLElement>();
    const labelRef = useSignal<HTMLElement>();
    const inputValueSig = useSignal(defaultValue ? defaultValue : '');
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
      optionsStore,
      filteredOptionsStore,
      selectedOption,
      isTriggerExpandedSig,
      inputRefSig,
      triggerRefSig,
      listBoxRefSig,
      labelRef,
      inputValueSig,
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

    useVisibleTask$(async function updatePositionTask({ track }) {
      const inputRefValue = track(() => inputRefSig.value);
      const listBox = track(() => listBoxRefSig.value);
      const expanded = track(() => isTriggerExpandedSig.value);

      if (!inputRefValue || !listBox) return;

      if (expanded === true) {
        await updatePosition(inputRefValue, listBox);
      }
    });

    useVisibleTask$(async ({ track }) => {
      track(() => inputValueSig.value);

      contextService.filteredOptionsStore = contextService.optionsStore.filter(
        (option: Signal) => {
          const optionValue = option.value.getAttribute('optionValue');
          const inputValue = inputValueSig.value;

          const defaultFilter = new RegExp(inputValue, 'i');

          if (
            inputValueSig.value.length >= 0 &&
            document.activeElement === inputRefSig.value
          ) {
            if (optionValue === inputValue) {
              contextService.isTriggerExpandedSig.value = false;
            } else if (optionValue.match(defaultFilter)) {
              contextService.isTriggerExpandedSig.value = true;
            }
          } else {
            contextService.isTriggerExpandedSig.value = false;
          }

          return optionValue.match(defaultFilter);
        }
      );

      // Probably better to refactor Signal type later
      contextService.optionsStore.map((option: Signal) => {
        if (
          !option.value
            .getAttribute('optionValue')
            .match(new RegExp(inputValueSig.value, 'i'))
        ) {
          option.value.style.display = 'none';
        } else {
          option.value.style.display = '';
        }
      });
    });

    const filteredOptionsSig = useComputed$(() => {
      return optionsStore.filter((option) => {
        const inputValue = inputValueSig.value;
        const optionValue = option.value.getAttribute('optionValue');
        const defaultFilter = new RegExp(inputValue, 'i');

        return optionValue?.match(defaultFilter);
      });
    });

    useVisibleTask$(function filterOptionsTask({ track }) {
      track(() => inputValueSig.value);

      contextService.filteredOptionsStore = contextService.optionsStore.filter(
        (option: Signal) => {
          const optionValue = option.value.getAttribute('optionValue');
          const inputValue = inputValueSig.value;

          const defaultFilter = new RegExp(inputValue, 'i');

          if (
            inputValueSig.value.length >= 0 &&
            document.activeElement === inputRefSig.value
          ) {
            if (optionValue === inputValue) {
              contextService.isTriggerExpandedSig.value = false;
            } else if (optionValue.match(defaultFilter)) {
              contextService.isTriggerExpandedSig.value = true;
            }
          } else {
            contextService.isTriggerExpandedSig.value = false;
          }

          return optionValue.match(defaultFilter);
        }
      );

      // Probably better to refactor Signal type later
      contextService.optionsStore.map((option: Signal) => {
        if (
          !option.value
            .getAttribute('optionValue')
            .match(new RegExp(inputValueSig.value, 'i'))
        ) {
          option.value.style.display = 'none';
        } else {
          option.value.style.display = '';
        }
      });

      console.log('hi');
    });

    useOnWindow(
      'click',
      $((e) => {
        const target = e.target as HTMLElement;
        if (
          contextService.isTriggerExpandedSig.value === true &&
          !contextService.listBoxRefSig.value?.contains(target) &&
          !contextService.triggerRefSig.value?.contains(target)
        ) {
          contextService.isTriggerExpandedSig.value = false;
        }
      })
    );

    return (
      <div
        onKeyDown$={[
          $((e: QwikKeyboardEvent) => {
            if (e.key === 'Escape') {
              contextService.isTriggerExpandedSig.value = false;
              const inputElement = contextService.inputRefSig.value
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
