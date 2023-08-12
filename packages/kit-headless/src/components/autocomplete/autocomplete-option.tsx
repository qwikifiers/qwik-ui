import {
  Slot,
  useSignal,
  useContext,
  component$,
  $,
  type QwikIntrinsicElements,
  type QwikKeyboardEvent,
  useTask$,
  useVisibleTask$,
  useId
} from '@builder.io/qwik';
import AutocompleteContextId from './autocomplete-context-id';

export type OptionProps = {
  // optionValue: Record<string, any> | string;
  optionValue: string;
  disabled?: boolean;
} & QwikIntrinsicElements['li'];

export const AutocompleteOption = component$((props: OptionProps) => {
  const ref = useSignal<HTMLElement>();
  const contextService = useContext(AutocompleteContextId);
  const specialId = useId();
  useTask$(() => {
    if (typeof window !== 'undefined') {
      return;
    }

    console.log(props.optionValue, specialId);
    contextService.dataHolder.value = [
      ...contextService.dataHolder.value,
      { value: props.optionValue, id: specialId, ref }
    ];
  });

  useVisibleTask$(
    ({ cleanup }) => {
      cleanup(() => {
        //Runs first before possibly early return because we're registering cleanup
        //no matter what, even if the component started on the server.
        //This is because if we run this cleanup on the server, it'll cleanup while still on the server.
        contextService.dataHolder.value = contextService.dataHolder.value.filter(
          (item) => item.id !== specialId
        );
      });

      console.log(props.optionValue, specialId);
      const wasRenderedOnServer = contextService.dataHolder.value.find(
        (item) => item.id === specialId
      );
      if (wasRenderedOnServer) {
        return;
      }
      contextService.dataHolder.value = [
        ...contextService.dataHolder.value,
        { value: props.optionValue, id: specialId, ref }
      ];
    },
    { strategy: 'document-idle' }
  );

  // push optionValue instead of ref to store
  contextService.optionsStore = [...contextService.optionsStore, ref];

  return (
    <li
      ref={ref}
      data-test={specialId}
      role="option"
      tabIndex={props.disabled ? -1 : 0}
      aria-disabled={props.disabled}
      onClick$={[
        $(() => {
          let index;
          const item = contextService.dataHolder.value.find((item, i) => {
            if (item.id === specialId) {
              index = i;
              return true;
            } else {
              return false;
            }
          });
          console.log(item, index);

          console.log('found index', index);
          if (!props.disabled) {
            contextService.inputValueSig.value = props.optionValue;
            contextService.isTriggerExpandedSig.value = false;
          }
        }),
        props.onClick$
      ]}
      onKeyDown$={[
        $((e: QwikKeyboardEvent) => {
          if ((e.key === 'Enter' || e.key === ' ') && !props.disabled) {
            contextService.inputValueSig.value = props.optionValue;
            contextService.isTriggerExpandedSig.value = false;
            contextService.focusInput$(contextService.inputId);
          }
        }),
        props.onKeyDown$
      ]}
      {...props}
    >
      <Slot />
    </li>
  );
});
