import { $, PropsOf, component$, useSignal } from '@builder.io/qwik';
import SelectContextId from './select-context-id';
import { useContext } from '@builder.io/qwik';
import { useOn } from '@builder.io/qwik';
import { useVisibleTask$ } from '@builder.io/qwik';

export const NativeSelect = component$(({ ...props }: PropsOf<'select'>) => {
  const selectContext = useContext(SelectContextId);
  const ref = useSignal<HTMLElement>();

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(function populateNativeSelect({ track }) {
    const options = track(() => selectContext.optionsStore);

    options.length > 0 &&
      options.map((option) => {
        const optionElement = document.createElement('option');
        const optionValue = option.dataset.optionValue;
        optionElement.setAttribute('value', optionValue!);
        ref.value?.append(optionElement);
      });
  });

  useOn(
    'change',
    $((e) => {
      const target = e.target as HTMLSelectElement;
      target.value = selectContext.selectedOptionSig.value!;
    }),
  );

  return (
    <select
      ref={ref}
      required
      aria-hidden
      tabIndex={-1}
      bind:value={selectContext.selectedOptionSig}
      {...props}
    >
      <option value="" />
    </select>
  );
});
