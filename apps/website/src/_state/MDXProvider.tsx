import {
  Component,
  component$,
  createContextId,
  useContext,
  Slot,
  useContextProvider,
} from '@builder.io/qwik';

export const MDXContext = createContextId<Components>('MDXContext');

export interface Components {
  [tag: string]: Component<unknown>;
}

/**
 * Get current components from the MDX Context.
 */
export function useMDXComponents() {
  return useContext(MDXContext, {});
}

export const DefaultWrapper = component$(() => {
  return <Slot />;
});

/**
 * Provider for MDX context
 */
export const MDXProvider = component$(
  ({
    components,
    disableParentContext,
  }: {
    components: Components;
    disableParentContext?: boolean;
  }) => {
    let allComponents = useMDXComponents();
    if (disableParentContext) {
      allComponents = components;
    } else {
      allComponents = { ...allComponents, ...components };
    }
    useContextProvider(MDXContext, {
      wrapper: DefaultWrapper,
      ...allComponents,
    });
    return <Slot />;
  },
);
