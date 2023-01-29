import { component$, Slot, useStyles$ } from '@builder.io/qwik';
import material from '../styles/materialize.scss?inline';

export const MaterialProvider = component$(() => {
  useStyles$(material);
  return <Slot />;
});
