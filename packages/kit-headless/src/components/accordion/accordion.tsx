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
  useId,
} from '@builder.io/qwik';

export type AccordionProps = HTMLAttributes<HTMLElement>;

export const accordionContext =
  createContextId<AccordionContextService>('accordion');

interface AccordionContextService {
  items: HTMLElement[];
  setItemsBoxRef$: QRL<(ref: Signal<HTMLElement | undefined>) => void>;
}

export interface AccordionItemProps {
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
      div.item>button {
        border-bottom: 1px solid #e2e8f0;
        display: flex;
        flex-direction: items-start;
        align-items: center;
        padding-left: 8px;
      }
      div.item>button:hover {
        text-decoration: underline;
      }
      div.item[open]>button::after {
        rotate: 180deg;
        top: 30%;
        transition: 0.2s ease-in-out;
      }
      div.item[open] .content {
       display: block;
      }
    `);
  const contextService = useContext(accordionContext);
  const ref = useSignal<HTMLElement>();
  const id = useId();

  return (
    <div ref={ref} class="item">
      <button
        id={`${id}__trigger`}
        aria-controls={`${id}__body`}
        aria-expanded={!!ref.value?.getAttribute('open')}
        onClick$={(e) => {
          const target = ref.value;
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
      <div
        role="region"
        id={`${id}__body`}
        class="content"
        aria-labelledby={`${id}__trigger`}
        aria-hidden={!!ref.value?.getAttribute('open')}
      >
        <Slot />
      </div>
    </div>
  );
});
