import { component$, useContext, type QwikIntrinsicElements } from '@builder.io/qwik';
import ComboboxContextId, { ComboboxControlContextId } from './combobox-context-id';

export type ComboboxInputProps = QwikIntrinsicElements['input'];

// Add required context here
export const ComboboxInput = component$((props: ComboboxInputProps) => {
  const context = useContext(ComboboxContextId);
  const controlContext = useContext(ComboboxControlContextId);

  return (
    <input
      ref={controlContext.inputRef}
      type="text"
      onInput$={() => (context.isListboxOpenSig.value = true)}
      onKeyDown$={(e) => {
        if (e.key === 'ArrowDown') {
          context.isListboxOpenSig.value = true;
        }
      }}
      onBlur$={() => (context.isListboxOpenSig.value = false)}
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
