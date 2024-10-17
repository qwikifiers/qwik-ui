import {
  PropsOf,
  QRL,
  Signal,
  Slot,
  component$,
  useComputed$,
  useContextProvider,
  useSignal,
  useTask$,
} from '@builder.io/qwik';
import { accordionContextId } from './accordion-context';

export type PublicAccordionRootProps = PropsOf<'div'> & {
  /** If true, multiple items can be open at the same time. */
  multiple?: boolean;

  /**
   * @deprecated Use the multiple prop instead.
   */
  behavior?: 'single' | 'multi';

  /** The reactive value controlling which item is open. */
  'bind:value'?: Signal<string | null>;

  /** The initial value of the currently open item. */
  value?: string;

  /** The initial index of the currently open item. */
  initialIndex?: number;

  /** A QRL that is called when the selected item changes. */
  onChange$?: QRL<(value: string) => void>;

  /** A map of the item indexes and their disabled state. */
  itemsMap?: Map<number, boolean>;

  /** If true, the accordion is disabled. */
  disabled?: boolean;

  /** If true, the accordion is collapsible. */
  collapsible?: boolean;

  /** If true, the accordion is animated. */
  animated?: boolean;
};

export const HAccordionRootImpl = component$((props: PublicAccordionRootProps) => {
  const {
    multiple,
    'bind:value': givenValueSig,
    initialIndex,
    onChange$,
    disabled,
    collapsible = true,
    animated,
    itemsMap,
    ...rest
  } = props;

  itemsMap;

  const selectedIndexSig = useSignal<number>(initialIndex ?? -1);
  const triggerRefsArray = useSignal<Array<Signal>>([]);
  const isAnimatedSig = useSignal<boolean>(animated === true);
  const isMultipleSig = useSignal<boolean>(multiple || props.behavior === 'multi');

  const itemsMapSig = useComputed$(() => {
    return props.itemsMap!;
  });

  const context = {
    selectedIndexSig,
    givenValueSig,
    isMultipleSig,
    initialIndex,
    onChange$,
    itemsMapSig,
    triggerRefsArray,
    disabled,
    collapsible,
    isAnimatedSig,
  };

  useTask$(({ track }) => {
    context.disabled = track(() => disabled);
  });

  useContextProvider(accordionContextId, context);

  return (
    <div {...rest} data-accordion>
      <Slot />
    </div>
  );
});
