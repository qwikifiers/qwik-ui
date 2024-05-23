---
'@qwik-ui/headless': minor
---

### Accordion

The Accordion has been refactored from the ground up to be more accessible and performant.

The entire Qwik UI library now does not execute code until interaction.

#### Accordion.Root

- The `behavior="multi"` prop has been replaced with `multiple` on the `<Accordion.Root />` component.

- The default behavior is a single item open at a time.

- The `animated` prop has been deprecated. Animation entry and exit are now automatically handled by the component.

- `onSelectIndexChange$` has been deprecated in favor of `onChange$`.

- `onFocusIndexChange$` has been deprecated

- Reactively control the accordion with the `bind:value` prop.

- Control the initial value with the `value` prop.

- Disable the entire accordion by using the `disabled` prop.

#### Accordion.Item

- Pass distinct values to the `<Accordion.Item />` component with the `value` prop.

- Disable Accordion items by setting the `disabled` prop to true on the `<Accordion.Item />` component.

For more information, please refer to the updated Accordion documentation.

### Collapsible

- The `onOpenChange$` prop has been deprecated. Use the `onChange$` prop instead.

For more information, please refer to the updated Collapsible documentation.

### Deprecated Components

In 0.4, we have deprecated the following headless components:

- Drawer
- Breadcrumb
- Action Button
- Button Group
- Toast
- Tooltip
- Card
- Badge
- Spinner
- Rating
- Checkbox

Most of these components were in a pre-alpha state, duplicates from the styled kit, or were not yet ready for production use. They were lying around in the codebase for a while, and we have gained many insights since then on creating accessible, unstyled, and performant components.

You can expect the **Toast** and the **Tooltip** to come back with a much more polished form in a future release.
