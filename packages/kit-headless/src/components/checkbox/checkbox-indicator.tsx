import {
  component$,
  useContext,
  type PropsOf,
  Slot,
  useTask$,
  useStyles$,
} from '@builder.io/qwik';
import { CheckboxContext } from './checkbox-context';
import './checkbox.css';
import styles from './checkbox.css?inline';

export type CheckboxIndicatorProps = PropsOf<'div'>;

export const CheckboxIndicator = component$<CheckboxIndicatorProps>((props) => {
  useStyles$(styles);

  const checkSig = useContext(CheckboxContext);

  useTask$(({ track }) => {
    track(() => checkSig.value);
  });

  return (
    <div {...props} data-hidden={!checkSig.value} data-qds-indicator aria-hidden="true">
      <Slot />
    </div>
  );
});
