---
'@qwik-ui/headless': minor
---

# Combobox v2, New Dropdown Component, and Progress bar reaches beta!

0.5 continues our move towards a 1.0 release. It includes a few breaking changes to the Combobox in order to make sure that the components have a clear API.

Below is a migration guide of API's for the Combobox.

## Combobox

The combobox has been refactored from the ground up, including new features, components, and QOL updates.

### Anatomy changes

The new Combobox anatomy is as follows:

```tsx
import { component$ } from '@builder.io/qwik';
import { Combobox } from '@qwik-ui/headless';
import { LuCheck } from '@qwikest/icons/lucide';

export default component$(() => {
  return (
    <Combobox.Root>
      <Combobox.Label>label</Combobox.Label>

      <Combobox.Control>
        <Combobox.Input />
        <Combobox.Trigger>trigger</Combobox.Trigger>
      </Combobox.Control>

      <Combobox.Popover>
        <Combobox.Item>
          <Combobox.ItemLabel>item label</Combobox.ItemLabel>
          <Combobox.ItemIndicator>
            <LuCheck />
          </Combobox.ItemIndicator>
        </Combobox.Item>
      </Combobox.Popover>
    </Combobox.Root>
  );
});
```

### Anatomy Changes

1. **Combobox.Option** has been renamed to **Combobox.Item**:

   - The item is no longer restricted to a string value; any UI can be placed inside the item.
   - Use the `Combobox.ItemLabel` component to display the item's label, which becomes the item's value if no `value` prop is passed to the `Combobox.Item`. (required)

2. **Combobox.Listbox** has been deprecated.

3. **Combobox.ItemLabel** has been added:

   - Move the string value that was once inside `Combobox.Option` into `Combobox.ItemLabel`. (required)

4. **Combobox.ItemIndicator** has been added:

   - This component is used to render UI based on the selected state of the item. (optional)

5. **Combobox.Description** has been added:

   - The text rendered inside the description component is displayed to screen readers as an accessible description of the combobox. (optional)

6. **Combobox.ErrorMessage** has been added:

   - When this component is rendered, the Combobox will be marked as invalid. (optional)

7. **Combobox.HiddenNativeSelect** has been added:

   - A native select element allows the submission of forms with the combobox. This component is visually hidden and hidden from screen readers. (optional)

8. **Combobox.Group** has been added:

   - Used to visually group related items together. (optional)

9. **Combobox.GroupLabel** has been added:

   - Provides an accessible name for the group. (optional)

10. **Combobox.Empty** has been added:
    - Displays a message when there are no items to display.
    - Previously, an empty popup was displayed when the combobox was empty. The new default behavior is to close the popup unless the `Combobox.Empty` component is rendered. (optional)

### API Changes

#### Rendering Items (required)

The `optionRenderer$` prop on the `Combobox.Listbox` component has been deprecated.

Instead:

1. pass a `<Combobox.Item />` as a child of the `<Combobox.Popover />` component.
2. pass a `Combobox.ItemLabel` as a child of the `<Combobox.Item />` component.

It should look something like this:

```tsx
<Combobox.Popover>
  <Combobox.Item>
    <Combobox.ItemLabel>item label</Combobox.ItemLabel>
    {/* other content */}
  </Combobox.Item>
</Combobox.Popover>
```

You are now in full control of how the item is rendered. Because you control the rendering of the item, there is no need for the previous API's including the data's key values.

> `optionDisabledKey`, `optionValueKey`, and `optionLabelKey` props have been removed.

There is also no need to pass an `index` prop to the `Combobox.Item` component. It is handled automatically.

#### Pass in distinct values

The `value` prop has been added to the `Combobox.Item` component to allow for passing in a distinct value for the combobox.

For example, identifying a user by their ID, rather than the display username.

#### Add your own filter

Filters are an important part of the combobox. It was a design decision in this refactor to make filtering data as easy as possible to integrate with other tools and libraries.

The `filter$` prop has been replaced. Instead, items are by default filtered by the `includes` function.

To opt-out of the default filter, add the `filter={false}` prop to the `Combobox.Root` component, which will disable the default filter.

