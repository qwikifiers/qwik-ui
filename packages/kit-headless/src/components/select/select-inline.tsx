import { type JSXNode, type FunctionComponent } from '@builder.io/qwik';
import { SelectImpl, type SelectProps } from './select';
import { SelectListbox } from './select-listbox';
import { SelectOption } from './select-option';

export type Opt = {
  isDisabled: boolean;
  value: string;
};

/*
    This is an inline component. We create an inline component to get the proper indexes with CSR. See issue #4757 
    for more information.
*/
export const Select: FunctionComponent<SelectProps> = (props) => {
  const { children: myChildren, ...rest } = props;
  let valuePropIndex = null;
  const childrenToProcess = (
    Array.isArray(myChildren) ? [...myChildren] : [myChildren]
  ) as Array<JSXNode>;

  let currentIndex = 0;
  const opts: Opt[] = [];

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
        const isString = typeof child.props.children === 'string';
        if (!isString) {
          throw new Error(
            `Qwik UI: Select option value passed was not a string. It was an ${typeof child
              .props.children}.`,
          );
        }
        child.props.index = currentIndex;
        const opt: Opt = {
          isDisabled: child.props.disabled === true,
          value: child.props.children as string,
        };

        opts.push(opt);

        if (child.props.children === props.value) {
          valuePropIndex = currentIndex;
        }

        currentIndex++;
      }
    }
  }
  const isDisabledArr = opts.map((opt) => opt.isDisabled);

  if (valuePropIndex !== null && isDisabledArr[valuePropIndex] === true) {
    valuePropIndex = isDisabledArr.findIndex((isDisabled) => isDisabled === false);
    if (valuePropIndex === -1) {
      throw new Error(
        `Qwik UI: it appears you've disabled every option in the select. Was that intentional? 🤨`,
      );
    }
  }

  // const isMatch = opts[valuePropIndex].value === props.value;

  // if (!isMatch && props.value) {
  //   const obj = opts[valuePropIndex];
  //   obj.value = '';
  //   opts[valuePropIndex] = obj;
  // }
  return (
    <SelectImpl {...rest} _valuePropIndex={valuePropIndex} _options={opts}>
      {props.children}
    </SelectImpl>
  );
};
