import { component$, PropsOf, Slot } from '@builder.io/qwik';

export const Grid = component$<PropsOf<'table'>>((props) => {
  return (
    <table
      tabIndex={-1}
      role="grid"
      aria-labelledby={props['aria-labelledby']}
      {...props}
    >
      <Slot />
    </table>
  );
});

export const GridHead = component$<PropsOf<'thead'>>((props) => {
  return (
    <thead {...props}>
      <Slot />
    </thead>
  );
});

export const GridBody = component$<PropsOf<'tbody'>>((props) => {
  return (
    <tbody {...props}>
      <Slot />
    </tbody>
  );
});

export const Row = component$<PropsOf<'tr'>>((props) => {
  return (
    <tr {...props}>
      <Slot />
    </tr>
  );
});

export const Cell = component$<PropsOf<'td'>>((props) => {
  return (
    <td {...props}>
      <Slot />
    </td>
  );
});
