# Changelog

## 0.5.0

### Minor Changes

- # Combobox v2, New Dropdown Component, and Progress bar reaches beta! (by [@thejackshelton](https://github.com/thejackshelton) in [#838](https://github.com/qwikifiers/qwik-ui/pull/838))

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

  The `optionRenderer# Changelog prop on the `Combobox.Listbox` component has been deprecated.

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

  The `filter# Changelog prop has been replaced. Instead, items are by default filtered by the `includes` function.

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

  `onChange# Changelog has been added to the `Combobox.Root` component so that you can listen to when the selected value changes.

  #### Add initial values to the combobox

  The `value` prop has been added to the `Combobox.Root` component to select the initial value of the combobox when it is rendered.

  > `defaultLabel` has been removed, as it does not reflect the selected state of the combobox.

  #### Input state management

  `bind:inputValue` (on the Root) has been replaced by using the `bind:value` prop on the `<Combobox.Input />` component instead.

  You can also now listen to when the input value changes by using the `onInput# Changelog prop on the `<Combobox.Root />` component.

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

  `onOpenChange# Changelog has been added to the `Combobox.Root` component so that you can listen to when the popup opens or closes.

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

### Patch Changes

- Enable select item indicator styling by passing down properties (by [@juanpmarin](https://github.com/juanpmarin) in [#857](https://github.com/qwikifiers/qwik-ui/pull/857))

- We are adding the final set of popover tests. With this we should now have full coverage for both current and legacy browsers. (by [@cwoolum](https://github.com/cwoolum) in [#831](https://github.com/qwikifiers/qwik-ui/pull/831))

- 🐞🩹 Only run single modal close step (by [@RumNCodeDev](https://github.com/RumNCodeDev) in [#845](https://github.com/qwikifiers/qwik-ui/pull/845))

- Chromium 109-113 did not properly support the popover but reported that they did. This led to the polyfill not activating which caused our E2E tests to break. We are dropping down to Chromium 108 to validate the polyfill as users of Chrome would see it before the popover API was supported. (by [@cwoolum](https://github.com/cwoolum) in [#827](https://github.com/qwikifiers/qwik-ui/pull/827))

## 0.4.4

### Patch Changes

- ✨ new Select.ErrorMessage component (by [@thejackshelton](https://github.com/thejackshelton) in [#825](https://github.com/qwikifiers/qwik-ui/pull/825))

  feat: data-invalid attribute to style when the select is invalid

  feat: new Select.Description component

## 0.4.3

### Patch Changes

- 🐞🩹 select validates correctly with modular forms (by [@thejackshelton](https://github.com/thejackshelton) in [#814](https://github.com/qwikifiers/qwik-ui/pull/814))

- refactor: improved select focus navigation (by [@thejackshelton](https://github.com/thejackshelton) in [#822](https://github.com/qwikifiers/qwik-ui/pull/822))

- 🐞🩹 select can now be reactively disabled (by [@thejackshelton](https://github.com/thejackshelton) in [#823](https://github.com/qwikifiers/qwik-ui/pull/823))

## 0.4.2

### Patch Changes

- ✨ accordion items can now open without a value using the `open` prop. use only in multiple mode. (by [@thejackshelton](https://github.com/thejackshelton) in [#803](https://github.com/qwikifiers/qwik-ui/pull/803))

## 0.4.1

### Patch Changes

- Fix 0.4 external packages not found (by [@maiieul](https://github.com/maiieul) in [#798](https://github.com/qwikifiers/qwik-ui/pull/798))

## 0.4.0

### Minor Changes

- ## 100% Lazy execution (by [@thejackshelton](https://github.com/thejackshelton) in [#737](https://github.com/qwikifiers/qwik-ui/pull/737))

  The entire Qwik UI library does not execute code until interaction. Your components are HTML, until the user decides to interact with them.

  ## Bundling improvements

  We have reduced the bundle size significantly of the headless library. If you are a Qwik library author, please refer to [this issue](https://github.com/QwikDev/qwik/issues/5473) as it may impact your bundle size as well.

  ## Dot notation

  The biggest change of v0.4 is the addition of dot notation to the API. Also known as "namespaced components".

  This includes our largest breaking change to Qwik UI yet. We hope it is the largest ever, and want to ensure a much smoother transition going forward. Before we can do that, we need to make sure the API's are consistent across the library.

  **The component API's have been updated to use dot notation.**

  We believe that dot notation will significantly improve the developer experience. Below are some of the benefits of dot notation.

  ### Simple Imports

  In previous versions, imports needed to be defined for each component.

  ```tsx
  import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@qwik-ui/headless';
  ```

  While this is trivial with three components, it can be a pain with the more "pieces" a component has.

  ```tsx
  import {
    Combobox,
    ComboboxControl,
    ComboboxIcon,
    ComboboxInput,
    ComboboxLabel,
    ComboboxListbox,
    ComboboxOption,
    ComboboxPopover,
    ComboboxTrigger,
    ResolvedOption,
  } from '@qwik-ui/headless';
  ```

  In v0.4, the new import syntax is the following:

  ```tsx
  import { Collapsible, Combobox } from '@qwik-ui/headless';
  ```

  ### TypeScript Autocomplete

  The searchability of available components has also been improved. You can now use the autocomplete feature to find a specific sub-component.

  ![component autocomplete](https://i.imgur.com/ccipLo3.png)

  ### Improved legibility

  For longer component names, the dot notation is arguably more legible. For example, `Combobox.Listbox` vs. `ComboboxListbox`.

  ### Migration Cheat Sheet

  As an easier way to migrate, we've created a mini cheat sheet below. If you have any questions, or need help migrating, don't hesistate to reach out to us on Discord.

  **Components named <Component>, like <Accordion> are now <Accordion.Root />**

  > Except for <Modal> and <Popover>, which is now <Modal.Panel /> and <Popover.Panel /> respectively.

  With new root components, the **main props** have been moved to the root component. (for example, props previously on the Popover and Modal panels).

  Ex:

  ```
  <Modal bind:show> -> <Modal.Root bind:show>
  ```

  For further reference, read the [RFC](https://github.com/qwikifiers/qwik-ui/issues/700) on dot notation.

  ### Popover Refactor

  Based on feedback we have received from the community, we have also improved the developer experience of the Popover component.

  ```tsx
  import { component$ } from '@builder.io/qwik';
  import { Popover } from '@qwik-ui/headless';

  export default component$(() => {
    return (
      <Popover.Root gutter={4}>
        <Popover.Trigger class="popover-trigger">Click me</Popover.Trigger>
        <Popover.Panel class="popover-panel">
          I am anchored to the popover trigger!
        </Popover.Panel>
      </Popover.Root>
    );
  });
  ```

  - By default, the popover is now anchored to its trigger. The API surface should also be simpler.
  - A new `hover` prop has also been introduced on the root, useful for things like tooltips.
  - Programmatically toggling the popover is still possible, make sure to put the same id on the `<Popover.Root />` that is passed to the `usePopover` hook. Refer to the docs for more info.
  - popover-showing and popover-closing classes have been deprecated. Please use the `data-open` and ``data-closing` attributes instead.
  - The `data-open`, `data-closing`, and `data-closed` data attributes have been added to the popover.

  #### <Popover.Root />

  There is a new root compomnent. Configurable props have been moved to the root component.

  #### Deprecated Props

  - You no longer need to style the popover open state with `:popover-open`. Instead, use the `data-open` attribute for it to style across browsers.

  ```css
  .popover-panel[data-open] {
    background: green;
  }
  ```

  - You no longer need to pass a `popovertarget` prop to the `<Popover.Trigger />` component. Same with an id prop on the `<Popover.Panel />` component.
  - The `placement` prop has been deprecated, and combined with the `floating` prop.

  For example, `floating="right` will now float the popover to the right.

  #### Opting out of the floating library

  To opt-out of the floating library, set the `floating={false}` on the `<Popover.Root />` component.

  May 2024, Chrome will be adding support for the CSS anchor API. This will allow us to remove the floating UI library entirely when that gains more support across browsers.

  ### Docs Improvements

  A couple of docs improvements have been made:

  - The docs have been updated to reflect the new API.
  - The headless docs no longer include styles in the examples. There is an example CSS section in each component page. If you do not find one, please open an issue on GitHub.
  - Part of the Accordion and Modal docs have been simplified
  - The examples now include icons from the `qwikest/icons` package rather than an abstract component you could not use.

- ### Modal API Changes (by [@thejackshelton](https://github.com/thejackshelton) in [#734](https://github.com/qwikifiers/qwik-ui/pull/734))

  In a previous release, the following components have been deprecated:

  - ModalHeader
  - ModalContent
  - ModalFooter

  These components were native header, div, and footer elements and did nothing special under the hood. We are deprecating them in order to simplify the API and make it more consistent with the rest of the components.

  The new components are:

  #### <Modal.Root>

  This is the main container of the modal, and now holds the major props and configuration. Examples include:

  - 'bind:show'?: Signal<boolean>;
  - closeOnBackdropClick?: boolean;
  - alert?: boolean;
  - onShow$?: QRL<() => void>;
  - onClose$?: QRL<() => void>;

  #### <Modal.Panel>

  Previously `<Modal />` the modal panel is the dialog element that is rendered on top of the page. Its props have since been moved to the `<Modal.Root />` component, please refer to the docs for more information.

  #### <Modal.Trigger>

  The modal now comes with a default trigger, which will open the modal when clicked.

  #### <Modal.Title>

  This computes the accessible name from the string children of the modal.

  ### <Modal.Description>

  This computes the accessible description from the string children of the modal.

  ### <Modal.Close>

  This is a button that closes the modal when clicked.

