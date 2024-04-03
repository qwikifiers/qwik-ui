import { type JSXNode, Component, PropsOf, Signal } from '@builder.io/qwik';
import { MyCheckbox } from './checkbox';
import { ChecklistContextWrapper, getTriBool } from './checklist-context-wrapper';

type CheckListProps = PropsOf<'ul'> & { ariaLabeledBy: string };
// type CheckBoxes=
/*
    This is an inline component. An example use case of an inline component to get the proper indexes with CSR. See issue #4757
    for more information.
*/
export const CheckList: Component<CheckListProps> = (props: CheckListProps) => {
  const checkArr: JSXNode[] = [];
  const hellSigs = [];
  let checklistCheckbox = undefined;
  const boolArr: boolean[] = [];
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
        // the next line is not very clear, but you can think of it as arr.push() for objs (mutates)
        Object.assign(child.props, { _useCheckListContext: true });
        checkArr.push(child);
        console.log(child.props.checkBoxSig);
        // TODO: fix this if hell by making fn
        if (!child.props.checkList) {
          if (child.props.checkBoxSig && child.props.checkBoxSig.untrackedValue) {
            boolArr.push(child.props.checkBoxSig.untrackedValue);
            hellSigs.push(child.checkBoxSig);
          } else {
            boolArr.push(false);
          }
        } else {
          checklistCheckbox = child;
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
  console.log(checklistCheckbox);
  if (checklistCheckbox === undefined) {
    throw Error(
      "QWIKUI: checklist doesn't have a checkbox. Did you give the atribute to *checklist* to any of the checkboxes inside the checklist?",
    );
  }
  if (checklistCheckbox.props.checkBoxSig) {
    console.log(hellSigs);
    // TODO: add code for controlled stuff
    // for (let index = 0; index < hellSigs.length; index++) {
    //   const element = array[index];
    //
    // }
  }
  return (
    <>
      {checkArr.length}
      <ChecklistContextWrapper
        ariaLabeledBy={props.ariaLabeledBy}
        arrSize={boolArr.length}
        initialTriBool={getTriBool(boolArr)}
      >
        <ul class={props.class}>
          {checkArr.map((checkbox) => (
            <li>{checkbox}</li>
          ))}
        </ul>
      </ChecklistContextWrapper>
    </>
  );
};
