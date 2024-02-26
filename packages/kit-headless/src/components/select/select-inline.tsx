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
  let valuePropIndex = 0;
  const isDisabledArr = [];
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
        if (child.props.children === props.value) {
          valuePropIndex = currentIndex;
        }
        isDisabledArr.push(child.props.disabled);
        currentIndex++;
      }
    }
  }

  if (isDisabledArr[valuePropIndex] === true) {
    valuePropIndex = isDisabledArr.findIndex((isDisabled) => isDisabled === false);
    if (valuePropIndex === -1) {
      throw new Error(
        `Qwik UI: it appears you've disabled every option in the select. Was that intentional?`,
      );
    }
  }

  return (
    <SelectImpl {...rest} valuePropIndex={valuePropIndex}>
      {props.children}
    </SelectImpl>
  );
};
