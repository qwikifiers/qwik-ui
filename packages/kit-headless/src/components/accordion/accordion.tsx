import {
  $,
  component$,
  createContextId,
  HTMLAttributes,
  PropFunction,
  QRL,
  Signal,
  Slot,
  useVisibleTask$,
  useContext,
  useContextProvider,
  useSignal,
  useStore,
  useStylesScoped$,
} from '@builder.io/qwik';

export type AccordionProps = HTMLAttributes<HTMLElement>;

export const accordionContext =
  createContextId<AccordionContextService>('accordion');

interface AccordionContextService {
  items: HTMLElement[];
  setItemsBoxRef$: QRL<(ref: Signal<HTMLElement | undefined>) => void>;
}

interface AccordionItemProps {
  label: string;
  disabled?: boolean;
  class?: string;
  style?: string;
  onClick$?: PropFunction<() => void>;
}

export const Accordion = component$((props: AccordionProps) => {
  const items = useStore([]);
  const itemsBoxRef = useSignal<HTMLElement>();
  const setItemsBoxRef$ = $((ref: Signal<HTMLElement | undefined>) => {
    if (ref) {
      itemsBoxRef.value = ref.value;
    }
  });
  const contextService: AccordionContextService = {
    items,
    setItemsBoxRef$,
  };

  useContextProvider(accordionContext, contextService);

  useVisibleTask$(() => {
    contextService.setItemsBoxRef$(itemsBoxRef);
    const items = itemsBoxRef.value?.querySelectorAll<HTMLElement>('div.item');
    if (items?.length) {
      items.forEach((item) => contextService.items.push(item));
    }
  });

  return (
    <div {...props} ref={itemsBoxRef}>
      <Slot></Slot>
    </div>
  );
});

export const AccordionItem = component$((props: AccordionItemProps) => {
  useStylesScoped$(`
      div.item .content {
        display: none;
      }
      div.item[open] .content {
       display: block;
      }
    `);
  const contextService = useContext(accordionContext);
  return (
    <div class="item">
      <button
        onClick$={(e) => {
          const target = (e.target as HTMLElement).parentElement;
          contextService.items.forEach((i: HTMLElement) => {
            if (target === i) {
              return;
            }
            i.removeAttribute('open');
          });
          target?.toggleAttribute('open');
        }}
        style={props.style}
        class={props.class}
        disabled={props.disabled}
      >
        {props.label}
      </button>
      <div class="content">
        <Slot />
      </div>
    </div>
  );
});
