## Single Selection

- **On Focus:**
  - If no option is selected, the first option receives focus (and may be automatically selected).
  - If an option is selected, focus is set on the selected option.

## Multi-Selection

- **On Focus:**
  - If no option is selected, the first option receives focus (no automatic selection change).
  - If options are selected, focus is set on the first selected option.

## Keyboard Navigation

- **Down Arrow:** Moves focus to the next option (optionally selects in single-select).
- **Up Arrow:** Moves focus to the previous option (optionally selects in single-select).
- **Home (Optional):** Moves focus to the first option (optionally selects in single-select).
- **End (Optional):** Moves focus to the last option (optionally selects in single-select).

## Type-Ahead

- **Single Character:** Focus moves to the next item starting with the typed character.
- **Multiple Characters:** Focus moves to the next item starting with the typed string.

## Multiple Selection: Recommended Model

This model does not require holding modifier keys while navigating the list.

- **Space:** Toggle selection of the focused option.
- **Shift + Down Arrow:** Move focus and toggle selection of the next option.
- **Shift + Up Arrow:** Move focus and toggle selection of the previous option.
- **Shift + Space:** Select items from the most recently selected to the focused item.
- **Ctrl + Shift + Home:** Select from the focused option to the first option.
- **Ctrl + Shift + End:** Select from the focused option to the last option.
- **Ctrl + A:** Select all options (or unselect if all are selected).

## Note

- **Focus vs. Selection:** DOM focus (active element) is distinct from the selected state. For more details, see the differences between focus and selection.
- **aria-activedescendant:** The listbox role supports this property, which allows keyboard navigation without moving DOM focus among options. See Managing Focus in Composites Using aria-activedescendant for details.
- **Selection Follows Focus:** In single-select listboxes, moving focus may optionally unselect the previous option and select the newly focused one. This can be helpful or harmful for accessibility. See Deciding When to Make Selection Automatically Follow Focus for guidance.
- **Select All/Unselect All:** Implementing separate controls (e.g., buttons) for these actions improves accessibility.
- **Horizontal Listbox:** If options are arranged horizontally:
  - **Down Arrow:** Functions as Right Arrow.
  - **Up Arrow:** Functions as Left Arrow.

## WAI-ARIA Roles, States, and Properties

- **Listbox Role:**

  - The container element has `role="listbox"`.
  - Each option has `role="option"` and is contained within the listbox or a group within the listbox.

- **Grouped Options:**

  - Groups contain at least one option.
  - Each group has an accessible name via `aria-label` or `aria-labelledby`.

- **Labeling:**

  - The listbox has a visible label referenced by `aria-labelledby` or a value for `aria-label`.

- **Multi-Selection:**

  - If the listbox supports multiple selections, `aria-multiselectable` is set to `true`.

- **Selection State:**

  - Use either `aria-selected` or `aria-checked` to indicate selection, not both.
  - Selected options have `aria-selected="true"` or `aria-checked="true"`.
  - Unselected options have `aria-selected="false"` or `aria-checked="false"`.

- **Focus vs. Selection:**

  - The selected state is distinct from focus unless "selection follows focus" is implemented.

- **Dynamic Loading:**

  - Use `aria-setsize` and `aria-posinset` for dynamically loaded options.

- **Orientation:**
  - For horizontal listboxes, set `aria-orientation="horizontal"`.

### Note

- **Choosing `aria-selected` vs. `aria-checked`:**

  - Use `aria-selected` for single-select and `aria-checked` for multi-select widgets.
  - Consistency across the site or app is crucial.
  - Avoid using both properties in the same listbox unless absolutely necessary and clearly differentiated.

- **Focus Management:**
  - Ensure the visual focus order matches the assistive technology reading order if using `aria-owns`.
