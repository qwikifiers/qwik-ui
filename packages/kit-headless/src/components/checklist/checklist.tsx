import { type JSXNode, Component, PropsOf } from '@builder.io/qwik';
import { CheckboxRoot, type MixedStateCheckboxProps } from '../checkbox/checkbox';
import { ChecklistContextWrapper, getTriBool } from './checklist-context-wrapper';

type CheckListProps = PropsOf<'ul'> & { ariaLabeledBy: string };
// type CheckBoxes=
/*
    This is an inline component. An example use case of an inline component to get the proper indexes with CSR. See issue #4757
    for more information.
*/
export const Checklist: Component<CheckListProps> = (props: CheckListProps) => {
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
      case CheckboxRoot: {
        const typedProps = child.props as MixedStateCheckboxProps;
        // FYI: Obj.assign mutates
        Object.assign(typedProps, { _useCheckListContext: true });

        checkArr.push(child);
        // TODO: fix this if hell by making fn
        if (!typedProps.checklist) {
          checklistChilds.push(child);

          if (typedProps.id != undefined) {
            idArr.push(typedProps.id as string);
          } else {
            idArr.push(false);
          }
          if (typedProps['bind:checked'] && typedProps['bind:checked'].value) {
            boolArr.push(typedProps['bind:checked'].value);
            hellSigs.push(typedProps['bind:checked']);
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
  if (checklistCheckbox.props['bind:checked']) {
    checklistChilds.forEach((checkbox) => {
      Object.assign(checkbox.props, { _overWriteCheckbox: true });
    });
  }

  return (
    <>
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
// TODO: deprecate ariaLabelledBy
