import {
  component$,
  $,
  useSignal,
  QwikIntrinsicElements,
} from '@builder.io/qwik';
import SelectContextId from './select-context-id';
import { useContext } from '@builder.io/qwik';
import { useOn } from '@builder.io/qwik';
import { useVisibleTask$ } from '@builder.io/qwik';

export const NativeSelect = component$(
  ({ ...props }: QwikIntrinsicElements['select']) => {
    const selectContext = useContext(SelectContextId);
    const ref = useSignal<HTMLElement>();

    useVisibleTask$(({ track }) => {
      const options = track(() => selectContext.options);

      options.length > 0 &&
        options.map((option) => {
          const optionElement = document.createElement('option');
          const optionValue = option.getAttribute('data-optionvalue');
          console.log(option);
          console.log(optionValue);
          optionElement.setAttribute('value', optionValue!);
          ref.value?.append(optionElement);
        });

      console.log('It should just run once.');
    });

    useOn(
      'change',
      $((e) => {
        const target = e.target as HTMLSelectElement;
        target.value = selectContext.selection.value!;
      })
    );

    return (
      <select ref={ref} required bind:value={selectContext.selection}>
        <option value="">test!</option>
      </select>
    );
  }
);
