import {
  component$,
  Slot,
  useStyles$,
} from '@builder.io/qwik';

import styles from './materialize.scss?inline';

export const MaterialTheme = component$(() => {
  useStyles$(styles);
  return <Slot />;
});
