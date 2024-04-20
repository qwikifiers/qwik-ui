import { Component, type JSXNode } from '@builder.io/qwik';
import { ComboboxImpl, type ComboboxRootProps } from './combobox-impl';
import { ComboboxOption } from './combobox-option';

export type Opt = {
  isDisabled: boolean;
  value: string;
  displayValue?: string;
  index: number;
};

/*
    This is an inline component. An example use case of an inline component to get the proper indexes with CSR. See issue #4757 
    for more information.
*/
export const ComboboxRoot: Component<ComboboxRootProps> = (props: ComboboxRootProps) => {
  const { children: myChildren, ...rest } = props;
  const opts: Opt[] = [];
  let currentIndex = 0;
  let valuePropIndex = null;

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
      case ComboboxOption: {
        const isString = typeof child.props.children === 'string';
        if (!isString) {
          throw new Error(
            `Qwik UI: Select option value passed was not a string. It was a ${typeof child
              .props.children}.`,
          );
        }

        child.props._index = currentIndex;
        const isDisabled = child.props.disabled === true;
        // distinct value, or the display value is the same as the value
        const value = (
          child.props.value ? child.props.value : child.props.children
        ) as string;

        const opt: Opt = {
          isDisabled,
          value,
          displayValue: child.props.children as string,
          index: currentIndex,
        };

        opts.push(opt);

        // if the current option value is equal to the initial value
        if (value === props.value) {
          valuePropIndex = currentIndex;
        }

        currentIndex++;
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
      console.error(
        `Qwik UI: the provided option value "${props.value}" does not match any of the option values in the Combobox.`,
      );
    }
  }

  return (
    <ComboboxImpl {...rest} _valuePropIndex={valuePropIndex} _options={opts}>
      {props.children}
    </ComboboxImpl>
  );
};
