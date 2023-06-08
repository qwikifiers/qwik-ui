import {
  component$,
  Slot,
  useContext,
  useContextProvider,
  createContextId,
  useSignal,
  Signal,
  HTMLAttributes,
} from '@builder.io/qwik';

/*

    TODO: 
    
    Input Textbox - Role Combobox
    Listbox - Role Listbox

    Notes:

    https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-autocomplete-list/

    https://headlessui.com/react/combobox
    
    https://thejackshelton.notion.site/Combobox-e82cae2325914c3c82d4cbfcab574825?pvs=4


    Current thoughts for API implementation

    <AutocompleteLabel />
    <Autocomplete>
        <div>
            <AutocompleteInput />
            <AutocompleteButton />
        </div>
        <AutoCompleteListbox>
            <AutoCompleteOption />
        </AutoCompleteListbox>
    </Autocomplete>

    Side note: This is based off of both the ARIA combobox pattern linked above and headless UI

    In Headless UI Label is automatically the input value, unless specified otherwise

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

export type ButtonProps = {
  disabled?: boolean;
} & HTMLAttributes<HTMLElement>;

export const AutocompleteContextId =
  createContextId<AutocompleteContext>('autocomplete');

export const Autocomplete = component$(() => {
  return (
    <div>
      <Slot />
    </div>
  );
});

export const AutocompleteLabel = component$(() => {
  return (
    <label for="autocomplete-test">
      <Slot />
    </label>
  );
});

// Add required context here
export const AutocompleteInput = component$(() => {
  return <input id="autocomplete-test" role="combobox" />;
});

export const AutocompleteButton = component$(
  ({ disabled, ...props }: ButtonProps) => {
    return (
      <button>
        <Slot />
      </button>
    );
  }
);

export const AutocompleteListbox = component$(() => {
  return <ul role="listbox"></ul>;
});

export const AutocompleteOption = component$(() => {
  return (
    <li role="option">
      <Slot />
    </li>
  );
});