```tsx
import { component$, useSignal, useStyles$, useTask$ } from '@builder.io/qwik';
import { Combobox } from '@qwik-ui/headless';
import { LuCheck, LuChevronDown } from '@qwikest/icons/lucide';
import { matchSorter } from 'match-sorter';

export default component$(() => {
  useStyles$(styles);

  const inputValue = useSignal('');
  const filteredItems = useSignal<string[]>([]);

  const fruits = [
    'Apple',
    'Apricot',
    'Bilberry',
    'Blackberry',
    'Blackcurrant',
    'Currant',
    'Cherry',
    'Coconut',
  ];

  useTask$(({ track }) => {
    track(() => inputValue.value);

    filteredItems.value = matchSorter(fruits, inputValue.value);
  });

  return (
    <Combobox.Root filter={false}>
      <Combobox.Label>Fruits</Combobox.Label>
      <Combobox.Control>
        <Combobox.Input bind:value={inputValue} />
        <Combobox.Trigger>
          <LuChevronDown />
        </Combobox.Trigger>
      </Combobox.Control>
      <Combobox.Popover gutter={8}>
        {filteredItems.value.map((fruit) => (
          <Combobox.Item key={fruit}>
            <Combobox.ItemLabel>{fruit}</Combobox.ItemLabel>
            <Combobox.ItemIndicator>
              <LuCheck />
            </Combobox.ItemIndicator>
          </Combobox.Item>
        ))}
      </Combobox.Popover>
    </Combobox.Root>
  );
});
```

The above example uses the `matchSorter` function from the `match-sorter` library to filter the items.

#### `bind:value` instead of `bind:selectedIndex`

bind:value has been added in favor of what was previously used to reactively control the combobox, bind:selectedIndex.

> This change was needed to create a more consistent API across components, but also keeping the state in the case of custom filters.

`onChange$` has been added to the `Combobox.Root` component so that you can listen to when the selected value changes.

#### Add initial values to the combobox

The `value` prop has been added to the `Combobox.Root` component to select the initial value of the combobox when it is rendered.

> `defaultLabel` has been removed, as it does not reflect the selected state of the combobox.

#### Input state management

`bind:inputValue` (on the Root) has been replaced by using the `bind:value` prop on the `<Combobox.Input />` component instead.

You can also now listen to when the input value changes by using the `onInput$` prop on the `<Combobox.Root />` component.

#### Passing refs to the combobox (experimental)

The combobox is the first component to support passing refs! You can now pass a ref of your own to any component inside the combobox. This is an experimental feature, and we are still working on it, use at your own risk.

```tsx
const inputRef = useSignal<HTMLInputElement>();

<Combobox.Input ref={inputRef} />
<button onClick$={() => (inputRef.value?.focus())}>Focus input</button>
```

#### Multiple selections

You can now select multiple items by passing the `multiple` prop to the `<Combobox.Root />` component.

#### removeOnBackspace

When in multiple selection mode, and the `removeOnBackspace` prop has been added to the `Combobox.Root` component, selected items can be removed by pressing the backspace key. (when the input is empty)

#### Managing display values

`bind:displayValue` has been added to the `Combobox.Root` component to allow for grabbing the updated display values of the combobox.

> This allows for full control over each display item. For example, a couple of display values shown as pills.

#### Item indicators

The item indicator shows when the item is selected. Inside can be the UI of choice.

#### `bind:open` instead of `bind:isListboxOpen`

bind:open has been added to control the open state of the listbox, replacing bind:isListboxOpen.

`onOpenChange$` has been added to the `Combobox.Root` component so that you can listen to when the popup opens or closes.

#### Focus State Management

bind:isInputFocused has been deprecated. Instead, if you decide to manage focus state using event handlers like onFocus$ and onBlur$. OR pass a ref to the `Combobox.Input` component.

#### Placeholders

The placeholder prop has been added to the `Combobox.Root` component to allow for a custom placeholder.

#### Environment

Like many of the latest components in Qwik UI, each function of the Combobox has been optimized to run in both SSR or CSR automatically depending on the environment.

