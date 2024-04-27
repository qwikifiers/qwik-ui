import { type JSXNode, Component } from '@builder.io/qwik';
import { SelectImpl, type SelectProps } from './select';
import { SelectItem } from './select-item';
import { SelectLabel } from './select-label';
import { SelectItemLabel } from './select-item-label';

export type Opt = {
  value: string;
  displayValue?: string;
  index: number;
  isDisabled: boolean;
};

/*
    This is an inline component. An example use case of an inline component to get the proper indexes with CSR. See issue #4757 
    for more information.
*/
export const SelectRoot: Component<SelectProps> = (props: SelectProps) => {
  const { children: myChildren, ...rest } = props;
  const opts: Opt[] = [];
  let currOptIndex = 0;
  let givenOptValue = null;

  // used for finding the initial value's index
  let valuePropIndex = null;

  let isLabelNeeded = false;
  let isOptDisabled = false;

  const childrenToProcess = (
    Array.isArray(myChildren) ? [...myChildren] : [myChildren]
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
      case SelectLabel: {
        isLabelNeeded = true;
        break;
      }

      case SelectItem: {
        // get the index of the current option
        child.props._index = currOptIndex;
        currOptIndex++;

        isOptDisabled = child.props.disabled === true;

        if (child.props.value) {
          givenOptValue = child.props.value;
        }

        // the default case isn't handled here, so we need to process the children to get to the label component
        if (child.props.children) {
          const childChildren = Array.isArray(child.props.children)
            ? [...child.props.children]
            : [child.props.children];
          childrenToProcess.unshift(...childChildren);
        }

        break;
      }

      case SelectItemLabel: {
        // distinct value, or the display value is the same as the value
        const value = (
          givenOptValue !== null ? givenOptValue : child.props.children
        ) as string;

        const opt: Opt = {
          value,
          displayValue: child.props.children as string,
          index: currOptIndex,
          isDisabled: isOptDisabled,
        };

        opts.push(opt);

        if (props.value && props.multiple) {
          throw new Error(
            `Qwik UI: When in multiple selection mode, the value prop is disabled. Use the bind:value prop's initial signal value instead.`,
          );
        }

        // if the current option value is equal to the initial value
        if (value === props.value) {
          // minus one because it is incremented already in SelectOption
          valuePropIndex = currOptIndex - 1;
        }

        const isString = typeof child.props.children === 'string';

        if (!isString) {
          throw new Error(
            `Qwik UI: select item label passed was not a string. It was a ${typeof child
              .props.children}.`,
          );
        }

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

  // console warning if a consumer's passed in value does not match an option
  if (props.value) {
    const valueMatch = opts.some((opt) => opt.value === props.value);

    if (!valueMatch) {
      throw new Error(
        `Qwik UI: the provided option value "${props.value}" does not match any of the option values in the Select.`,
      );
    }
  }

  return (
    <SelectImpl
      {...rest}
      _label={isLabelNeeded}
      _valuePropIndex={valuePropIndex}
      _options={opts}
    >
      {props.children}
    </SelectImpl>
  );
};
