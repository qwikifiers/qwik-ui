import { type JSXNode, type FunctionComponent } from '@builder.io/qwik';
import { SelectImpl, type SelectProps } from './select';
import { SelectListbox } from './select-listbox';
import { SelectOption } from './select-option';

/*
    This is an inline component. We create an inline component to get the proper indexes with CSR. See issue #4757 
    for more information.
*/
export const Select: FunctionComponent<SelectProps> = (props) => {
  const { children: myChildren, ...rest } = props;

  const childrenToProcess = (
    Array.isArray(myChildren) ? [...myChildren] : [myChildren]
  ) as Array<JSXNode>;

  let currentIndex = 0;

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
      //   case SelectPopover: {
      //     const popoverChildren = Array.isArray(child.props.children)
      //       ? [...child.props.children]
      //       : [child.props.children];
      //     childrenToProcess.unshift(...popoverChildren);
      //     break;
      //   }
      case SelectListbox: {
        const listboxChildren = Array.isArray(child.props.children)
          ? [...child.props.children]
          : [child.props.children];
        childrenToProcess.unshift(...listboxChildren);
        break;
      }
      case SelectOption: {
        child.props.index = currentIndex;
        currentIndex++;
      }
    }
  }
  return <SelectImpl {...rest}>{props.children}</SelectImpl>;
};
