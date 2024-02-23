What do we absolutely need? I am talking about the bare minimum, but powerful functionality we need for a select component.

# Select Research

## Anatomy:

    <Select>
        <SelectTrigger />
        <SelectPopover>
            <SelectListbox>
                <SelectOption>
            </SelectListbox>
        </SelectPopover>
    </Select>

## Props:

    name: bind:selected
    type: Signal
    description: controlled selected value, manages the selected option.

    name: defaultSelected
    type: boolean
    description: uncontrolled selected value, sets the initial selected option.

    name: onSelectedChange$
    type: PropFunction
    description: Prop function called when the value changes.

    name: multiple
    type: boolean
    description: used for multi-select

## Keyboard Interactions:
