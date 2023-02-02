# Qwik-UI Coding Standards

## Headless package CSS style

The goal of this pack is to have a minimal style to be used at will. For the documentation of the headless components we will provide minimal examples style to show them to the end users

## Coding practices

- Naming conventions

Use Pascal casing for the component names. For example:
``` jsx
<Select>
<SelectTrigger>
<SelectItem>
```
Use Signal postfix in signal name. For example:
``` js
const myComponentSignal = useSignal('');
```
Use camel casing for folder names and for file names. For example:
```
buttonGroup.tsx
buttonGroup folder
```

###Component conventions
- For each component, add a props interface and declare all the props API there. For example:
``` ts
interface TooltipProps {
  class?: string;
  className?: string;
  tip: string;
  type?: ColorTypes;
  position?: Positions;
}
```
- Use object destructuring in the component$ declaration on all the props. For example:
``` tsx
export const Tooltip = component$(({ tip, position = 'top', type, ...props}: TooltipProps) => {
   ...
});
```
- Try to avoid using `useClientEffect$` function. See [Qwik best practices](https://qwik.builder.io/docs/cheat/best-practices/) for the why.

