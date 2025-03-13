import { component$, FunctionComponent, PropsOf, Slot } from '@qwik.dev/core';

/**
 *  We can use polymorphic components to render different elements based on the type of the `as` prop.
 */
export const Polymorphic = component$(
  <C extends string | FunctionComponent = 'div'>({
    as,
    ...props
  }: { as?: C } & PropsOf<string extends C ? 'div' : C>) => {
    const Cmp = (as || 'div') as C;
    return (
      <Cmp {...props}>
        <Slot />
      </Cmp>
    );
  },
);
