import { JSXChildren, JSXNode } from '@builder.io/qwik';

/**
 *
 * This function allows us to process the children of an inline component. We can look into the children and get the proper index, pass data, or make certain API decisions.
 *
 * See accordion-inline.tsx for a usage example.
 *
 * @param children
 *
 */
export function processChildren(children: JSXChildren) {
  const childrenToProcess = (
    Array.isArray(children) ? [...children] : children ? [children] : []
  ) as Array<JSXNode>;

  while (childrenToProcess.length) {
    const child = childrenToProcess.shift();

    if (!child) continue;

    if (Array.isArray(child)) {
      childrenToProcess.unshift(...child);
      continue;
    }

    const processor = componentRegistry.get(child.type);

    if (processor) {
      processor(child.props);
    } else {
      const anyChildren = Array.isArray(child.children)
        ? [...child.children]
        : [child.children];
      childrenToProcess.unshift(...(anyChildren as JSXNode[]));
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const componentRegistry = new Map<any, ComponentProcessor>();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function findComponent(component: any, processor: ComponentProcessor) {
  componentRegistry.set(component, processor);
}

type ComponentProcessor = (props: Record<string, unknown>) => void;
