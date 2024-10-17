export const api = {
  "accordion": [
    {
      "accordion-content": []
    },
    {
      "accordion-context": []
    },
    {
      "accordion-heading": []
    },
    {
      "accordion-inline": []
    },
    {
      "accordion-item": [
        {
          "PublicAccordionItemProps": [
            {
              "comment": "The value associated with the accordion item.",
              "prop": "value",
              "type": "string"
            },
            {
              "comment": "When true, the accordion item is disabled.",
              "prop": "disabled",
              "type": "boolean"
            },
            {
              "comment": "Opens the accordion item in multiple mode.",
              "prop": "open",
              "type": "boolean"
            }
          ]
        }
      ]
    },
    {
      "accordion-root": [
        {
          "PublicAccordionRootProps": [
            {
              "comment": "If true, multiple items can be open at the same time.",
              "prop": "multiple",
              "type": "boolean"
            },
            {
              "comment": "@deprecated Use the multiple prop instead.",
              "prop": "behavior",
              "type": "'single' | 'multi'"
            },
            {
              "comment": "The reactive value controlling which item is open.",
              "prop": "'bind:value'",
              "type": "Signal<string | null>"
            },
            {
              "comment": "The initial value of the currently open item.",
              "prop": "value",
              "type": "string"
            },
            {
              "comment": "The initial index of the currently open item.",
              "prop": "initialIndex",
              "type": "number"
            },
            {
              "comment": "A QRL that is called when the selected item changes.",
              "prop": "onChange$",
              "type": "QRL<(value: string) => void>"
            },
            {
              "comment": "A map of the item indexes and their disabled state.",
              "prop": "itemsMap",
              "type": "Map<number, boolean>"
            },
            {
              "comment": "If true, the accordion is disabled.",
              "prop": "disabled",
              "type": "boolean"
            },
            {
              "comment": "If true, the accordion is collapsible.",
              "prop": "collapsible",
              "type": "boolean"
            },
            {
              "comment": "If true, the accordion is animated.",
              "prop": "animated",
              "type": "boolean"
            }
          ]
        }
      ]
    },
    {
      "accordion-trigger": []
    }
  ]
};