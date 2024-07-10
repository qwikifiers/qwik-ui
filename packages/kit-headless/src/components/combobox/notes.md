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

    Critical:
    - [x] Single selection
    - [x] Single selection keyboard navigation
    - [x] Reactive or initial values
    - [ ] Open/Close listbox based on typing, focus, or manually
    - [x] Disabled options
    - [x] Tab stop focus management
    - [x] A11y components / labels
    - [x] Item Groups
    - [ ] Placeholder (check if needed? or if we can use the input placeholder)
    - [ ] Custom filter function
    - [ ] Form and validation support
    - [x] Multiple selection
    - [ ] Closes when no matching options

    Advanced:
    - [ ] Browser autofill with a native hidden select

## Props:

### Root:

name: multiple
description: Whether the combobox allows multiple selections.

name: value
description: The initial selected value of the combobox.

name: bind:value
description: Reactive selected value of the combobox.

name: onChange$
description: Callback when the selected value changes.

name: onInput$
description: Callback when the user types in the combobox.

name: open
description: initial open state of the combobox.

name: bind:open
description: Reactive open state of the combobox.

name: onOpenChange$

name: disabled
description: Whether the combobox is disabled.

loop:
description: highlighted options loop from first to last

name: filter$
description: the function used to filter the listbox options.
type: "startsWith" | "endsWith" | "contains" | QRL<(value: string) => boolean>

name: name
description: the name of the combobox.

name: required
description: whether the combobox is required.

autoComplete:
description: Hint for form autofill feature

### Data Attributes:

data-disabled Present when the item is disabled.

data-selected Present when the item is selected.

data-highlighted Present when the item is highlighted.

advanced:

name: debounce
description: makes sure that your code is only triggered once per user input.

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

  ### Note on Text Editing Keys

  **Standard single-line text editing keys include:**

  - **Input:** Typing characters
  - **Cursor Movement:** Arrow keys, Home, End
  - **Selection:** Shift + Arrow keys, Ctrl/Cmd + A
  - **Text Manipulation:** Backspace, Delete, Ctrl/Cmd + X/C/V (Cut/Copy/Paste)

  **Key Points:**

  - **Platform-Dependent:** Key assignments vary by operating system.
  - **Browser Reliance:** Use HTML input elements with type="text" or elements with the contenteditable attribute to leverage browser-provided text editing functions.
  - **JavaScript Interference:** Avoid capturing key events for standard editing keys to ensure browser functionality is not disrupted.

## Listbox popup interaction

- **Enter**:
  - Accepts the focused option in the listbox by closing the popup, placing the accepted value in the combobox, and if the combobox is editable, placing the input cursor at the end of the value.
- **Escape**:
  - Closes the popup and returns focus to the combobox. Optionally, if the combobox is editable, clears the contents of the combobox.
- **Down Arrow**:
  - Moves focus to and selects the next option. If focus is on the last option, either returns focus to the combobox or does nothing.
- **Up Arrow**:
  - Moves focus to and selects the previous option. If focus is on the first option, either returns focus to the combobox or does nothing.
- **Right Arrow**:
  - If the combobox is editable, returns focus to the combobox without closing the popup and moves the input cursor one character to the right. If the input cursor is on the right-most character, the cursor does not move.
- **Left Arrow**:
  - If the combobox is editable, returns focus to the combobox without closing the popup and moves the input cursor one character to the left. If the input cursor is on the left-most character, the cursor does not move.
- **Home (Optional)**:
  - Either moves focus to and selects the first option or, if the combobox is editable, returns focus to the combobox and places the cursor on the first character.
- **End (Optional)**:
  - Either moves focus to the last option or, if the combobox is editable, returns focus to the combobox and places the cursor after the last character.
- **Any printable character**:
  - If the combobox is editable, returns the focus to the combobox without closing the popup and types the character.
  - Otherwise, moves focus to the next option with a name that starts with the characters typed.
- **Backspace (Optional)**:
  - If the combobox is editable, returns focus to the combobox and deletes the character prior to the cursor.
- **Delete (Optional)**:
  - If the combobox is editable, returns focus to the combobox, removes the selected state if a suggestion was selected, and removes the inline autocomplete string if present.

> DOM focus stays on the combobox. Assistive technology focus moves within the listbox using `aria-activedescendant`. Only one suggested value can be selected at a time.

# ARIA Roles, States, and Properties for Combobox with Listbox

1. **Combobox Input Element:**

   - Has `role="combobox"`.
   - `aria-controls` references the listbox element (set when the listbox is visible).

2. **Listbox Element:**

   - Has `role="listbox"`.

3. **Visibility States:**

   - `aria-expanded` is `false` when the listbox is not visible.
   - `aria-expanded` is `true` when the listbox is visible.

4. **Focus Management:**

   - DOM focus is on the combobox element when it receives focus.
   - When a descendant of the listbox is focused, DOM focus remains on the combobox, and `aria-activedescendant` refers to the focused element within the listbox.

5. **Selection Indication:**

   - The selected value in the listbox has `aria-selected="true"`.

6. **Labeling:**

   - If the combobox has a visible label and can be labeled using the HTML `label` element, it is labeled using the `label` element.
   - Otherwise, the combobox element has `aria-labelledby` set to the labeling element or `aria-label` if no visible label is present.

7. **Autocomplete Behavior:**
   - `aria-autocomplete` values:
     - `none`: Suggested values are the same regardless of typed characters.
     - `list`: Suggested values complete or correspond to typed characters.
     - `both`: Suggested values complete or correspond to typed characters, with the completion string appearing inline.
