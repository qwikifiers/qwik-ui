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
} & PropsOf<'div'>;

export const ChecklistContextWrapper = component$<CheckListContextWrapperProps>(
  (props) => {
    useContextProvider(CheckListContext, []);
    return (
      <div role="group" aria-labelledby={props.ariaLabeledBy}>
        <Slot />
      </div>
    );
  },
);