- ### Select API Changes (by [@thejackshelton](https://github.com/thejackshelton) in [#724](https://github.com/qwikifiers/qwik-ui/pull/724))

  - `<SelectOption />` has been renamed to `<Select.ItemLabel />`.
  - `<Select.Value />` has been renamed to `<Select.DisplayValue />`.

  ### `<Select.Item />`

  A new component that allows for customize of the list item.

  #### `<Select.ItemIndicator />`

  This component is used to render an icon or other visual element that is displayed next to the `<Select.ItemLabel />` whenever an item is selected.

  ### Multi-select

  To opt-in to the multi-select mode, set the `multiple` prop to `true`. Please refer to the `Multiple Selections` section in the docs for more information.

  The previous API did not allow for customization of list items. The new API introduces a couple new components:

  ```tsx
      <Select.Item>
        <Select.ItemLabel>My Display Option!</Select.ItemLabel>
        <Select.ItemIndicator>
          {/* anything goes here */}
        </Select.ItemIndicator>
      <Select.Item>
  ```

  You can now put anything you'd like in your `<Select.Item />`, just like a normal li tag!

  There is a new reactive signal called `bind:displayValue` that can be used to read the value of the display text. There is a new docs example that shows this in action with item pills.

  #### bind syntax

  We have been exploring more with the `bind` syntax. `bind:x` is a convention based on `bind:value` and `bind:checked`, where a signal is passed and two way data binding is enabled.

  > This is much more performant than previous two way data binding, thanks to signals.

  As a general note:

  name -> initial value

  anything that does not start with `bind:` is a static value.

  bind:name -> reactive signal

  anything that starts with `bind:` is a reactive signal.

  If you find yourself curious to explore the bind syntax more, try typing `bind:` on a root component in Qwik UI, you should see a list of available things you can reactively customize!

- ### Tooltip (by [@thejackshelton](https://github.com/thejackshelton) in [#733](https://github.com/qwikifiers/qwik-ui/pull/733))

  The Tooltip component has been refactored from the ground up to be more accessible and performant.

  It is now built on top of the popover primitive, and has a similar API.

  It remains in `draft` status, and is not yet ready for production use. We will be working on it more deeply in the near future.

  ### Accordion

  The Accordion has been refactored from the ground up to be more accessible and performant.

  #### Accordion.Root

  - The `behavior="multi"` prop has been deprecated with `multiple` on the `<Accordion.Root />` component.
  - The default behavior is a single item open at a time.
  - The `animated` prop has been removed. Animations are now automatically detected!
  - `onSelectIndexChange# Changelog has been deprecated and removed in favor of `onChange# Changelog.
  - `onFocusIndexChange# Changelog has been deprecated and removed. Let us know if you have a use case for this.
  - Reactively control the accordion with the `bind:value` prop.
  - Control the initial value with the `value` prop.
  - Disable the entire accordion by using the `disabled` prop.

  #### Accordion.Item

  - Pass distinct values to the `<Accordion.Item />` component with the `value` prop.
  - Disable Accordion items by setting the `disabled` prop to true on the `<Accordion.Item />` component.

  For more information, please refer to the updated Accordion documentation.

  ### Collapsible

  - The `onOpenChange# Changelog prop has been deprecated. Use the `onChange# Changelog prop instead.

  For more information, please refer to the updated Collapsible documentation.

  ### Deprecated Components

  In 0.4, we have deprecated the following headless components:

  - Drawer
  - Breadcrumb
  - Action Button
  - Button Group
  - Toast
  - Card
  - Badge
  - Spinner
  - Rating
  - Checkbox

  Most of these components were in a pre-alpha state, duplicates from the styled kit, or were not yet ready for production use. They were lying around in the codebase for a while, and we have gained many insights since then on creating accessible, unstyled, and performant components.

  You can expect the **Toast** and the **Tooltip** to come back with a much more polished form in a future release.

### Patch Changes

