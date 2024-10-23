export const api = {
  "combobox": [
    {
      "combobox-context": []
    },
    {
      "combobox-control": []
    },
    {
      "combobox-description": []
    },
    {
      "combobox-empty": []
    },
    {
      "combobox-error-message": []
    },
    {
      "combobox-group-label": []
    },
    {
      "combobox-group": []
    },
    {
      "combobox-hidden-option": []
    },
    {
      "combobox-hidden-select": []
    },
    {
      "combobox-inline": []
    },
    {
      "combobox-input": []
    },
    {
      "combobox-item-indicator": []
    },
    {
      "combobox-item-label": []
    },
    {
      "combobox-item": [
        {
          "PublicComboboxItemProps": [
            {
              "comment": "Internal index we get from the inline component. Please see combobox-inline.tsx",
              "prop": "_index",
              "type": "number"
            },
            {
              "comment": "If true, item is not selectable or focusable.",
              "prop": "disabled",
              "type": "boolean"
            },
            {
              "comment": "Selected value associated with the item.",
              "prop": "value",
              "type": "string"
            }
          ]
        }
      ]
    },
    {
      "combobox-label": []
    },
    {
      "combobox-listbox": []
    },
    {
      "combobox-popover": []
    },
    {
      "combobox-root": [
        {
          "PublicComboboxRootProps": [
            {
              "comment": "A signal that controls the current selected value (controlled).",
              "prop": "'bind:value'",
              "type": "Signal<TMultiple<M>>"
            },
            {
              "comment": "A signal that controls the current open state (controlled).",
              "prop": "'bind:open'",
              "type": "Signal<boolean>"
            },
            {
              "comment": "eslint-disable-next-line @typescript-eslintno-explicit-any",
              "prop": "'bind:displayValue'",
              "type": "Signal<TMultiple<M>>"
            },
            {
              "comment": "QRL handler that runs when a select value changes.\n    @param value The new value as a string.",
              "prop": "onChange$",
              "type": "QRL<(value: TMultiple<M>) => void>"
            },
            {
              "comment": "QRL handler that runs when the listbox opens or closes.\n    @param open The new state of the listbox.",
              "prop": "onOpenChange$",
              "type": "QRL<(open: boolean) => void>"
            },
            {
              "comment": "The native scrollIntoView method is used to scroll the options into view when the user highlights an option. This allows customization of the scroll behavior.",
              "prop": "scrollOptions",
              "type": "ScrollIntoViewOptions"
            },
            {
              "comment": "Enables looped behavior when the user navigates through the options using the arrow keys.",
              "prop": "loop",
              "type": "boolean"
            },
            {
              "comment": "The name of the select element, used when submitting an HTML form. See [MDN](https:developer.mozilla.orgen-USdocsWebHTMLElementselect#name).",
              "prop": "name",
              "type": "string"
            },
            {
              "comment": "Specifies that the user must select a value before submitting the form. See [MDN](https:developer.mozilla.orgen-USdocsWebHTMLElementselect#required).",
              "prop": "required",
              "type": "boolean"
            },
            {
              "comment": "If `true`, prevents the user from interacting with the select.",
              "prop": "disabled",
              "type": "boolean"
            },
            {
              "comment": "If `true`, allows multiple selections.",
              "prop": "multiple",
              "type": "M"
            },
            {
              "comment": "If true, the combobox is invalid.",
              "prop": "invalid",
              "type": "boolean"
            },
            {
              "comment": "If true, the combobox will filter the items based on the input value based on the include",
              "prop": "filter",
              "type": "boolean"
            },
            {
              "comment": "Handler that runs when the input value changes.",
              "prop": "onInput$",
              "type": "QRL<(value: string) => void>"
            },
            {
              "comment": "Handler that runs when there are no visible items in the listbox.",
              "prop": "onEmpty$",
              "type": "QRL<() => void>"
            },
            {
              "comment": "Placeholder text for the input.",
              "prop": "placeholder",
              "type": "string"
            },
            {
              "comment": "Checks if the Combobox.Empty component was added.",
              "prop": "hasEmptyComp",
              "type": "boolean"
            },
            {
              "comment": "Checks if the Combobox.ErrorMessage component was added.",
              "prop": "hasErrorComp",
              "type": "boolean"
            }
          ]
        }
      ]
    },
    {
      "combobox-trigger": []
    },
    {
      "use-combobox": []
    }
  ]
};
