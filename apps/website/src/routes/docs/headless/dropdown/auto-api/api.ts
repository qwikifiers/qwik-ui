export const api = {
  dropdown: [
    {
      'dropdown-checkbox-item': [
        {
          DropdownCheckboxItemProps: [
            {
              comment:
                '\n    A signal that controls the current checked value (controlled).\n   ',
              prop: "'bind:checked'",
              type: 'Signal<boolean>',
            },
            {
              comment: '\n    QRL handler that runs when the checked value changes.\n   ',
              prop: 'onChange$',
              type: 'QRL<(checked: boolean) => void>',
            },
          ],
        },
      ],
    },
    {
      'dropdown-content': [],
    },
    {
      'dropdown-group-label': [],
    },
    {
      'dropdown-group': [],
    },
    {
      'dropdown-inline': [],
    },
    {
      'dropdown-item-indicator': [],
    },
    {
      'dropdown-item': [
        {
          DropdownItemProps: [
            {
              comment:
                ' Internal index we get from the inline component. Please see dropdown-inline.tsx ',
              prop: '_index',
              type: 'number',
            },
            {
              comment: ' If true, item is not selectable or focusable. ',
              prop: 'disabled',
              type: 'boolean',
            },
            {
              comment: ' If true, dropdown will close after selecting the item. ',
              prop: 'closeOnSelect',
              type: 'boolean',
            },
            {
              comment: '\n    QRL handler that runs when the user selects an item.\n   ',
              prop: 'onClick$',
              type: 'QRL<() => void>',
            },
          ],
        },
      ],
    },
    {
      'dropdown-popover': [],
    },
    {
      'dropdown-radio-group': [],
    },
    {
      'dropdown-radio-item': [],
    },
    {
      'dropdown-root': [
        {
          DropdownProps: [
            {
              comment: ' A signal that controls the current open state (controlled). ',
              prop: "'bind:open'",
              type: 'Signal<boolean>',
            },
            {
              comment:
                '\n    QRL handler that runs when the dropdown opens or closes.\n    @param open The new state of the dropdown.\n   \n   ',
              prop: 'onOpenChange$',
              type: 'QRL<(open: boolean) => void>',
            },
            {
              comment:
                '\n     The native scrollIntoView method is used to scroll the options into view when the user highlights an option. This allows customization of the scroll behavior.\n   ',
              prop: 'scrollOptions',
              type: 'ScrollIntoViewOptions',
            },
            {
              comment:
                '\n     Enables looped behavior when the user navigates through the options using the arrow keys.\n   ',
              prop: 'loop',
              type: 'boolean',
            },
          ],
        },
      ],
    },
    {
      'dropdown-separator': [],
    },
    {
      'dropdown-trigger': [],
    },
    {
      'use-dropdown-item': [],
    },
    {
      'use-dropdown': [],
    },
  ],
};
