import { component$ } from '@builder.io/qwik';
import { Toast } from '@qwik-ui/theme-daisy';

export default component$(() => {
  return (
    <>
      <h2>This is the documentation for the Toast</h2>
      <h1>toast with alert inside</h1>
      <Toast label="New Message" alert="success" />
      <h1>toast with top & start attributes</h1>
      <Toast label="Errored" top start alert="error" />
      <h1>toast with top & center attributes</h1>
      <Toast label="Information" top center alert="info" />
      <h1>toast with top & end attributes</h1>
      <Toast
        label="You should probably think twice about it"
        top
        end
        alert="warning"
      />
      <h1>toast with middle & start attributes</h1>
      <Toast label="New Message" start middle />
    </>
  );
});
