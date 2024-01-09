# Qwik-UI Coding Standards

## Primitives package

In the primitive package you put only primitive elements. What is a primitive element? A Qwik element wrapper that wraps a regular Html element and doesn't add any behavior to it in particular. All these elements should be implemented as [lite components](https://qwik.builder.io/docs/components/lite-components), if that is possible (for example, because Checkbox uses an inner state it isn't implemented as a lite component).

## Headless package CSS style

The goal of this package is to have a minimal style to be used at will. For the documentation of the headless components we will provide minimal examples style to show them to the end users.
_Pay attention that classes from frameworks such as Tailwind, Daisy, Bootstrap etc. must not leak into the headless package_.

## Coding practices

- Naming conventions

Use Pascal casing for the component names. For example:

```jsx
<Select>
<SelectTrigger>
<SelectItem>
```

Use Signal, Loader, Action postfixes in variable names. For example:

```js
const myComponentSignal = useSignal('');
const myDataLoader = loader.use();
const myCmpAction = action.use();
```

Use camel casing for folder names and for file names. For example:

```
buttonGroup.tsx
buttonGroup folder
```

### Component conventions

- For each component, export a props type and declare all the props API there.

For **headless** components:

```ts
export type TooltipProps = {
  tip: string;
  type?: ColorTypes;
  position?: Positions;
};
```

Note: if you want to include the HTML attributes, you can use the `PropsOf` type.

Example:

```ts
import { PropsOf } from '@builder.io/qwik';

export type TooltipProps = PropsOf<'div'> & {
  tip: string;
  type?: ColorTypes;
  position?: Positions;
};
```

For **Fluffy, Material and other components variations**, you can define the new props in a new type, named with the component name and the variation as prefix. For example:

```ts
type TailwindTooltipProps = {
  size?: 'sm' | 'md';
};
```

The final exported type will extend from the headless props type. For example:

```ts
import { TooltipProps as HeadlessTooltipProps } from '@qwik-ui/headless';

export type TooltipProps = HeadlessTooltipProps & TailwindTooltipProps;
```

- Use object destructuring in the component$ declaration on all the props you are going to use. For example:

```tsx
export const Tooltip = component$(({ tip, position = 'top', type, ...props}: TooltipProps) => {
   ...
});
```

- Use class and not className when in the JSX and in the component props (if you expect to have a class props part if the component props).
- Try to avoid using `useVisibleTask$` function. See [Qwik best practices](https://qwik.builder.io/docs/cheat/best-practices/) for the why.
- Try to use the Slot element whenever the component can accept children
- Use array spread on props to allow the component user to send props that override ours. For example:

```tsx
return (
  <span {...props}>
    <Slot />
  </span>
);
```

- Use accessibility attributes whenever they are needed.
- For simple primitive states use signals. For object state, use stores.

## Example of headless button customization with Tailwind

```tsx
import { component$, QwikIntrinsicElements, Slot } from '@builder.io/qwik';
import { Button as HeadlessButton, ButtonProps as ButtonHeadlessProps } from '@qwik-ui/headless';

type TailwindButtonProps = { size?: 'sm' | 'md', ... };
export type ButtonProps = ButtonHeadlessProps & TailwindButtonProps;

export const Button = component$(
  ({ size = 'md', class: classNames, ...rest }: ButtonProps) => {
    const { sizes, ... } = { sizes: { sm: 'btn-sm', md: 'btn-md', ... } };
    return (
      <HeadlessButton {...rest} class={['btn', sizes[size], classNames]}>
        <Slot />
      </HeadlessButton>
    );
  }
);
```

# A11y test coverage

Use [Axe](https://chrome.google.com/webstore/detail/axe-devtools-web-accessib/lhdoppojpmngadmnindnejefpokejbdd) Chrome extension in order to test components against the a11y standards.

Choose the suitable tests to perform among the different available categories:

- table
- keyboard
- modal dialog
- interactive elements
- structure
- images
- forms

Note: test only the component by choosing the parts of the page that have to be tested.

The extension is pretty talkative and provides all the insights to perform the tests with ease. Once tests' results are available, do your best to solve any issues found.

Share the tests results on the related Discord channel or Github PR.
