# Qwik-UI Coding Standards

## Headless package CSS style

The goal of this pack is to have a minimal style to be used at will. For the documentation of the headless components we will provide minimal examples style to show them to the end users.

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

###Component conventions

- For each component, add a props interface and declare all the props API there. For example:

```ts
interface TooltipProps {
  class?: string;
  tip: string;
  type?: ColorTypes;
  position?: Positions;
}
```

- Use object destructuring in the component$ declaration on all the props you are going to use. For example:

```tsx
export const Tooltip = component$(({ tip, position = 'top', type, ...props}: TooltipProps) => {
   ...
});
```

- Try to avoid using `useClientEffect$` function. See [Qwik best practices](https://qwik.builder.io/docs/cheat/best-practices/) for the why.
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

## Example of headless button customisation with Daisy

```tsx
import { component$, QwikIntrinsicElements, Slot } from '@builder.io/qwik';
import { Button as HeadlessButton } from '@qwik-ui/headless';
import { clsq } from '@qwik-ui/shared';

// This type holds all the HTML attributes (disabled, hidden, ... )
export type HTMLButtonProps = QwikIntrinsicElements['button'];
export type DaisyButtonProps = { size?: 'sm' | 'md', ... };
export type ButtonProps = HTMLButtonProps & DaisyButtonProps;

export const Button = component$(
  ({ size = 'md', class: classNames, ...rest }: ButtonProps) => {
    const { sizes, ... } = { sizes: { sm: 'btn-sm', md: 'btn-md', ... } };
    return (
      <HeadlessButton {...rest} class={clsq('btn', sizes[size], classNames)}>
        <Slot />
      </HeadlessButton>
    );
  }
);
```