- 🐞🩹 popover API programmatic behavior works correctly (by [@thejackshelton](https://github.com/thejackshelton) in [#730](https://github.com/qwikifiers/qwik-ui/pull/730))

## 0.3.8

### Patch Changes

- 🐞🩹 popover opening immediately in CSR (by [@thejackshelton](https://github.com/thejackshelton) in [#717](https://github.com/qwikifiers/qwik-ui/pull/717))

- 🐞🩹 regression with popover polyfill executing unnecessary code (by [@thejackshelton](https://github.com/thejackshelton) in [#717](https://github.com/qwikifiers/qwik-ui/pull/717))

## 0.3.7

### Patch Changes

- 🐞🩹 race condition in the popover when programmatically opening on supported browsers (by [@thejackshelton](https://github.com/thejackshelton) in [#716](https://github.com/qwikifiers/qwik-ui/pull/716))

- ✨ Adding the bind:open signal prop to the select component can now reactively control the select listbox open state (by [@thejackshelton](https://github.com/thejackshelton) in [#707](https://github.com/qwikifiers/qwik-ui/pull/707))

## 0.3.6

### Patch Changes

- 🐞🩹 modal does not close unless the dialog backdrop is clicked (including dangling content) (by [@thejackshelton](https://github.com/thejackshelton) in [#702](https://github.com/qwikifiers/qwik-ui/pull/702))

  fix: polyfilled popovers render correctly inside of modals.

  fix: nested modals will now close the current modal when the backdrop is clicked.

  fix: nested modals will now close the current modal when the escape key is pressed.

  fix: select does not execute code until interaction (including core).

  tests: larger test suite for modals.

  deprecated: `ModalHeader`, `ModalContent`, `ModalFooter` have been deprecated, as they do not pose significant a11y advantages.

  feat: Two new Modal component pieces. `ModalTitle` and `ModalDescription`. These help give our modal an accessible name and supporting description (optional).

  feat: Modal now uses the following CSS as a default inside of an @layer

  ```css
  @layer qwik-ui {
    /* browsers automatically set an interesting max-width and max-height for dialogs
      https://twitter.com/t3dotgg/status/1774350919133691936
    */
    dialog:modal {
      max-width: unset;
      max-height: unset;
    }
  }
  ```

  The default browser styles:

  ![alt text](image.png)

  Make it difficult to style a dialog element full-screen, which has led to some confusion recently both in this repo and across the web. The above change strips the responsible browser styles from the dialog eleemnt (which is used by Qwik UI's modal component).

  > For more info, feel free to check out the link in the code snippet above.

  > Note: In the future, we intend to use the dot notation for the `Modal` component.

  > Note: In the future, we intend to change the modal API to include a trigger. The proposed API is as follows:

  ### Syntax Proposal

  ```tsx
  <Modal.Root>
    <Modal.Trigger>Trigger</Modal.Trigger>
    <Modal.Panel>
      {/*  This is the current <Modal /> */}
      <Modal.Title>Edit Profile</Modal.Title>
      <Modal.Description>You can update your profile here.</Modal.Description>
    </Modal.Panel>
  </Modal.Root>
  ```

  Let us know your thoughts on this potential API change in the Qwik UI discord!

- ✨ deprecate `modal-showing` and `modal-closing` classes in favor of `data-open`, `data-closing`, and `data-closed` data attributes. (by [@thejackshelton](https://github.com/thejackshelton) in [#702](https://github.com/qwikifiers/qwik-ui/pull/702))

  > These classes will still work at the moment, but will be removed in a near future release.

- refactor: popover listbox class deprecated and set as a default when in floating mode. (by [@thejackshelton](https://github.com/thejackshelton) in [#691](https://github.com/qwikifiers/qwik-ui/pull/691))

## 0.3.5

### Patch Changes

- refactor: strip browser user agent styles relating to max-width (by [@thejackshelton](https://github.com/thejackshelton) in [#676](https://github.com/qwikifiers/qwik-ui/pull/676))

- 🐞🩹 collapsible renders correctly on CSR (by [@thejackshelton](https://github.com/thejackshelton) in [#681](https://github.com/qwikifiers/qwik-ui/pull/681))

- ✨ headless label hits draft status! (by [@thejackshelton](https://github.com/thejackshelton) in [#688](https://github.com/qwikifiers/qwik-ui/pull/688))

## 0.3.4

### Patch Changes

- ✨ collapsible hits beta! (by [@thejackshelton](https://github.com/thejackshelton) in [#669](https://github.com/qwikifiers/qwik-ui/pull/669))

- fixed dark mode for combobox and added basic a11y test (by [@cwoolum](https://github.com/cwoolum) in [#662](https://github.com/qwikifiers/qwik-ui/pull/662))

## 0.3.3

### Patch Changes

- 🐞🩹 select component now has a flexible hierarchy (by [@thejackshelton](https://github.com/thejackshelton) in [#659](https://github.com/qwikifiers/qwik-ui/pull/659))

- ✨ carousel hits draft status! (by [@thejackshelton](https://github.com/thejackshelton) in [#649](https://github.com/qwikifiers/qwik-ui/pull/649))

## 0.3.2

### Patch Changes

- 🐞🩹 proper type exports in package.json (by [@thejackshelton](https://github.com/thejackshelton) in [#645](https://github.com/qwikifiers/qwik-ui/pull/645))

## 0.3.1

### Patch Changes

- ## Select component hits beta! (by [@thejackshelton](https://github.com/thejackshelton) in [#637](https://github.com/qwikifiers/qwik-ui/pull/637))

  ## Features

  - Accessible as a button that shows a list, following web a11y standards.
  - Support for single selection.
  - Controlled or uncontrolled.
  - Disabled option support.
  - Stop focus management via the Tab key.
  - Grouped options support.
  - Looping support.
  - Support for custom scroll behavior.
  - Listbox UI is placed above everything else. (SelectPopover)
  - Custom Positioning (SelectPopover)
  - Option selection and focus management by typing (typeahead).
  - Keyboard support for option navigation via arrow keys and focus management.
  - Automatic focus management for first and last options.
  - Supports a custom placeholder.

  ## Roadmap

  - Opt-in native form support via a visually hidden select.
  - RTL support.
  - Multiple Selection and its respective keyboard interactions.

## 0.3.0

### Minor Changes

- Renamed customized tab components (by [@shairez](https://github.com/shairez) in [#604](https://github.com/qwikifiers/qwik-ui/pull/604))

### Patch Changes

- ✨ Add data-state selected to Tab component (by [@maiieul](https://github.com/maiieul) in [#604](https://github.com/qwikifiers/qwik-ui/pull/604))

- 📃 Added a new contributing guide in the docs! /docs/headless/contributing (by [@thejackshelton](https://github.com/thejackshelton) in [#618](https://github.com/qwikifiers/qwik-ui/pull/618))

- 🐞🩹 modal: simplify supportClosingAnimation if/else chain -> fixes some concurrency issues (by [@maiieul](https://github.com/maiieul) in [#604](https://github.com/qwikifiers/qwik-ui/pull/604))

- ✨ added shorthand syntax for Accordion (by [@shairez](https://github.com/shairez) in [#604](https://github.com/qwikifiers/qwik-ui/pull/604))

  Now you can do:

  ```tsx
  <Accordion>
    <AccordionItem label="Trigger 1">Content 1</AccordionItem>
    <AccordionItem label="Trigger 2">Content 2</AccordionItem>
  </Accordion>
  ```

  And it will get translated to:

  ```tsx
  <AccordionRoot>
    <AccordionItem>
      <AccordionTrigger>Trigger 1</AccordionTrigger>
      <AccordionContent>Content 1</AccordionContent>
    </AccordionItem>
    <AccordionItem>
      <AccordionTrigger>Trigger 2</AccordionTrigger>
      <AccordionContent>Content 2</AccordionContent>
    </AccordionItem>
  </AccordionRoot>
  ```

- feat(headless modal): add data-state (by [@maiieul](https://github.com/maiieul) in [#604](https://github.com/qwikifiers/qwik-ui/pull/604))

## 0.2.2

### Patch Changes

- bind syntax Sig suffix removed, new bind:selectedIndex prop, bug fixes (by [@thejackshelton](https://github.com/thejackshelton) in [#602](https://github.com/qwikifiers/qwik-ui/pull/602))

- updated to Qwik 1.4.0 (by [@shairez](https://github.com/shairez) in [#607](https://github.com/qwikifiers/qwik-ui/pull/607))

This file was generated using [@jscutlery/semver](https://github.com/jscutlery/semver).

## [0.2.1](https://github.com/qwikifiers/qwik-ui/compare/headless-0.2.0...headless-0.2.1) (2024-01-09)

### Bug Fixes

- **ts-ignore:** use ts-expect-error instead ([46690f7](https://github.com/qwikifiers/qwik-ui/commit/46690f77ae7d5ccbad7a374dc5280f9764faf271))

### Features

- **collapsible:** new collapsible component ([0166e80](https://github.com/qwikifiers/qwik-ui/commit/0166e8026550fa7ea9b91184df3bc79f58b95455))

# [0.2.0](https://github.com/qwikifiers/qwik-ui/compare/headless-0.1.23...headless-0.2.0) (2023-12-16)

### Bug Fixes

- **animations:** animations work now ([7978a8e](https://github.com/qwikifiers/qwik-ui/commit/7978a8ece57c462564f4b7775d239eeb4e937830))
- **ci:** remove deprecated test ([d231c20](https://github.com/qwikifiers/qwik-ui/commit/d231c2082449f919e73052d50cf9e7f420079300))
- **combobox popover:** keep focus on input ([ef870b3](https://github.com/qwikifiers/qwik-ui/commit/ef870b35d290c240018c70b7199829ac14a374e0))
- **combobox:** fixed types when floating is set to true ([2d613fa](https://github.com/qwikifiers/qwik-ui/commit/2d613fae33d9372bff3e37af7b9e064b16cd8d21))
- **css improvements, fix cli warnings:** n ([58cdab8](https://github.com/qwikifiers/qwik-ui/commit/58cdab827c37cb400fec05e66d2b02458ea562ef))
- **docs:** all imports of the plugin removed ([1426f4e](https://github.com/qwikifiers/qwik-ui/commit/1426f4e72ffbee54212a5a41c46ddd6adde82f1b))
- **docs:** attempt to fix deploy ([dd77f60](https://github.com/qwikifiers/qwik-ui/commit/dd77f608154fcf180f55d442a0058823a115c81c))
- **docs:** fixed type errors from HTMLElement ([ae6b4ca](https://github.com/qwikifiers/qwik-ui/commit/ae6b4ca2611ca8d0d9b59d3967a6278bae4b903f))
- **docs:** remove regression import in cypress config ([d39848c](https://github.com/qwikifiers/qwik-ui/commit/d39848cf024122071e44d903beadfe997d367e0d))
- **flicker:** making sure it teleports only once ([588e7ce](https://github.com/qwikifiers/qwik-ui/commit/588e7ce5d15e8b2a697bd22e6392079c5d2196fc))
- **modal:** fixes scroll not properly unlocked when tabbing and esc is pressed ([c7cbf1c](https://github.com/qwikifiers/qwik-ui/commit/c7cbf1ca3154bd435be0b720036ff517f0f083ab))
- **modal:** modal on iOS maintains proper scroll position ([0e34338](https://github.com/qwikifiers/qwik-ui/commit/0e34338b9ee34e673d814e6df3603d428ef2bbff))
- **modal:** proper deps installed, and tidying code ([9b673af](https://github.com/qwikifiers/qwik-ui/commit/9b673afb738b40986427bea4162a967b09bec111))
- **popoveer:** refactored implementation detail initPopover$ ([c766358](https://github.com/qwikifiers/qwik-ui/commit/c766358f32de647db9a3400fcb767ac6c216f8ad))
- **popover combobox:** fix for document being appended and flip middleware working now ([a3fae71](https://github.com/qwikifiers/qwik-ui/commit/a3fae71b72d58f7b7aecee6b4c5cc8da8bc0558f))
- **popover combobox:** fixed floating UI showing properly on chrome, type errors fixed ([b9e1695](https://github.com/qwikifiers/qwik-ui/commit/b9e169597186ba1e34fc2e2e64a9c24a15a46db1))
- **popover combobox:** fixes floating ui flicker, animations ([5b2b1c8](https://github.com/qwikifiers/qwik-ui/commit/5b2b1c8d7f9d9b17a1c29b88e503c049251e809a))
- **popover combobox:** latest changes from wout ([ad253a3](https://github.com/qwikifiers/qwik-ui/commit/ad253a3212830c212152def36f0aeb7b68cb5373))
- **popover-combobox:** type fixes, further documentation, styling changes ([1d38264](https://github.com/qwikifiers/qwik-ui/commit/1d38264898ac9e97b773871ef58a1fe7a1220141))
- **popover:** beautiful transition ([11b18a4](https://github.com/qwikifiers/qwik-ui/commit/11b18a4d8c3dd8321fddf60d6f65206c05ee6f96))
- **popover:** better naming ([8b7f46b](https://github.com/qwikifiers/qwik-ui/commit/8b7f46b2efec63497bae64e0baca7e592de50f1d))
- **popover:** better naming in polyfill ([106fa80](https://github.com/qwikifiers/qwik-ui/commit/106fa80942f435d57d3c7bd8cf55e86c5327cc62))
- **popover:** button click now does not flicker off ([20d87f6](https://github.com/qwikifiers/qwik-ui/commit/20d87f6024bc4d690a7b2a522acd244fea96b4ab))
- **popover:** clean up popover a bit ([fd57e7e](https://github.com/qwikifiers/qwik-ui/commit/fd57e7e43f88c5d954ad0332e271c84e14297f09))
- **popover:** cleaning up popover ([66ea41f](https://github.com/qwikifiers/qwik-ui/commit/66ea41f79d92fd9c081c998028d631f7f6078f76))
- **popover:** fix animation declaration flickers ([5995bac](https://github.com/qwikifiers/qwik-ui/commit/5995bac6c58f257797f2bc3647ff1d9d242dbde0))
- **popover:** fix combobox flicker ([ba834cf](https://github.com/qwikifiers/qwik-ui/commit/ba834cf9ed3b61d9bab80353d60bac1e3498a422))
- **popover:** fix style issue, users can add styles ([f637d87](https://github.com/qwikifiers/qwik-ui/commit/f637d8763d57c10e0ff668b3928f8f80d2ffd7ee))
- **popover:** fix: floating ui on interaction, combobox popover working on polyfill ([9e8113a](https://github.com/qwikifiers/qwik-ui/commit/9e8113a424a786c62bef6d268402af3ad632c5eb))
- **popover:** fixed toggle popover only after container is created ([7cb4df7](https://github.com/qwikifiers/qwik-ui/commit/7cb4df7f384cae82cf0714683fc4d67c845de7b6))
- **popover:** get popover to work with everything in combobox ([44745e9](https://github.com/qwikifiers/qwik-ui/commit/44745e964a0698fe360fd2222ea32c22fbeac7d3))
- **popover:** hides popover whenever anchor is hidden in DOM ([7afba39](https://github.com/qwikifiers/qwik-ui/commit/7afba398b50146ec5791efd3bf76262157316ee9))
- **popover:** input interactions work with combobox ([79c9ece](https://github.com/qwikifiers/qwik-ui/commit/79c9ecea77a7b8d9d7b79791fe0c5e31ab093616))
- **popover:** layout flicker on polyfill fix ([01e4c94](https://github.com/qwikifiers/qwik-ui/commit/01e4c94a8b4bfca6ff484a195cf179cd056041e5))
- **popover:** polyfill popovers now always on top of each other, only one style node ([2fceb40](https://github.com/qwikifiers/qwik-ui/commit/2fceb4019d1190ef9cb8d06da6461bb45a3f46cc))
- **popover:** portal context works ([c1ee848](https://github.com/qwikifiers/qwik-ui/commit/c1ee848675df042e31cad3c63e7a4f5cf0a91530))
- **popover:** refactor out visible task ([a31f384](https://github.com/qwikifiers/qwik-ui/commit/a31f384a93ea2b611f4ff0674681b0a9385e761c))
- **popover:** remove shadow root crap ([804c7ac](https://github.com/qwikifiers/qwik-ui/commit/804c7acef5644eba71848f7471de8217f5281ab8))
- **popover:** remove unnecessary styles ([92ac7a8](https://github.com/qwikifiers/qwik-ui/commit/92ac7a8e6eb73c50f79ec866382535b2f31c6173))
- **popover:** remove unneeded logs and comments ([6205ab7](https://github.com/qwikifiers/qwik-ui/commit/6205ab7a91a64052f59cd7cd9b8303cc787f200f))
- **popover:** so it only runs once on first click ([261de8b](https://github.com/qwikifiers/qwik-ui/commit/261de8b8a0b5b1b8ff6963fc19be392d012aa63c))
- **popover:** supported browser ([f745c9b](https://github.com/qwikifiers/qwik-ui/commit/f745c9b84fdaffc58347c996635d06ea80d34e93))
- **popover:** transitions work! ([db4027d](https://github.com/qwikifiers/qwik-ui/commit/db4027d4fd891e51b6620b8ab71fc2cd01a55b1b))
- **popover:** working but hacky ([915b3db](https://github.com/qwikifiers/qwik-ui/commit/915b3db656dd34557e710f6f4a8409368239258c))
- **popover:** works for supported browsers too ([43abfcb](https://github.com/qwikifiers/qwik-ui/commit/43abfcbcca1701f5e2b575abe2dfc7195d56e1f9))
- **tabs:** allow tabs to accept user-defined TabList/Tab/TabPanel ([3a73752](https://github.com/qwikifiers/qwik-ui/commit/3a737528bc32ac2ca2bbc9a4ec9924d335c439ce))

### Features

- **combobox:** combobox popover component ([96e4142](https://github.com/qwikifiers/qwik-ui/commit/96e4142f8b8a8a4a8688dbfbb7f3fbfc7c96078b))
- **combobox:** improved a11y, & visually-hidden component ([d640bf5](https://github.com/qwikifiers/qwik-ui/commit/d640bf5bec68521e8e026e4fc8091cb9ef26784e))
- **popover & combobox:** initial impl of new popover with combobox ([d004efb](https://github.com/qwikifiers/qwik-ui/commit/d004efbd521dcf268c5a1bc84d7c247f4d6ce7a7))
- **popover combobox:** near feature parity with portal ([d2839da](https://github.com/qwikifiers/qwik-ui/commit/d2839daf172193492c42001c5e8ffe3dd5237db8))
- **popover-combobox:** transition support ([f686e6f](https://github.com/qwikifiers/qwik-ui/commit/f686e6fcf528e4e837d688879cb4b46a92ee7d57))
- **popover:** abstract event interaction logic to a hook ([60b517a](https://github.com/qwikifiers/qwik-ui/commit/60b517a373b5401d66a7764c339b36caada9f0d6))
- **popover:** animation support for popover & docs changes ([2f98731](https://github.com/qwikifiers/qwik-ui/commit/2f98731ff8e6bf252b262d718ee20495754cc4cf))
- **popover:** initial animations, works for poly only currently ([d25f977](https://github.com/qwikifiers/qwik-ui/commit/d25f9771ca113cbca95c27d8ba131e9a237ff6b9))
- **popover:** major popover docs improvements ([ce61308](https://github.com/qwikifiers/qwik-ui/commit/ce6130810aa760229dd92e8697d449e0e7d25987))
- **popover:** updating to latest in main ([5a75fe4](https://github.com/qwikifiers/qwik-ui/commit/5a75fe4d73f7cad1a37687688abe23b14e76bf4b))

## [0.1.22](https://github.com/qwikifiers/qwik-ui/compare/headless-0.1.21...headless-0.1.22) (2023-12-01)

## [0.1.21](https://github.com/qwikifiers/qwik-ui/compare/headless-0.1.20...headless-0.1.21) (2023-12-01)

## [0.1.20](https://github.com/qwikifiers/qwik-ui/compare/headless-0.1.19...headless-0.1.20) (2023-11-30)

## [0.1.19](https://github.com/qwikifiers/qwik-ui/compare/headless-0.1.18...headless-0.1.19) (2023-11-30)

## [0.1.18](https://github.com/qwikifiers/qwik-ui/compare/headless-0.1.17...headless-0.1.18) (2023-11-30)

### Bug Fixes

- **accordion:** disabled in safari ([cfe5083](https://github.com/qwikifiers/qwik-ui/commit/cfe5083c8d3ddc23338a1527f946f54eae0c2231))
- combobox test ([#480](https://github.com/qwikifiers/qwik-ui/issues/480)) ([166093c](https://github.com/qwikifiers/qwik-ui/commit/166093c39d9f6d076094b986fc2a1a1f7feba7c1))
- **dialog:a11y:** replce role=button with section element ([74a9b55](https://github.com/qwikifiers/qwik-ui/commit/74a9b556c7ba6e1f0a530304364bba969a63d6c9))
- **dialog:** close dialog on backdrop click ([ea5ba0e](https://github.com/qwikifiers/qwik-ui/commit/ea5ba0e5cc356ddb0800987e421a713261f42894))
- **dialog:** export dialog from headless library ([8e85362](https://github.com/qwikifiers/qwik-ui/commit/8e8536232e3657c87599e7c1beac882320b7aa8c))
- **dialog:** lock scrolling when dialog is opened ([cf6783e](https://github.com/qwikifiers/qwik-ui/commit/cf6783e138d6282be5f67b1937f4409ac3ad67bd))
- **dialog:** resolve lint-error concerning scope ([7713ed1](https://github.com/qwikifiers/qwik-ui/commit/7713ed18a5ec83aaecbfeae12db6807b7c0447cb))
- **docs:** animation support, fixed scrollbar flickering across the board ([3ab1824](https://github.com/qwikifiers/qwik-ui/commit/3ab1824813135e2a88c6c4c1978638d8056acb9f))
- **modal:** animations events are now properly cleaned up ([40cd056](https://github.com/qwikifiers/qwik-ui/commit/40cd056e9add2e08f4fe633bf14ced2dbc7b5d0a))
- **modal:** avoid accidantal close clicking the edges of the modal ([bb4b582](https://github.com/qwikifiers/qwik-ui/commit/bb4b5821947c29597ae6046a4457787eba4a38c3))
- **modal:** avoid closing when label is clicked ([87fce3e](https://github.com/qwikifiers/qwik-ui/commit/87fce3edf47f3cf78344e9786307169c700d73e0))
- **modal:** correct calculation of boundingClientRect ([95f9676](https://github.com/qwikifiers/qwik-ui/commit/95f9676c09ad1e7be0f608acffccc04052c5de57))
- **modal:** deactivate focus-trap before close ([a802ef2](https://github.com/qwikifiers/qwik-ui/commit/a802ef2f87cd51b82dfb0d997b49871dc6146d90))
- **modal:** deactivate FocusTrap once ([38e8b03](https://github.com/qwikifiers/qwik-ui/commit/38e8b0355303993e6a86e5064d89aa3b21f1eff1))
- **modal:** fixing scrollbar flickers ([426bf48](https://github.com/qwikifiers/qwik-ui/commit/426bf48f356597f9eda60c48f80c5caa94de9807))
- **modal:** get modal to work again ([d3219bd](https://github.com/qwikifiers/qwik-ui/commit/d3219bdf88e0df4051c4864ba984908bb94d5c24))
- **modal:** prevent closing from being executed twice ([5ebf5d9](https://github.com/qwikifiers/qwik-ui/commit/5ebf5d9555426e8c0a04a5a2dd53b505347222f9))
- **modal:** remove focus logic since it works out-of-the-box ([cb81d11](https://github.com/qwikifiers/qwik-ui/commit/cb81d1125e921b59bc314df5318f3565c4af17cb))
- **modal:** remove modal-closing when no animation is applied ([d18ca00](https://github.com/qwikifiers/qwik-ui/commit/d18ca0042f06eb4bdff1cd50db2a1f266bf61b69))
- **modal:** remove modal-opening after animation is finished ([884a0df](https://github.com/qwikifiers/qwik-ui/commit/884a0df1febec21df108fbc0a51067fdca15f390))
- **modal:** scroll flicker ([20946a9](https://github.com/qwikifiers/qwik-ui/commit/20946a939a1a7e8f64ffc96389bce0f77c12b878))
- **modal:** scrollbar flicker, copy button goes back to normal state ([fc3f0cf](https://github.com/qwikifiers/qwik-ui/commit/fc3f0cf87f4d9b62a57979080eee357edf743a19))
- **modal:** stop calling closing in task-clean-up ([faddf1a](https://github.com/qwikifiers/qwik-ui/commit/faddf1a138996d5d93c07a41b894e4531a59f061))
- **modal:** tolerate if no tabbable elements are inside the modal ([81ee5d2](https://github.com/qwikifiers/qwik-ui/commit/81ee5d2148a96bf9873dd1454031ba77b5c38c14))
- **modal:** transition was using the wrong event, fixed ([10360be](https://github.com/qwikifiers/qwik-ui/commit/10360be87794568b66a3474f586c3f92a2c2ee15))
- **modal:** type errors preventing preview build ([34f86bb](https://github.com/qwikifiers/qwik-ui/commit/34f86bb88183d5a7c231c145cedf3f3d1d2dddd0))
- pagination ([#499](https://github.com/qwikifiers/qwik-ui/issues/499)) ([1b040d9](https://github.com/qwikifiers/qwik-ui/commit/1b040d903edb564cf955bb2f1a9587b50567ce81))
- **pagination:** add disable attribute and remove pointer event none ([c6b3cde](https://github.com/qwikifiers/qwik-ui/commit/c6b3cde205102f601db6a596c6e2de3800b01754))
- **pagination:** moved signal update inside useTask ([fd0965e](https://github.com/qwikifiers/qwik-ui/commit/fd0965e11ca21ed34729bd12fbeba8f13c6d9e8e))
- **pagination:** remove implicit role button ([2476236](https://github.com/qwikifiers/qwik-ui/commit/24762369b47bfad46ddc04b95c64cf9cce609203))
- **pagination:** remove implicit role=navigation ([8294b37](https://github.com/qwikifiers/qwik-ui/commit/8294b37e6c19c09584b1654dd117f0bc5a74997f))
- **pagination:** remove useTask ([c083445](https://github.com/qwikifiers/qwik-ui/commit/c08344575be7eac1c9ae722e67d9cd551f55ea7f))
- **pagination:** use relative path in import ([9b2d1da](https://github.com/qwikifiers/qwik-ui/commit/9b2d1da861f00f6649765e0106115db8d850a824))
- **repo:** various target and dependency updates ([03851a9](https://github.com/qwikifiers/qwik-ui/commit/03851a9ff8320dcecc26b11ba21893d2181c20ca))
- **typos:** minor typo correction in comments ([2f6646a](https://github.com/qwikifiers/qwik-ui/commit/2f6646a941b883521445285644137fd808fc196c))
- **vite.config.ts:** remove external rollupOptions ([50c5abb](https://github.com/qwikifiers/qwik-ui/commit/50c5abb651fce8412014f9c025a5f6000488076e)), closes [#473](https://github.com/qwikifiers/qwik-ui/issues/473)

### Features

- **dialog:** add ContentText ([017164a](https://github.com/qwikifiers/qwik-ui/commit/017164a5b0eca3c427120eb39e65cee158c5014f))
- **dialog:** add dialog ([36fdfec](https://github.com/qwikifiers/qwik-ui/commit/36fdfec88c39ddef2253af961363ed408ecf9d4c))
- **dialog:** add Dialog.Actions ([253fd58](https://github.com/qwikifiers/qwik-ui/commit/253fd5848b9ecd19595e5591e1499bc7307c97b5))
- **dialog:** add Dialog.Title ([61ace39](https://github.com/qwikifiers/qwik-ui/commit/61ace39bd7ffa6597364f80d50a8f9620959f949))
- **dialog:** add Example for tailwind dialog ([584fc0e](https://github.com/qwikifiers/qwik-ui/commit/584fc0e9075add00e8be78b23e0d5edea2443bf1))
- **dialog:** all dialog overrides are passed via Dialog.Root ([64997dc](https://github.com/qwikifiers/qwik-ui/commit/64997dcf1093685f4b0323bee8f0116def335222))
- **dialog:** expose props of Dialog.Root ([cb578e4](https://github.com/qwikifiers/qwik-ui/commit/cb578e43aa7d28381c0ad2a145a9374ec285e208))
- **dialog:** expose public API via ref ([9aba660](https://github.com/qwikifiers/qwik-ui/commit/9aba660131e9e8ff2698c7a570c6dde968d3b346))
- **dialog:** introduce Dialog.Trigger & Dialog.Portal ([bfc48a7](https://github.com/qwikifiers/qwik-ui/commit/bfc48a7f376fbba25b5849c0ae4bd0bf920284fc))
- **dialog:** make tailwind example work ([2c93081](https://github.com/qwikifiers/qwik-ui/commit/2c930811ab5630019191decd79eb2a79df8a36bd))
- **dialog:** position Dialog.ContentTitle sticky ([6d4ffc2](https://github.com/qwikifiers/qwik-ui/commit/6d4ffc21c34dc6b63b43436e587960048ca4428e))
- **dialog:** stop passing through every dialog-property ([0591394](https://github.com/qwikifiers/qwik-ui/commit/05913942e1582951116f26bba220ce5f9c67cd42))
- **dialog:** support full-screen mode ([a8470ed](https://github.com/qwikifiers/qwik-ui/commit/a8470ed2fb582895504a5ef8afd2d6f1d7d6fb7c))
- **focus trapping:** adding focus trapping to the modal, executes when open, cleans up when closes ([456240c](https://github.com/qwikifiers/qwik-ui/commit/456240ce1d89032063e6d4fce6a2e46f0b50bf6a))
- **focus-trap:** setup skeleton ([4d4f4b5](https://github.com/qwikifiers/qwik-ui/commit/4d4f4b5eba7f4bbfa3e99cea7f2abd264149b1fe))
- **modal:** allow disabling close on backdrop-click ([70c88cc](https://github.com/qwikifiers/qwik-ui/commit/70c88cceae4162965318ea53170e0f5af18c1007))
- **modal:** allow styling ModalContent ([a849cd8](https://github.com/qwikifiers/qwik-ui/commit/a849cd84706c088e05cf04f5d818b25d4a4cf556))
- **modal:** clean up focus-trap ([98a3f4d](https://github.com/qwikifiers/qwik-ui/commit/98a3f4d792f27982a015c7e16b3c8255ed59e831))
- **modal:** export public API ([c737fce](https://github.com/qwikifiers/qwik-ui/commit/c737fce43d8876e3ee6db7b2d76a8322a0727549))
- **modal:** hero example changed, fixed copy button and border radius issue, semantic markup ([831dd89](https://github.com/qwikifiers/qwik-ui/commit/831dd89ec3538642fef75412a659c002da91897f))
- **modal:** introduce trigger, close and portal ([0270e0f](https://github.com/qwikifiers/qwik-ui/commit/0270e0f0a6a8170c84a4bd2874e8e54d3c8f0a42))
- **modal:** remove "show" & "bind:closeOnBackdropClick" ([d0dc878](https://github.com/qwikifiers/qwik-ui/commit/d0dc8782344284b73dc62cc98df831de4cfa5f41))
- **modal:** remove fullScreen property ([be52fc2](https://github.com/qwikifiers/qwik-ui/commit/be52fc26228f2d7f08893b6e4bb9be8e5edc232f))
- **modal:** require bind:show ([99ae628](https://github.com/qwikifiers/qwik-ui/commit/99ae6284ce69c0687a6321817e121cd5cab3395f))
- **modal:** transition support, fixed type errors in spec ([0da3e6b](https://github.com/qwikifiers/qwik-ui/commit/0da3e6b84f1738cb6e1804df8f2205c041ab4995))
- **modal:** use signals instead of exposing functions ([6ffa690](https://github.com/qwikifiers/qwik-ui/commit/6ffa6904951683f8282e92f6332a6b34f03ebeef))
- **pagination:** add algorithm for dynamic button generation ([79a0683](https://github.com/qwikifiers/qwik-ui/commit/79a0683f07b9cd8f6e977429b319020fd5fc5a31))
- **pagination:** add disable feature and improve doc ([e05014a](https://github.com/qwikifiers/qwik-ui/commit/e05014adf0de341a9bb8a0afbb0da7e30d3eeeef))
- **pagination:** allow to hide next and previous buttons ([ee8b639](https://github.com/qwikifiers/qwik-ui/commit/ee8b63966d0b741c78c753b2aeead9a55ab4de3c))
- **pagination:** support custom labels ([cf9e79e](https://github.com/qwikifiers/qwik-ui/commit/cf9e79ea0a27ad517ef6afb6ef78b3fa3bafa9c6))
- **tailwind:dialog:** add full-screen example ([03a6d1f](https://github.com/qwikifiers/qwik-ui/commit/03a6d1f87adb431ece1202c0528a99a7b6b7a84b))
- **tailwind:dialog:** add scrolling content example ([03f3120](https://github.com/qwikifiers/qwik-ui/commit/03f3120b76fe1afbd4a899ef38a5f92070a5036e))

### Reverts

- Revert "refactor(modal): remove ESC-handler" ([4a453a8](https://github.com/qwikifiers/qwik-ui/commit/4a453a87ccb37743d05978ea0c0b55da31f9d643))

## [0.1.17](https://github.com/qwikifiers/qwik-ui/compare/headless-0.1.16...headless-0.1.17) (2023-10-03)

## [0.1.16](https://github.com/qwikifiers/qwik-ui/compare/headless-0.1.15...headless-0.1.16) (2023-09-26)

### Bug Fixes

- **types:** types no longer under qwik-ui/ ([5afc917](https://github.com/qwikifiers/qwik-ui/commit/5afc9174b015c576b05caa72266e0ff38ab73031)), closes [#396](https://github.com/qwikifiers/qwik-ui/issues/396)

## [0.1.15](https://github.com/qwikifiers/qwik-ui/compare/headless-0.1.14...headless-0.1.15) (2023-09-22)

### Bug Fixes

- **bump qwik dep version:** bump qwik peer dep in packages ([10fc5ed](https://github.com/qwikifiers/qwik-ui/commit/10fc5edf7398792c84e22fdb78f19425462a6718)), closes [#396](https://github.com/qwikifiers/qwik-ui/issues/396)

## [0.1.14](https://github.com/qwikifiers/qwik-ui/compare/headless-0.1.13...headless-0.1.14) (2023-09-19)

### Bug Fixes

- **combobox:** fix race condition issue with disabled options ([494d68f](https://github.com/qwikifiers/qwik-ui/commit/494d68f362a8d84a34a07ac80403a5c5188fd2a4))
- **combobox:** remove platform prop ([dd029ce](https://github.com/qwikifiers/qwik-ui/commit/dd029ce4f76f8279623759b1aacee7e0de914734))
- **combobox:** removing extra ref api ([d7f4982](https://github.com/qwikifiers/qwik-ui/commit/d7f49822e3973e8c3db50fddb727c87ff5921e10))
- **cypress:** tests fixes, docs improvements ([90688a4](https://github.com/qwikifiers/qwik-ui/commit/90688a437f6263170460a826bd4dea2b247e6600))
- **docs & popover:** popover overflow fix, banner animation fix ([fd9ec4e](https://github.com/qwikifiers/qwik-ui/commit/fd9ec4eefc35641d6bfcde3fc95c37c9ae8c1334))
- **headless/tabs:** flickering is fixed ([e5193fc](https://github.com/qwikifiers/qwik-ui/commit/e5193fcdd19de5a42806a51bb2a342d317e5ece1))
- **headless/tabs:** type issues ([aa15c83](https://github.com/qwikifiers/qwik-ui/commit/aa15c836831341aa3ee2ac112347312eab73fbc3))
- **kit-headless:** fix the TS2742 errors on dts generation ([b71d1d0](https://github.com/qwikifiers/qwik-ui/commit/b71d1d01729eb8a744ac397325c3dfd1c0c68a52))
- type issues ([ba0eaaa](https://github.com/qwikifiers/qwik-ui/commit/ba0eaaa168b717efae6c4db0ee01fcdfb3aee811))

### Features

- add new separator component and fix typo in status banner message ([e9f9d37](https://github.com/qwikifiers/qwik-ui/commit/e9f9d377fee77392ff3dca43d5acc2cdeb555a1e))
- **combobox:** adding floating UI feature parity for the listbox ([edaa979](https://github.com/qwikifiers/qwik-ui/commit/edaa9794ca09eb93365d4e8cd773196862b425aa))
- **combobox:** beta! This component can be used in production ([54c8330](https://github.com/qwikifiers/qwik-ui/commit/54c8330b923b06b3ce5af408092ac830ba679de1))
- **combobox:** filter API, major refactor, type changes, docs additions ([a47e524](https://github.com/qwikifiers/qwik-ui/commit/a47e5248c8ad21808a7b4566291d10158e390c51))
- **combobox:** focus first option when hitting down arrow ([1bc9bca](https://github.com/qwikifiers/qwik-ui/commit/1bc9bcaf9562e4c26863714d3e14b56453443632))
- **combobox:** more feature parity with floating UI ([742ccfd](https://github.com/qwikifiers/qwik-ui/commit/742ccfd1a581754e6bc624af154e16ca5e163e51))
- **combobox:** new keyboard navigation, selecting options, prevent default on click ([15d5924](https://github.com/qwikifiers/qwik-ui/commit/15d5924d3ed56d6af31b852b6cdb35a019ed15f1))
- **combobox:** new prop support such as default Value, better navigation, bigger test suite ([4b4ae1b](https://github.com/qwikifiers/qwik-ui/commit/4b4ae1bd28feef152c60b5eb65f78e816a136685))
- **combobox:** proper disabled behavior, refactor ([1bff0a0](https://github.com/qwikifiers/qwik-ui/commit/1bff0a0fd13ad106d632fe968a2cf68485b7b36c))
- **combobox:** search Bar configuration ([6149b6d](https://github.com/qwikifiers/qwik-ui/commit/6149b6ddda49a20222829b9da759ec38c54313f4))
- **docs:** docs fixes ([ac59001](https://github.com/qwikifiers/qwik-ui/commit/ac59001ab3e25e9f8ee7253e4fc9fe41fa47c98e))
- **docs:** docs redesign ([bdc9e95](https://github.com/qwikifiers/qwik-ui/commit/bdc9e9541a3b98c5069705f0dd345d3ab6c7c912))
- **docs:** updating a lot more docs examples ([e895a61](https://github.com/qwikifiers/qwik-ui/commit/e895a616dc5e235a5b57e48db4dc8c4ac130b195))
- **headless/tabs:** add `disabled` to TabPanel ([d705db4](https://github.com/qwikifiers/qwik-ui/commit/d705db457134996b53482409caa6de490f65e120))
- **headless/tabs:** add tabId to tab ([eb40287](https://github.com/qwikifiers/qwik-ui/commit/eb40287f19c646787af7fa40147ada079ffe118c))
- **headless/tabs:** shortcut for adding tabs ([de08124](https://github.com/qwikifiers/qwik-ui/commit/de08124bcda7cb580bfe99e79b9d92bda6c193be))
- **popover:** adding accessibility to the popover trigger - removing ts-reflection ([a13cdf0](https://github.com/qwikifiers/qwik-ui/commit/a13cdf044f17911327b9c07718a9cf3e735fd1f7))
- **popover:** adding accessibility to the popover trigger as a first test ([1bf6f99](https://github.com/qwikifiers/qwik-ui/commit/1bf6f99b53ef8ae54a4c25b667dcfbe4c8570c2e))
- **popover:** changes after review ([c3e1532](https://github.com/qwikifiers/qwik-ui/commit/c3e1532cd0def0a4248162f46f919e58ad701f87))
- **popover:** changes after review ([f3581fb](https://github.com/qwikifiers/qwik-ui/commit/f3581fb8fd9447b993c7f66abe1aa9805f3cbc41))
- **popover:** fixed comments from the code review ([caf47c0](https://github.com/qwikifiers/qwik-ui/commit/caf47c09391efc07bc214f9ba2f0b145cf511d82))
- **popover:** Making the solution more reliable ([5d65ffd](https://github.com/qwikifiers/qwik-ui/commit/5d65ffd817ae9bcd21104200ebab8b7302b4ba14))
- **popover:** Signing cla ([c596e24](https://github.com/qwikifiers/qwik-ui/commit/c596e249300104caa00d07c1d58b584d60f53964))
- **portals:** portals support, deprecation of autocomplete ([e4c03fe](https://github.com/qwikifiers/qwik-ui/commit/e4c03fed98fc01f291efd72de9b283902e4ecbf2))
- **tabs:** add "selected" shorthand ([2ecc712](https://github.com/qwikifiers/qwik-ui/commit/2ecc7127b6c67bac4298b1d447eeb4ffb692c875))

## [0.1.13](https://github.com/qwikifiers/qwik-ui/compare/headless-0.1.12...headless-0.1.13) (2023-08-01)

### Features

- **accordion:** dynamic tests, docs, refactor, accordion ready state :) ([b21617b](https://github.com/qwikifiers/qwik-ui/commit/b21617bac8aa3e2fb009126555461830125b7ba4))

## [0.1.12](https://github.com/qwikifiers/qwik-ui/compare/headless-0.1.11...headless-0.1.12) (2023-07-28)

### Bug Fixes

- **accordion:** proper generic type annotation ([598a22c](https://github.com/qwikifiers/qwik-ui/commit/598a22c0d5cf78cf455e8a4de531cd447519f7b1))

## [0.1.11](https://github.com/qwikifiers/qwik-ui/compare/headless-0.1.10...headless-0.1.11) (2023-07-28)

### Bug Fixes

- **accordion:** add propfunction type ([66e89b6](https://github.com/qwikifiers/qwik-ui/commit/66e89b670ca3386e6b4e8cb068a0f348d51d5c01))
- **accordion:** ci / lint warning fixes ([f7de15d](https://github.com/qwikifiers/qwik-ui/commit/f7de15d9744bca65d5fe3587b77457c449beb28d))
- **accordion:** defaultValue flicker fix ([f8a7bd0](https://github.com/qwikifiers/qwik-ui/commit/f8a7bd0f5439c255f59a2f341cf789a683bf6cc8))
- **accordion:** docs typo, cleanup comments, comment out dynamic tests for now ([049d788](https://github.com/qwikifiers/qwik-ui/commit/049d7885a51ac273ec1bb7781d6db6c07969195d))
- **accordion:** fixed animated height calculation for keyframes ([bb320ef](https://github.com/qwikifiers/qwik-ui/commit/bb320ef3dd6ef6b6ec9e1ab1d0063ee8c274294f))
- **accordion:** proper naming of QRL ([669863e](https://github.com/qwikifiers/qwik-ui/commit/669863ed88bd2d8b9f4056ae9bcb528c69e25fe9))
- **eslint props task error:** eslint props task error fix ([048d9ce](https://github.com/qwikifiers/qwik-ui/commit/048d9cee18ba013e4e9ee88ab93c485ede8e2313))

### Code Refactoring

- **select:** update event handlers ([bc08c54](https://github.com/qwikifiers/qwik-ui/commit/bc08c54872275ba8dfd1d0cf81733ae8cd3e70eb))

### Features

- **accordion & website:** accordion examples, feats, critical fix, website font build fix ([a6a213b](https://github.com/qwikifiers/qwik-ui/commit/a6a213beb61fab01a123b46e67be0fa5fe10deaf))
- **accordion:** possible ready state, major refactor, major docs additions ([fffbb87](https://github.com/qwikifiers/qwik-ui/commit/fffbb8703b52af7d12cac53cb37dbd8b460c1756))
- **accordion:** small code refactor, and props array for consumers ([1e37d53](https://github.com/qwikifiers/qwik-ui/commit/1e37d5349a66fc5334e29c778130bb6363ab9baa))
- **Select:** add preliminary required behaviour ([009be72](https://github.com/qwikifiers/qwik-ui/commit/009be72d8b6c43a9b3bad9331eb20e459dfdb11e))

### BREAKING CHANGES

- **select:** Previously, optionValue automatically emits as a text node to the <li> element for
  SelectOption which was potentially problematic if the user has different values for what should be
  displayed instead of what is stored in state for form submission

## [0.1.10](https://github.com/qwikifiers/qwik-ui/compare/headless-0.1.9...headless-0.1.10) (2023-07-13)

### Bug Fixes

- **headless/tabs:** disabled edges working now ([92ae8c8](https://github.com/qwikifiers/qwik-ui/commit/92ae8c877622429dffc24a3d9fdc2a957ffbedac))

### Features

- **accordion & banner:** major accordion refactor and banner component for docs ([c5d4017](https://github.com/qwikifiers/qwik-ui/commit/c5d40172243ac9fa71917fea1f44c2dc96ccc340))
- **headless/tabs:** add custom selected class ([0590bf4](https://github.com/qwikifiers/qwik-ui/commit/0590bf424b76f773be60f0e2ead52ea8861a96ca))

## [0.1.9](https://github.com/qwikifiers/qwik-ui/compare/headless-0.1.8...headless-0.1.9) (2023-07-08)

### Bug Fixes

- types path in all packages ([d1baf5e](https://github.com/qwikifiers/qwik-ui/commit/d1baf5ea69a23d5f8f9700c0e6d5bb006c642cf9))

## [0.1.8](https://github.com/qwikifiers/qwik-ui/compare/headless-0.1.7...headless-0.1.8) (2023-07-04)

### Bug Fixes

- **attempted build fix:** n ([3d3158a](https://github.com/qwikifiers/qwik-ui/commit/3d3158a1bda10ab3f182d127e75f9d9f81bdc3d7))
- **autocomplete & website deploy fixes:** autocomplete dropdown fix & deploy fix ([6a1710e](https://github.com/qwikifiers/qwik-ui/commit/6a1710e65e9aa038f70a12a444e4747d3450c062))
- **autocomplete file issue:** n ([f44779d](https://github.com/qwikifiers/qwik-ui/commit/f44779d951771b1f513d70c7366725d7da53f2f3))
- **autocomplete issue:** n ([81c1acb](https://github.com/qwikifiers/qwik-ui/commit/81c1acb300caedc02546dbd44f2a0f4dbc160105))
- content blocking aria-expanded and select visible after computed ([0e97e1b](https://github.com/qwikifiers/qwik-ui/commit/0e97e1b7c8722638f00513dae522781bd0b0463b))
- **cypress:** attempt to fix async error in cypress ([8240870](https://github.com/qwikifiers/qwik-ui/commit/82408705e337d638e31f7d6ce385cc993ff2401b))
- **fixed enter key not properly hiding listbox:** enter key now hides the listbow ([899a56d](https://github.com/qwikifiers/qwik-ui/commit/899a56dcaeaea3f1e32f244e5fe07c7c65d2935b))
- **headless/tabs:** removed empty if ([1e8be6b](https://github.com/qwikifiers/qwik-ui/commit/1e8be6b15dc1244d32ec00960250baf72b6464de))
- **headless/tabs:** render on server ([8309d7b](https://github.com/qwikifiers/qwik-ui/commit/8309d7b4e5c93058e4fbb5f7951e8f198f895a36))
- **headless/tabs:** restored dynamic handling ([c5621a5](https://github.com/qwikifiers/qwik-ui/commit/c5621a53c0258fb4c1ad1f30a142367d74009ade))
- **headless/tabs:** specific preventDefault ([a7bd27b](https://github.com/qwikifiers/qwik-ui/commit/a7bd27b9ecf841386afc571f9bfee8dceccec6c8))
- **headless:** added tests to ts exclude ([8bc36a0](https://github.com/qwikifiers/qwik-ui/commit/8bc36a0c5cc4ba86a14a78742388ed89f3d595f4))
- **hopeful fix for autocomplete directory:** n ([f6368ae](https://github.com/qwikifiers/qwik-ui/commit/f6368ae4894b8c5ee96a4f4fc488ee18901d9a6b))
- moved useId outside fo template ([ce2799f](https://github.com/qwikifiers/qwik-ui/commit/ce2799f1181ff5b970dab0b867e9bd12c878b5d3))
- **popover-content:** add aria-label attr to pass a11y cypress assertion ([dd06273](https://github.com/qwikifiers/qwik-ui/commit/dd06273facf460462e1e1d1868f05627ef93425c))
- **previous commit:** overwrite previous commit ([3767c44](https://github.com/qwikifiers/qwik-ui/commit/3767c4405990c72edee776963bf3a9d339bfb081))
- tabs flicker ([e2227c2](https://github.com/qwikifiers/qwik-ui/commit/e2227c21f9d1dd89d1074f223e94753aa8530a4c))
- tabs, finally 😅 ([9d579b6](https://github.com/qwikifiers/qwik-ui/commit/9d579b68c91baaaa03b0872deb91c46a4df44fae))
- **tabs:** wrong labelledBy value ([8cb43c9](https://github.com/qwikifiers/qwik-ui/commit/8cb43c97fa2d8b359ede08121f1a01b6504f6780))

### Features

- **accessibility:** axe accessibility recommendation changes ([ef1e1f2](https://github.com/qwikifiers/qwik-ui/commit/ef1e1f295c833fd5acfb59db61e33b4cb5554e51))
- add carousel component ([#280](https://github.com/qwikifiers/qwik-ui/issues/280)) ([396aeb1](https://github.com/qwikifiers/qwik-ui/commit/396aeb1843740c3cf7f50520dc2ebb3882692e77))
- **component:** add support for button custom labels ([b71af63](https://github.com/qwikifiers/qwik-ui/commit/b71af63ad2032fcf23942d8d2c8156d355cd359d))
- **component:** add support to customize the default and active classes in button ([8ad71bf](https://github.com/qwikifiers/qwik-ui/commit/8ad71bf66059582f7818d113c5a8e5c3c2d89e54))
- **cypress select tests:** added tests for select component using cypress ([515e77d](https://github.com/qwikifiers/qwik-ui/commit/515e77ddc76e69ea5ed2c51a2a49097541059c19))
- **disabled options for autocomplete:** disabled options for autocomplete ([f9c01b3](https://github.com/qwikifiers/qwik-ui/commit/f9c01b3da86bac96b41921f78c3b23b331c4d84d))
- **docs:** add preview/code switching to examples ([05862dc](https://github.com/qwikifiers/qwik-ui/commit/05862dc73123b46b4f1153726af09a21aa6c62db))
- **filtering, autocomplete functionality , along with selecting an object:** autocomplete works ([f3cd73c](https://github.com/qwikifiers/qwik-ui/commit/f3cd73c179ba902c58d3ac522bf6b4bbadb1ed3e))
- **headless/tabs:** add right arrow support ([1284b1e](https://github.com/qwikifiers/qwik-ui/commit/1284b1e1b48747de42993368aaab21a019e22746))
- **headless/tabs:** end,home,pagedn,pageup ([745c8bd](https://github.com/qwikifiers/qwik-ui/commit/745c8bd44fdb50c8a550d2655830b9f6414b2ec2))
- **headless/tabs:** handle left arrow, home, end ([487de0e](https://github.com/qwikifiers/qwik-ui/commit/487de0efc2587392d3bad2a49a40b98551c36541))
- **headless/tabs:** handle vertical tabs ([1a6ae5a](https://github.com/qwikifiers/qwik-ui/commit/1a6ae5af7417640b0ed624f25e35bbd28c2a43b1))
- **headless/tabs:** onSelectedIndexChange ([a43c87a](https://github.com/qwikifiers/qwik-ui/commit/a43c87aba2d778deafdfc206935b233b0ebf089f))
- **headless:** tabs selectedIndex impl & tests ([74fb635](https://github.com/qwikifiers/qwik-ui/commit/74fb635e6887cc58d8eb7e80826bfad42aa1e2e1))
- **initial api additions & scaffolding:** initial API, Setting up types & props ([99e31e6](https://github.com/qwikifiers/qwik-ui/commit/99e31e6ecd1f2b2df5b680a11017e353cfb40786))
- **keyboard navigation & aria:** added keyboard navigation ([09689c0](https://github.com/qwikifiers/qwik-ui/commit/09689c053429c6ec0744ae7d320e11b5d54b8eea))
- **listbox toggle, floating ui anchor additiongs, listbox wrapper:** part of the autocomplete added ([593aa80](https://github.com/qwikifiers/qwik-ui/commit/593aa80af6c8df565001a4209d9cd358cb9ecc37))
- **popover-content:** add aria-modal attr ([4b8aa11](https://github.com/qwikifiers/qwik-ui/commit/4b8aa11398d0f05d79f2986e6db46f1d8d8d0c71))
- **popover:** add roles to popover trigger and content ([4d8c94a](https://github.com/qwikifiers/qwik-ui/commit/4d8c94a72023ebb6cc5614bbf5c6e617d4fa1322))

## [0.1.7](https://github.com/qwikifiers/qwik-ui/compare/headless-0.1.6...headless-0.1.7) (2023-04-29)

### Bug Fixes

- types on published kits ([a05f758](https://github.com/qwikifiers/qwik-ui/commit/a05f7586fa04abc676d145f48c38950327022468))

## [0.1.6](https://github.com/qwikifiers/qwik-ui/compare/headless-0.1.5...headless-0.1.6) (2023-04-29)

### Bug Fixes

- build paths ([aabbd0f](https://github.com/qwikifiers/qwik-ui/commit/aabbd0f760d0bee56451433070cc8d1b31df7c53))

## [0.1.5](https://github.com/qwikifiers/qwik-ui/compare/headless-0.1.4...headless-0.1.5) (2023-04-29)

## [0.1.4](https://github.com/qwikifiers/qwik-ui/compare/headless-0.1.3...headless-0.1.4) (2023-04-28)

### Bug Fixes

- add css inline definitions ([#276](https://github.com/qwikifiers/qwik-ui/issues/276)) ([0ed7d96](https://github.com/qwikifiers/qwik-ui/commit/0ed7d961ee0d4249afbb569bedc9bc3e18fa5807))
- project folders and linter ([#205](https://github.com/qwikifiers/qwik-ui/issues/205)) ([198f729](https://github.com/qwikifiers/qwik-ui/commit/198f729b1263797941ee21f82a2c71b20727c45e))
- remove any to satisfy the picky linter ✅ ([737860b](https://github.com/qwikifiers/qwik-ui/commit/737860bc6f06d523e813c0088dc1265dd36ed0f3))
- solve headless linter warnings ([a97d826](https://github.com/qwikifiers/qwik-ui/commit/a97d826eff4fb16f51b027c87829e9c3b31f7f1e))
- solve linter errors ([100ed43](https://github.com/qwikifiers/qwik-ui/commit/100ed4376b7cbfe454cef9ca7b1743c6335bf069))
- **toggle component:** renamed prop & change funcionality in Toggle ([#210](https://github.com/qwikifiers/qwik-ui/issues/210)) ([d96c401](https://github.com/qwikifiers/qwik-ui/commit/d96c40130fc8bf38036d837c478de5ed503f24b1)), closes [#209](https://github.com/qwikifiers/qwik-ui/issues/209)
- tooltip works only the first time ([#269](https://github.com/qwikifiers/qwik-ui/issues/269)) ([29b14ff](https://github.com/qwikifiers/qwik-ui/commit/29b14ff91981d6782885993422f1e7ea6bb9f2dc))
- update config to enable cypress component testing ([ff170b8](https://github.com/qwikifiers/qwik-ui/commit/ff170b8491a58f2fd300a62745f5e7be8e2d45fd))

### Features

- add checkbox ([#154](https://github.com/qwikifiers/qwik-ui/issues/154)) ([b8d9a73](https://github.com/qwikifiers/qwik-ui/commit/b8d9a7312a276dfa0c96a4f0b0592e08b134f9fe)), closes [#128](https://github.com/qwikifiers/qwik-ui/issues/128)
- add daisy slider component ([#199](https://github.com/qwikifiers/qwik-ui/issues/199)) ([f9b997d](https://github.com/qwikifiers/qwik-ui/commit/f9b997dcbcc2edc1c23948c93f4dc783e7b620d6))
- add input phone ([#243](https://github.com/qwikifiers/qwik-ui/issues/243)) ([8c8b1aa](https://github.com/qwikifiers/qwik-ui/commit/8c8b1aa6a825852ed3bde0695514b9f7d676ecaf))
- added a11y to storybook ([2310d71](https://github.com/qwikifiers/qwik-ui/commit/2310d71ef378c8852704a472da903b1a82ec6f48))
- auto country code ([#249](https://github.com/qwikifiers/qwik-ui/issues/249)) ([91af379](https://github.com/qwikifiers/qwik-ui/commit/91af3798fe9c6e298c4747208b8db64cfd1bd3c6))
- base pagination ([#151](https://github.com/qwikifiers/qwik-ui/issues/151)) ([76aed0e](https://github.com/qwikifiers/qwik-ui/commit/76aed0e6ae2e9c67051ab574f0d1e3c9313904e6)), closes [#130](https://github.com/qwikifiers/qwik-ui/issues/130) [#15](https://github.com/qwikifiers/qwik-ui/issues/15)
- **component:** Add Badge Component ([#222](https://github.com/qwikifiers/qwik-ui/issues/222)) ([fe15e6c](https://github.com/qwikifiers/qwik-ui/commit/fe15e6ce8a96941f295887739f5dff4cbc296c21)), closes [#219](https://github.com/qwikifiers/qwik-ui/issues/219)
- **component:** add carousel component ([#258](https://github.com/qwikifiers/qwik-ui/issues/258)) ([d258189](https://github.com/qwikifiers/qwik-ui/commit/d2581896653b6291f5b1ed97a6802069f2b7ddc3))
- **component:** Add loading indicator ([#207](https://github.com/qwikifiers/qwik-ui/issues/207)) ([923fd4e](https://github.com/qwikifiers/qwik-ui/commit/923fd4e356f4855fa1be0e6ce449ed3146683231))
- **component:** add navigation bar ([#213](https://github.com/qwikifiers/qwik-ui/issues/213)) ([dfd89e0](https://github.com/qwikifiers/qwik-ui/commit/dfd89e04b2b765476d3f31ea066af56050318ff8)), closes [#200](https://github.com/qwikifiers/qwik-ui/issues/200)
- **component:** add new Breadcrumb component ([#212](https://github.com/qwikifiers/qwik-ui/issues/212)) ([5b526cc](https://github.com/qwikifiers/qwik-ui/commit/5b526cc2cc23acc9fecd3aefefa881af0deb33c4))
- **component:** an alert component ([#218](https://github.com/qwikifiers/qwik-ui/issues/218)) ([d3daf68](https://github.com/qwikifiers/qwik-ui/commit/d3daf68e2f1a64cc9f267c4ca41262942bd92e0d)), closes [#217](https://github.com/qwikifiers/qwik-ui/issues/217)
- **component:** improve pagination ([#208](https://github.com/qwikifiers/qwik-ui/issues/208)) ([5d86b51](https://github.com/qwikifiers/qwik-ui/commit/5d86b510809276e748ad990cd0310bd88155c391))
- **input:** add input component ([#257](https://github.com/qwikifiers/qwik-ui/issues/257)) ([43c5f53](https://github.com/qwikifiers/qwik-ui/commit/43c5f53cbcd5ca5d08f522fa0707a251026a046e))

### BREAKING CHANGES

- **toggle component:** any component who uses daisy-toggle, will have to rename `checked` to `pressed`

## [0.1.3](https://github.com/qwikifiers/qwik-ui/compare/headless-0.1.2...headless-0.1.3) (2023-02-23)

## [0.1.2](https://github.com/qwikifiers/qwik-ui/compare/headless-0.1.1...headless-0.1.2) (2023-02-23)

### Bug Fixes

- debounce showing/hiding the tooltip ([#159](https://github.com/qwikifiers/qwik-ui/issues/159)) ([f889444](https://github.com/qwikifiers/qwik-ui/commit/f889444da72e7c1f7f9ba3bb05fb470ad057a017))
- deprecated useClientEffect$ and createContext hooks ([#187](https://github.com/qwikifiers/qwik-ui/issues/187)) ([ff6016f](https://github.com/qwikifiers/qwik-ui/commit/ff6016f88f19a6a0f915afe5f70f5576e3c3be1a))
- **rating:** add useId as key for each RatingIcon ([#162](https://github.com/qwikifiers/qwik-ui/issues/162)) ([b9f47b1](https://github.com/qwikifiers/qwik-ui/commit/b9f47b1bed4898db9056a397b725fa07e2ab03a3))
- remove any from Component<any> ([#190](https://github.com/qwikifiers/qwik-ui/issues/190)) ([35bc6fa](https://github.com/qwikifiers/qwik-ui/commit/35bc6faac9717a29c8162486c08d0ef21a809641))
- remove double await ([97c9f0e](https://github.com/qwikifiers/qwik-ui/commit/97c9f0eb9a971e1d793add29fd7accec48c8d835)), closes [#75](https://github.com/qwikifiers/qwik-ui/issues/75)
- remove warnings ([#182](https://github.com/qwikifiers/qwik-ui/issues/182)) ([befcbc5](https://github.com/qwikifiers/qwik-ui/commit/befcbc5509708a3c222a6a634cce4dc5bf93dfb4))
- rub up tests ([0f2adf9](https://github.com/qwikifiers/qwik-ui/commit/0f2adf91822a3c40072f72c07463024849cd79d1))

### Features

- **component:** add draft Popover component ([#140](https://github.com/qwikifiers/qwik-ui/issues/140)) ([15950fe](https://github.com/qwikifiers/qwik-ui/commit/15950fe87a23a35ce8d6a5d61a2599a2687abf7d))
- **component:** add new Progress Bar component ([#174](https://github.com/qwikifiers/qwik-ui/issues/174)) ([5bf8262](https://github.com/qwikifiers/qwik-ui/commit/5bf8262e86abd20590baa81cc69988dd5daf307b)), closes [#129](https://github.com/qwikifiers/qwik-ui/issues/129)
- **component:** add radio component ([#178](https://github.com/qwikifiers/qwik-ui/issues/178)) ([35b7a60](https://github.com/qwikifiers/qwik-ui/commit/35b7a60ceda6233587fe4f6ffe2b187e7ef5757e)), closes [#128](https://github.com/qwikifiers/qwik-ui/issues/128)
- **component:** add the Accordion Component ([#176](https://github.com/qwikifiers/qwik-ui/issues/176)) ([523d19d](https://github.com/qwikifiers/qwik-ui/commit/523d19d124c245f3973b3b6ac0adbb82a6820e60)), closes [#126](https://github.com/qwikifiers/qwik-ui/issues/126)
- **component:** add the rating component ([#149](https://github.com/qwikifiers/qwik-ui/issues/149)) ([0c07dd9](https://github.com/qwikifiers/qwik-ui/commit/0c07dd993f7ea46dc93420625ca8bbb8c3dc2e69))
- **component:** added a new headless slider component ([#169](https://github.com/qwikifiers/qwik-ui/issues/169)) ([80f860f](https://github.com/qwikifiers/qwik-ui/commit/80f860f1536e2364eddd6295a4375639bbcc6b4e))
- **component:** added a Toast component that reads the label, the po… ([#157](https://github.com/qwikifiers/qwik-ui/issues/157)) ([019f7fa](https://github.com/qwikifiers/qwik-ui/commit/019f7fa1e72ef7bd85c19adec3184add33e55010))
- headless menu ([#158](https://github.com/qwikifiers/qwik-ui/issues/158)) ([1ec959e](https://github.com/qwikifiers/qwik-ui/commit/1ec959eb81c127161db52ab8ab0d6e27ac34e7a1))

## [0.1.1](https://github.com/qwikifiers/qwik-ui/compare/headless-0.1.0...headless-0.1.1) (2023-02-09)

### Bug Fixes

- actions/test ([#107](https://github.com/qwikifiers/qwik-ui/issues/107)) ([816fa37](https://github.com/qwikifiers/qwik-ui/commit/816fa377cc7996ffb0cf5985068a205d7df9d197))
- **component:** add TS support for HTMLButton properties ([b3fca21](https://github.com/qwikifiers/qwik-ui/commit/b3fca210dbe026c653e0f4a7518ed7621bd1aeda))

- add select implementation (#88) ([ba67163](https://github.com/qwikifiers/qwik-ui/commit/ba671637546cd2211960f05fb3187fd173517958)), closes [#88](https://github.com/qwikifiers/qwik-ui/issues/88) [#76](https://github.com/qwikifiers/qwik-ui/issues/76) [#76](https://github.com/qwikifiers/qwik-ui/issues/76) [#76](https://github.com/qwikifiers/qwik-ui/issues/76) [#88](https://github.com/qwikifiers/qwik-ui/issues/88) [#88](https://github.com/qwikifiers/qwik-ui/issues/88) [#88](https://github.com/qwikifiers/qwik-ui/issues/88) [#97](https://github.com/qwikifiers/qwik-ui/issues/97) [#88](https://github.com/qwikifiers/qwik-ui/issues/88) [#88](https://github.com/qwikifiers/qwik-ui/issues/88)

### Features

- add Button component ([#98](https://github.com/qwikifiers/qwik-ui/issues/98)) ([58f1ff1](https://github.com/qwikifiers/qwik-ui/commit/58f1ff1fcabbe9f0cfb66203000e84d76096d5b4))
- **component:** add ButtonGroup component ([#103](https://github.com/qwikifiers/qwik-ui/issues/103)) ([30d9f69](https://github.com/qwikifiers/qwik-ui/commit/30d9f697e9cda54d9aa7ee452fe870d555ad0ce5))

### BREAKING CHANGES

- Value on option elements are set to 0 despite value prop being successfully passed
