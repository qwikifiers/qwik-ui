import {
  type JSXNode,
  type JSXChildren,
  type PropsOf,
  component$,
  useSignal,
  Slot,
  useContextProvider,
  $,
} from '@builder.io/qwik';
import { findComponent, processChildren } from '../../utils/inline-component';
import { ChecklistContext, type ChecklistState } from './checklist-context';
import { ChecklistItem } from './checklist-item';

export const ChecklistRoot =
  //removing component to make inline causes Internal Server
  (props: { initialStates: boolean[]; children: JSXChildren | JSXNode }) => {
    const children = props.children;
    let currItemIndex = 0;
    const itemsMap = new Map();

    findComponent(ChecklistItem, (itemProps) => {
      itemProps._index = currItemIndex;
      itemsMap.set(currItemIndex, itemProps.disabled);
      currItemIndex++;
    });

    processChildren(props.children);

    return (
      <ul>
        <ChecklistBase initialStates={props.initialStates}>{children}</ChecklistBase>
      </ul>
    );
  };

type ChecklistRootProps = PropsOf<'div'> & {
  initialStates: boolean[];
};

export const ChecklistBase = component$(
  ({ initialStates, ...props }: ChecklistRootProps) => {
    const items = useSignal<boolean[]>(initialStates ?? []);
    const allSelected = useSignal<boolean>(false);
    const toggleAllSelected = $(() => {
      allSelected.value = !allSelected.value;
    });
    const indeterminate = useSignal(false);

    const context: ChecklistState = {
      items,
      allSelected,
      toggleAllSelected,
      indeterminate,
      initialStates,
    };

    useContextProvider(ChecklistContext, context);
    return (
      <div {...props}>
        <Slot />
      </div>
    );
  },
);