#### Looping

Looping is now opt-in by default. To enable looping, add the `loop` prop to the `Combobox.Root` component.

#### Scrolling

When a scrollbar is present, the combobox will now properly scroll to the selected item. The scroll behavior can be customized using the `scrollOptions` prop on the `Combobox.Root` component.

#### Forms

The Combobox now supports form submissions. To enable this:

1.  Add the `name` prop to the `Combobox.Root` component, with the name of the Combobox form field.

2.  Add the `<Combobox.HiddenNativeSelect />` component inside of the `<Combobox.Root />` component.

#### Validation

The Combobox now supports validation. It was a design decision to make validation as easy as possible to integrate with other tools and libraries, such as Modular Forms.

A component is invalid when the `Combobox.ErrorMessage` component is rendered. This component provides an accessible description of the error to assistive technologies.

### Floating / Top layer items

The props previously on the `Combobox.Listbox`, have been moved to the `Combobox.Popover` component to be more consistent with the rest of the Qwik UI components.

`placement` has been deprecated in favor of `floating`, which can be a boolean or the direction of the floating element.

`autoPlacement` has been removed, as `flip` should be used instead.

Ex: `floating={true}` or `floating="top"`

### Keyboard interactions

Key
Description

| Key       | Description                                          |
| --------- | ---------------------------------------------------- |
| Enter     | Selects a highlighted item when open.                |
| ArrowDown | Opens the combobox or moves focus down.              |
| ArrowUp   | Opens the combobox or moves focus up.                |
| Home      | When focus is on an item, moves focus to first item. |
| End       | When focus is on an item, moves focus to last item.  |
| Esc       | Closes the combobox and moves focus to the trigger.  |
| Tab       | Moves focus to the next focusable element.           |

The Enter key will toggle the selection of the highlighted item without closing the combobox if an item is already selected, otherwise it will close the popup.

### Multi Select

When in multi select mode, additional keyboard interactions are available.

| Key   | Description                                                                 |
| ----- | --------------------------------------------------------------------------- |
| Enter | Toggles the selection of the highlighted item without closing the combobox. |

### Data Attributes

- `data-invalid` is added to the combobox when the combobox is invalid.
- `data-open` is added to the combobox when the combobox is open.
- `data-closed` is added to the combobox when the combobox is closed.
- `data-highlighted` is added to the combobox item when the item is highlighted.
- `data-selected` is added to the combobox item when the item is selected.
- `data-disabled` is added to the combobox item when the item is disabled.

### Accessibility

Announcements to the Combobox are more consistent and follow the [WAI-ARIA Combobox design pattern](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/).

So far, the Combobox has been tested with VoiceOver, Axe, and NVDA.

## Select

The select component also includes some improvments

### Accessibility

Announcements to the Select are more consistent and follow the [WAI-ARIA Listbox design pattern](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/).

So far, the Select has been tested with VoiceOver, Axe, and NVDA.

## Dropdown

A new component has been added to Qwik UI, the Dropdown. It is currently in a draft state, and is not yet ready for production use. We will be working on it more deeply in the near future.

### Anatomy

Here is the initial API:

```tsx
import { component$ } from '@builder.io/qwik';
import { Dropdown } from '@qwik-ui/headless';
export default component$(() => {
return (
<Dropdown.Root>
  <Dropdown.Trigger>
    Open Dropdown
  </Dropdown.Trigger>
  <Dropdown.Popover>
    <Dropdown.Arrow />
    <Dropdown.Content>
      <Dropdown.Group>
        <Dropdown.GroupLabel>
          Group 1
        </Dropdown.GroupLabel>
      </Dropdown.Group>
      <Dropdown.Separator />
    </Dropdown.Content>
  </Dropdown.Popover>
</Dropdown.Root>
```

Feel free to play around with it! Feedback is very appreciated.

## Progress Bar

The progress bar has been around for a while, it has finally reached a **beta state**, make sure to open an issue on the [Qwik UI repo](https://github.com/qwikifiers/qwik-ui/issues) if you run into any problems.
