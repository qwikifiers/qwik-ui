import { component$ } from '@builder.io/qwik';
import { Toast } from '@qwik-ui/tailwind';
import ToastContainer from './ToastContainer';

export default component$(() => {
  return (
    <>
      <h2>This is the documentation for the Toast</h2>
      <h1>Toast with alert of success inside</h1>
      <ToastContainer>
        <Toast label="New Message" bottom end variant="success" />
      </ToastContainer>
      <h1>Error toast with top & start attributes</h1>
      <ToastContainer>
        <Toast label="Errored" top start variant="error" />
      </ToastContainer>
      <h1>Info toast with top & end attributes</h1>
      <ToastContainer>
        <Toast label="Information" top center />
      </ToastContainer>
      <h1>Warning toast with middle & start attributes</h1>
      <ToastContainer>
        <Toast
          label="You should probably think twice about it"
          top
          end
          variant="warning"
        />
      </ToastContainer>
      <h1>Toast with top & center attributes</h1>
      <ToastContainer>
        <Toast label="New Message" start middle />
      </ToastContainer>
    </>
  );
});
