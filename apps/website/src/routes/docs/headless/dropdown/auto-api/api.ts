export const api = {
  dropdown: [
    {
      'dropdown-checkbox-item': [
        {
          DropdownCheckboxItemProps: [
            {
              comment: 'A signal that controls the current checked value (controlled).',
              prop: "'bind:checked'",
              type: 'Signal<boolean>',
            },
            {
              comment: 'QRL handler that runs when the checked value changes.',
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
                'Internal index we get from the inline component. Please see dropdown-inline.tsx',
              prop: '_index',
              type: 'number',
            },
            {
              comment: 'If true, item is not selectable or focusable.',
              prop: 'disabled',
              type: 'boolean',
            },
            {
              comment: 'If true, dropdown will close after selecting the item.',
              prop: 'closeOnSelect',
              type: 'boolean',
            },
            {
              comment: 'QRL handler that runs when the user selects an item.',
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
              comment: 'A signal that controls the current open state (controlled).',
              prop: "'bind:open'",
              type: 'Signal<boolean>',
            },
            {
              comment:
                'QRL handler that runs when the dropdown opens or closes.\n    @param open The new state of the dropdown.',
              prop: 'onOpenChange$',
              type: 'QRL<(open: boolean) => void>',
            },
            {
              comment:
                'The native scrollIntoView method is used to scroll the options into view when the user highlights an option. This allows customization of the scroll behavior.',
              prop: 'scrollOptions',
              type: 'ScrollIntoViewOptions',
            },
            {
              comment:
                'Enables looped behavior when the user navigates through the options using the arrow keys.',
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
