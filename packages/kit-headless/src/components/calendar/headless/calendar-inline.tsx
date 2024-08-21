import { Component, JSXNode } from '@builder.io/qwik';
import { RootImpl, RootProps } from './calendar-root';
import { Grid } from './calendar-grid';
import { HeaderTitle } from './calendar-header';

export const RootInline: Component<RootProps> = (props) => {
  const { children: calendarChildren, ...rest } = props;

  // helpers
  let headerId = 'qwik-ui-calendar';

  // gid items to modify
  const GridItem = Grid;
  const HeaderItem = HeaderTitle;

  const childrenToProcess = (
    Array.isArray(calendarChildren) ? [...calendarChildren] : [calendarChildren]
  ) as Array<JSXNode>;

  while (childrenToProcess.length) {
    const child = childrenToProcess.shift();

    if (!child) {
      continue;
    }

    if (Array.isArray(child)) {
      childrenToProcess.unshift(...child);
      continue;
    }

    switch (child.type) {
      case HeaderItem: {
        headerId = (child.props.id as string | undefined) ?? headerId;
        break;
      }
      case GridItem: {
        child.props['aria-labelledby'] = headerId;
        break;
      }

      default: {
        if (child) {
          const anyChildren = Array.isArray(child.children)
            ? [...child.children]
            : [child.children];
          childrenToProcess.unshift(...(anyChildren as JSXNode[]));
        }
        break;
      }
    }
  }

  return <RootImpl {...rest}>{props.children}</RootImpl>;
};
