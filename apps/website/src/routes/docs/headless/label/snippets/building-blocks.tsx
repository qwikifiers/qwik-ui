import { component$ } from '@qwik.dev/core';
import { Label } from '@qwik-ui/headless';

export default component$(() => {
  return (
    <div>
      <Label for="firstName">First name</Label>
      <input type="text" id="firstName" placeholder="John Doe" />
    </div>
  );
});
