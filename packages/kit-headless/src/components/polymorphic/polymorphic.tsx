import { component$, PropsOf, Slot } from '@builder.io/qwik';

/**
 *  We can use polymorphic components to render different elements based on the type of the `as` prop.
 */
export const Polymorphic = component$(
  <C extends string = 'div'>({
    as,
    ...props
  }: { as?: C } & PropsOf<string extends C ? 'div' : C>) => {
    const Cmp = (as || 'div') as C;
    return (
      <>
        {/* @ts-expect-error annoying polymorphism */}
        <Cmp {...props}>
          <Slot />
        </Cmp>
      </>
    );
  },
);
