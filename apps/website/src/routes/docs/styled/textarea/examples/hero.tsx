import { component$ } from '@builder.io/qwik';
import { Textarea } from '~/components/ui';

export default component$(() => {
  return <Textarea placeholder="Type your message here." />;
});
