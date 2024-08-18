import { component$, Signal, useSignal, useTask$ } from '@builder.io/qwik';

export default component$(() => {
  const isItemsRenderedSig = useSignal(false);
  const countSig = useSignal(0);

  return (
    <div>
      <button onClick$={() => (isItemsRenderedSig.value = true)}>
        render on the client
      </button>
      {isItemsRenderedSig.value && (
        <>
          <Item countSig={countSig} />
          <Item countSig={countSig} />
          <Item countSig={countSig} />
          <Item countSig={countSig} />
        </>
      )}
    </div>
  );
});

const Item = component$(({ countSig }: { countSig: Signal<number> }) => {
  const itemNum = useSignal(0);

  useTask$(() => {
    itemNum.value = ++countSig.value;
  });

  return <div>Item {itemNum.value}</div>;
});
