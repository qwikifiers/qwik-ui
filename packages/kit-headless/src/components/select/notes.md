What do we absolutely need? I am talking about the bare minimum, but powerful functionality we need for a select component.

Inspiration:

- Radix UI
- Kobalte UI
- Melt UI

What do they all have in common? How do people use them? What are the most important features?

# Select Research

## Anatomy:

    <Select>
        <SelectTrigger>
            <SelectValue>
        </SelectTrigger>
        <SelectPopover>
            <SelectListbox>
                <SelectOption />
                <SelectGroup label="">
                    <SelectOption />
                </SelectGroup>
            </SelectListbox>
        </SelectPopover>
    </Select>

## Features:

    - [x] Single Select
    - [ ] Multi Select
    - [x] Controlled or uncontrolled
    - [ ] Keyboard Interactions
    - [x] Grouped options
    - [x] Typeahead support (user typing / filter)
    - [ ] RTL support
    - [x] Scrollable
    - [ ] Aria (controls, roles, etc)

## Props:

    ### State

    name: value
    type: string
    description: uncontrolled select value

    name: bind:value
    type: Signal
    description: controlled selected value, manages the selected option.

    name: onChange$
    type: PropFunction
    description: function called when the selected value changes.

    name: onOpenChange$
    type: PropFunction
    description: function called when the listbox opens or closes.

    ---

    ### Behavior

    name: placeholder
    type: string
    description: sets a placeholder instead of a selected value.

    name: disabled
    type: boolean
    description: When true, the option is disabled.

    name: multiple
    type: boolean
    description: used for multi-select

    name: loop
    type: boolean
    description: Determines if focus cycles from the last option back to the first, or vice versa.

    ---

    ### Forms

    name: name
    type: string
    description: The name attribute identifies the select element when submitting the form.

    name: required
    type: boolean
    description: When true, the user must select a value to submit the form.

## Keyboard Interactions:

    key: Space
    description: Pressing space opens the select menu and highlights the chosen option. If an option is highlighted, pressing space selects it.

    key: Enter
    description: Pressing Enter opens the select menu and highlights the selected option. If an option is highlighted, pressing Enter selects it.

    key: ArrowDown
    description: Pressing ArrowDown opens the select menu if it's closed. If an option is focused, it moves the focus to the next option.

    key: ArrowUp
    description: Pressing ArrowUp opens the select menu if it's closed. If an option is focused, it moves the focus to the previous option.

    key: Escape
    description: Pressing Escape closes the select menu. The trigger is then focused.
