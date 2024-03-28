import { type JSXNode, Component, PropsOf } from '@builder.io/qwik';
import { CheckboxProps, MyCheckbox } from './checkbox';

type CheckListProps = PropsOf<'ul'> & { ariaLabeledBy: string };
// type CheckBoxes=
/*
    This is an inline component. An example use case of an inline component to get the proper indexes with CSR. See issue #4757
    for more information.
*/
export const CheckList: Component<CheckListProps> = (props: CheckListProps) => {
  const checkArr: JSXNode[] = [];
  const { children: myChildren, ...rest } = props;

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
      case MyCheckbox: {
        checkArr.push(child);
        break;
      }

      default: {
        console.log('oh now');
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

  return (
    <>
      {checkArr.length}
      <div role="group" aria-labelledby={props.ariaLabeledBy}>
        <ul class={props.class}>
          {checkArr.map((checkbox) => (
            <li>{checkbox}</li>
          ))}
        </ul>
      </div>
    </>
  );
};
