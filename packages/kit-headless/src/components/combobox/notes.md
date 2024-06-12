# Combobox Component Research

## Anatomy:

```tsx
<Combobox.Root>
  <Combobox.Label />
  <Combobox.Input />
  <Combobox.Trigger />
  <Combobox.Description />
  <Combobox.ErrorMessage />
  <Combobox.Popover>
    <Combobox.Listbox>
      <Combobox.Item>
        <Combobox.ItemLabel />
        <Combobox.ItemIndicator />
      </Combobox.Item>
    </Combobox.Listbox>
  </Combobox.Popover>
</Combobox.Root>
```

## w/ Groups

```tsx
<Combobox.Group>
  <Combobox.GroupLabel />
  <Combobox.Item>
    <Combobox.ItemLabel />
    <Combobox.ItemIndicator />
  </Combobox.Item>
</Combobox.Group>
```

Types of comboboxes:

- No autocomplete -> does not filter listbox when typing
- Manual selection -> Does not highlight option when typing
- Autocomplete -> The first suggestion is highlighted and becomes the value when losing focus unless changed by the user.
- Inline -> completes the input value as the user types

## Features:

    - [ ] Closes when no matching options

## Keyboard Interactions:

    Only the input is tabbable

- **Down Arrow**:
  - If the popup is available, moves focus into the popup.
  - If a suggestion is auto-selected, moves focus to the next suggestion.
  - Otherwise, focuses the first element in the popup.
- **Up Arrow (Optional)**:
  - If the popup is available, focuses the last element in the popup.
- **Escape**:
  - Dismisses the popup if visible.
  - Optionally, clears the combobox if the popup is hidden.
- **Enter**:
  - If editable and a suggestion is selected, accepts the suggestion.
  - In some contexts, performs a default action (e.g., adding a recipient in messaging apps).
- **Printable Characters**:
  - If editable, types characters in the combobox.
  - If not editable, optionally moves focus to a value starting with the typed characters.
- **Alt + Down Arrow (Optional)**:
  - Displays the popup without moving focus if not already displayed.
- **Alt + Up Arrow (Optional)**:
  - If the popup is displayed, returns focus to the combobox and closes the popup.

## WAI-ARIA Roles, States, and Properties:

    - The button controlling the disclosure has `role="button"` and `aria-expanded` attribute which indicates the visibility state of the content.
    - Optionally, `aria-controls` can be used on the button to reference the id of the content container.

## Use Cases:

- FAQ sections
- Navigation menus with collapsible sections
- Hiding and revealing more detailed content

## Accessibility Considerations:

- Ensure that the state (expanded or collapsed) is clearly communicated to assistive technologies.
- Provide visual indicators (like arrows) that hint at the action of the button.
- Consider dynamically loading content as an enhancement, not a requirement, for the functionality to work.

## Downsides:

- Dynamic content loading can introduce complexity in maintaining state and accessibility.
