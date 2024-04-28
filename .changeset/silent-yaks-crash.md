---
'@qwik-ui/headless': minor
---

**feat**: select now has a multi-select feature!

To opt-in to the multi-select mode, set the `multiple` prop to `true`. Please refer to the `Multiple Selections` section in the docs for more information.

**refactor**: `<SelectOption />` has been replaced with `<Select.ItemLabel />`.

The previous API did not allow for customization of list items. The new API introduces a new component:

```tsx
    <Select.Item>
      <Select.ItemLabel>My Display Option!</Select.ItemLabel>
    <Select.Item>
```

You can now put anything you'd like in your `<Select.Item />`, just like a list item!

There is also another new component called `<Select.ItemIndicator />`. This component is used to render an icon or other visual element that is displayed next to the `<Select.ItemLabel />` whenever an item is selected.

**docs**: The docs have been updated to reflect the new API.
