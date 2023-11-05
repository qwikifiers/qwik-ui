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
  [tag: string]: Component<any>;
}

/**
 * Get current components from the MDX Context.
 */
export function useMDXComponents() {
  return useContext(MDXContext, emptyObject);
}

export const emptyObject = {};

export const DefaultWrapper = component$(() => {
  return <Slot />;
});

/**
 * Provider for MDX context
 */
export const MDXProvider = component$(
  (props: { components: Components; disableParentContext?: boolean }) => {
    let allComponents = useMDXComponents();
    if (props.disableParentContext) {
      allComponents = props.components;
    } else {
      allComponents = { ...allComponents, ...props.components };
    }
    useContextProvider(MDXContext, {
      wrapper: DefaultWrapper,
      ...allComponents,
    });
    return <Slot />;
  },
);
