import { type JSXNode, Component, PropsOf } from '@builder.io/qwik';
import { MyCheckbox, TriStateCheckboxProps } from './checkbox';
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
  const idArr: Array<false | string> = [];
  const checklistChilds: JSXNode[] = [];
  const { children: myChildren } = props;

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
        const typedProps = child.props as TriStateCheckboxProps;
        // FYI: Obj.assign mutates
        Object.assign(typedProps, { _useCheckListContext: true });
        checkArr.push(child);
        // TODO: fix this if hell by making fn
        if (!typedProps.checkList) {
          checklistChilds.push(child);
          console.log('fav id: ', typedProps.id);
          if (typedProps.id != undefined) {
            console.log('fav id: ', typedProps.id);
            idArr.push(typedProps.id as string);
          } else {
            idArr.push(false);
          }
          if (typedProps.checkBoxSig && typedProps.checkBoxSig.value) {
            console.log('current value here magial ', typedProps.checkBoxSig.value);
            boolArr.push(typedProps.checkBoxSig.value);
            hellSigs.push(typedProps.checkBoxSig);
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
  if (checklistCheckbox === undefined) {
    throw Error(
      "QWIKUI: checklist doesn't have a checkbox. Did you give the atribute to *checklist* to any of the checkboxes inside the checklist?",
    );
  }
  if (checklistCheckbox.props.checkBoxSig) {
    checklistChilds.forEach((checkbox) => {
      Object.assign(checkbox.props, { _overWriteCheckbox: true });
    });
    // TODO: add code for controlled stuff
    // for (let index = 0; index < hellSigs.length; index++) {
    //   const element = array[index];
    //
    // }
  }
  console.log('fav idArr: ', idArr);

  return (
    <>
      {checkArr.length}
      <ChecklistContextWrapper
        ariaLabeledBy={props.ariaLabeledBy}
        arrSize={boolArr.length}
        initialTriBool={getTriBool(boolArr)}
        idArr={idArr}
      >
        <ul class={props.class}>
          {checkArr.map((checkbox, i) => (
            <li key={i}>{checkbox}</li>
          ))}
        </ul>
      </ChecklistContextWrapper>
    </>
  );
};
