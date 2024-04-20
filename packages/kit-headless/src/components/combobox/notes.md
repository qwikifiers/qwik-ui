# Combobox Research

## Anatomy:

    import { Combobox } from '@qwik-ui/headless';

    <Combobox.Root>
        <Combobox.Label />
        <Combobox.Input />
        <Combobox.Trigger />
        <Combobox.Description />
        <Combobox.Error />

        <Combobox.Popover>
            <Combobox.Listbox>
                <Combobox.Option />
            <Combobox.Listbox>

            <Combobox.Group>
                <Combobox.Listbox>
                    <Combobox.Option />
                <Combobox.Listbox>
            </Combobox.Group>
        </Combobox.Popover>
    </Combobox.Root>

## Features:

    - [ ] Single Select
    - [ ] Single Select Keyboard Interactions
    - [ ] Multi Select
    - [ ] Multi Select Keyboard Interactions
    - [ ] Disabled options
    - [ ] Option Filtering
    - [ ] Controlled or uncontrolled
    - [ ] Grouped options
    - [ ] Looping
    - [ ] RTL support
    - [ ] Form support
    - [ ] Top Layer support
    - [ ] Scrollable
    - [ ] Aria (controls, roles, etc)

## Props:

    ## Every Component:

    as - The HTML tag to render the component.

    ## Root:

    bind:value - Reactive value, manages the selected option.

    value - initial selected value

    onChange$ - function called when the selected value changes.

    bind:open - Reactive state, manages the listbox open state.

    open - initial open state

    onOpenChange$ - function called when the listbox opens or closes.

    onInput$ - function called when the user types in the input field.

    name - The name of the combobox. Submitted with its owning form as part of a name/value pair.

    autoComplete - Describes the type of autocomplete functionality the input should provide if any. See MDN

    disabled - whether the combobox is disabled

    required - Whether the user must select an item before the owning form can be submitted.

    filter - "startsWith" | "endsWith" | "contains" | ((option: Option, inputValue: string) => boolean)

    multiple - enable multi-select

    data-disabled - added when the option is disabled

    ## Trigger:

    data-open - added when the listbox is open

    data-closed - added when the listbox is closed

    ## Option:

    data-disabled - added when the option is disabled

    data-highlighted - added when the option is highlighted

    data-selected - added when the option is selected

## Keyboard Interactions:

    key: Enter
    description: selects the highlighted option.

    key: ArrowDown
    description: Pressing ArrowDown opens the select menu if it's closed. If an option is focused, it moves the focus to the next option OR first enabled one.

    key: Alt + ArrowDown
    description: When focus is on the input, opens the combobox.

    key: ArrowUp
    description: Pressing ArrowUp opens the select menu if it's closed. If an option is focused, it moves the focus to the previous option OR last enabled one.

    key: Alt + ArrowUp
    description: When focus is on the input, closes the combobox.

    key: Home
    description: When focus is on the input, moves the focus to the first enabled option.

    key: End
    description: When focus is on the input, moves the focus to the last enabled option.

    key: Escape
    description: When the combobox is open, closes the combobox.
    When the combobox is closed, clear the input and selection.
