export const api = {
  select: [
    {
      'hidden-select-option': [],
    },
    {
      'hidden-select': [],
    },
    {
      'select-description': [],
    },
    {
      'select-display-value': [],
    },
    {
      'select-error-message': [],
    },
    {
      'select-group-label': [],
    },
    {
      'select-group': [],
    },
    {
      'select-inline': [],
    },
    {
      'select-item-indicator': [],
    },
    {
      'select-item-label': [],
    },
    {
      'select-item': [
        {
          SelectItemProps: [
            {
              comment:
                'Internal index we get from the inline component. Please see select-inline.tsx',
              prop: '_index?',
              type: 'number;',
            },
            {
              comment: 'If true, item is not selectable or focusable.',
              prop: 'disabled?',
              type: 'boolean;',
            },
            {
              comment: 'Selected value associated with the item.',
              prop: 'value?',
              type: 'string;',
            },
          ],
        },
      ],
    },
    {
      'select-label': [],
    },
    {
      'select-listbox': [],
    },
    {
      'select-popover': [],
    },
    {
      'select-root': [
        {
          InternalSelectProps: [
            {
              comment:
                "When a value is passed, we check if it's an actual item value, and get its index at pre-render time.",
              prop: '_valuePropIndex?',
              type: 'number | null;',
            },
            {
              comment: 'Checks if the consumer added the label in their JSX',
              prop: '_label?',
              type: 'boolean;',
            },
            {
              comment:
                'Our source of truth for the items. We get this at pre-render time in the inline component, that way we do not need to call native methods such as textContent.',
              prop: '_itemsMap',
              type: 'TItemsMap;',
            },
          ],
        },
      ],
    },
    {
      'select-trigger': [],
    },
    {
      'use-select': [],
    },
  ],
};
