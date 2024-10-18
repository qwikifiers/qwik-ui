export const api = {
  "collapsible": [
    {
      "collapsible-content": []
    },
    {
      "collapsible-trigger": []
    },
    {
      "collapsible": [
        {
          "PublicCollapsibleRootProps": [
            {
              "comment": "The ID of the underlaying HTML element.",
              "prop": "id",
              "type": "string"
            },
            {
              "comment": "Uncontrolled initial expanded value.",
              "prop": "open",
              "type": "boolean | undefined"
            },
            {
              "comment": "Controlled expanded value, manages the collapsible content.",
              "prop": "'bind:open'",
              "type": "Signal<boolean>"
            },
            {
              "comment": "Function called when the collapsible opens or closes.",
              "prop": "onChange$",
              "type": "QRL<(open: boolean) => void>"
            },
            {
              "comment": "@deprecated use `onChange$` instead",
              "prop": "onOpenChange$",
              "type": "QRL<(open: boolean) => void>"
            },
            {
              "comment": "Disables the collapsible when true.",
              "prop": "disabled",
              "type": "boolean"
            },
            {
              "comment": "Passes reference to trigger instead of root.",
              "prop": "triggerRef",
              "type": "Signal<HTMLButtonElement>"
            },
            {
              "comment": "When false, collapsible will never collapse (will remain open).",
              "prop": "collapsible",
              "type": "boolean"
            },
            {
              "comment": "If true, supports previous accordion animations.",
              "prop": "accordionItem",
              "type": "boolean"
            }
          ]
        }
      ]
    },
    {
      "use-collapsible": []
    }
  ]
};