import { component$, useSignal, useTask$ } from '@builder.io/qwik';

export default component$(() => {
  const isItemsRenderedSig = useSignal(false);

  return (
    <button onClick$={() => (isItemsRenderedSig.value = !isItemsRenderedSig.value)}>
      Render on the client:
      {isItemsRenderedSig.value && (
        <>
          <Item />
          <Item />
          <Item />
          <Item />
        </>
      )}
    </button>
  );
});

const Item = component$(() => {
  const itemNum = useSignal(0);

  useTask$(() => {
    itemNum.value++;
  });

  return <div>{itemNum.value}</div>;
});
