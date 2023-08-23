import { component$, useSignal } from '@builder.io/qwik';

export default component$(() => {
  const tabs = ['Tab 1', 'Tab 2', 'Tab 3'];
  const activeTab = useSignal(0);
  return (
    <>
      <h2></h2>
    </>
  );
});
