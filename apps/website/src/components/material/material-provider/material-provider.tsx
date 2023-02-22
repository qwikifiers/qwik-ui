import { component$, Slot, useStyles$ } from '@builder.io/qwik';
import material from '../styles/materialize.scss?inline';
import materialIcons from '../styles/material-icons.css?inline';

export const MaterialProvider = component$(() => {
  useStyles$(material);
  useStyles$(materialIcons);
  return <Slot />;
});
