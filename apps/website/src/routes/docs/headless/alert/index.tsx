import { component$ } from '@builder.io/qwik';
import { Alert as HeadlessAlert } from '@qwik-ui/primitives';

export default component$(() => {
  return (
    <div class="container">
      <h2>This is the documentation for the Alert</h2>

      <br />
      <HeadlessAlert>This is an error alert.</HeadlessAlert>
      <br />
      <HeadlessAlert>This is an warning alert.</HeadlessAlert>
      <br />
      <HeadlessAlert>This is an info alert.</HeadlessAlert>
      <br />
      <HeadlessAlert>This is an success alert.</HeadlessAlert>
    </div>
  );
});
