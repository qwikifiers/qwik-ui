import {
  PropsOf,
  Signal,
  Slot,
  component$,
  sync$,
  useContextProvider,
  $,
  useSignal,
} from '@builder.io/qwik';
import { CheckListContext, CheckboxContext } from './context-id';

export type CheckListContextWrapperProps = {
  ariaLabeledBy: string;
  arrSize: number;
} & PropsOf<'div'>;

export const ChecklistContextWrapper = component$<CheckListContextWrapperProps>(
  (props) => {
    const helpme = useSignal([]);
    useContextProvider(CheckListContext, helpme);
    return (
      <div role="group" aria-labelledby={props.ariaLabeledBy}>
        <Slot />
      </div>
    );
  },
);
