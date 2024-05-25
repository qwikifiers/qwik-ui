---
'@qwik-ui/headless': minor
---

### Select API Changes

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
