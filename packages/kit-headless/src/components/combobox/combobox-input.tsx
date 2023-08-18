import {
  component$,
  useContext,
  type QwikIntrinsicElements,
  useSignal,
  useTask$,
  $,
  useOnWindow,
  useVisibleTask$
} from '@builder.io/qwik';
import ComboboxContextId, { ComboboxControlContextId } from './combobox-context-id';
import { isBrowser } from '@builder.io/qwik/build';

export type ComboboxInputProps = QwikIntrinsicElements['input'];

// Add required context here
export const ComboboxInput = component$((props: ComboboxInputProps) => {
  const context = useContext(ComboboxContextId);
  const controlContext = useContext(ComboboxControlContextId);
  const inputRef = useSignal<HTMLButtonElement>();
  controlContext.inputRef = inputRef;

  // useTask$(({ track }) => {
  //   track(() => context.isInputFocusedSig.value);

  //   if (context.isInputFocusedSig.value) {
  //     inputRef.value?.focus();
  //   }
  // });

  // useOnWindow('click', closeListbox$);

  return (
    <input
      ref={inputRef}
      type="text"
      onInput$={() => (context.isListboxOpenSig.value = true)}
      onKeyDown$={(e) => {
        if (e.key === 'ArrowDown') {
          context.isListboxOpenSig.value = true;
        }
      }}
      {...props}
    />
  );
});

// export default component$(() => {
//   const inputRef = useSignal<HTMLInputElement>();
//   const ctrlRef = useSignal<HTMLDivElement>();
//   const divRef = useSignal<HTMLDivElement>();

//   useVisibleTask$(({ cleanup }) => {
//     if (divRef.value) {
//       const handleMousedown = (e: MouseEvent): void => {
//         if (e.target === ctrlRef.value) {
//           e.preventDefault();
//         }
//         inputRef.value!.focus();
//         console.log(e.target, e.currentTarget);
//       };

//       divRef.value.addEventListener('mousedown', handleMousedown);

//       cleanup(() => {
//         divRef.value!.removeEventListener('mousedown', handleMousedown);
//       });
//     }
//   });

//   return (
//     <div>
//       <div ref={divRef} class="flex gap-2">
//         <input ref={inputRef} class="border" type="text" />
//         <div ref={ctrlRef}>ctrl</div>
//       </div>
//     </div>
//   );
// });
