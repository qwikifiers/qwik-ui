import { component$, PropsOf, useSignal } from '@builder.io/qwik';
import { findComponent, processChildren } from '@qwik-ui/utils';

export default component$(() => {
  const isRenderedSig = useSignal(false);

  return (
    <div>
      <button onClick$={() => (isRenderedSig.value = true)}>render on the client</button>
      {isRenderedSig.value && (
        <ExampleRoot>
          <Item />
          <Item />
          <Item />
          <Item />
        </ExampleRoot>
      )}
    </div>
  );
});

const ExampleRoot = ({ children }: PropsOf<'div'>) => {
  let currItemIndex = 0;

  findComponent(Item, (itemProps) => {
    itemProps._index = currItemIndex;
    currItemIndex++;
  });

  processChildren(children);

  return <div>{children}</div>;
};

const Item = component$(({ _index }: { _index?: number }) => {
  if (_index === undefined) {
    throw new Error('Qwik UI: Example inline component cannot find its proper index.');
  }

  return <div>Item {_index + 1}</div>;
});
