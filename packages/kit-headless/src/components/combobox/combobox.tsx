import {
  type FunctionComponent,
  JSXNode,
  QwikIntrinsicElements,
  component$,
  Slot,
  useContextProvider,
  useSignal,
  Signal
} from '@builder.io/qwik';

import { ComboboxListbox } from './combobox-listbox';
import { ComboboxOption } from './combobox-option';

export type ComboboxImplProps = {
  defaultValue?: string;
  placeholder?: string;
  'bind:isListboxOpenSig'?: Signal<boolean | undefined>;
  'bind:isInputFocusedSig'?: Signal<boolean | undefined>;
  'bind:isTriggerFocusedSig'?: Signal<boolean | undefined>;
} & QwikIntrinsicElements['div'];

export type OptionInfo = {
  optionId: string;
  index: number;
};

export const Combobox: FunctionComponent<ComboboxImplProps> = (props) => {
  const { children: myChildren, ...rest } = props;

  const childrenToProcess = (
    Array.isArray(myChildren) ? [...myChildren] : [myChildren]
  ) as Array<JSXNode>;

  // const optionsMetaData: OptionInfo[] = [];

  let currentIndex = 0;

  while (childrenToProcess.length) {
    const child = childrenToProcess.shift();

    if (!child) {
      continue;
    }

    if (Array.isArray(child)) {
      childrenToProcess.unshift(...child);
      continue;
    }

    switch (child.type) {
      case ComboboxListbox: {
        const grandChildren = Array.isArray(child.props.children)
          ? [...child.props.children]
          : [child.props.children];
        childrenToProcess.unshift(...grandChildren);
        break;
      }
      case ComboboxOption: {
        child.props._index = currentIndex;
        currentIndex++;
      }
    }
  }
  return <ComboboxImpl {...rest}>{props.children}</ComboboxImpl>;
};

import ComboboxContextId from './combobox-context-id';
import { ComboboxContext } from './combobox-context.type';

export const ComboboxImpl = component$((props: ComboboxImplProps) => {
  const {
    'bind:isListboxOpenSig': givenListboxOpenSig,
    'bind:isInputFocusedSig': givenInputFocusedSig,
    'bind:isTriggerFocusedSig': givenTriggerFocusedSig,
    ...rest
  } = props;
  const listboxRef = useSignal<HTMLUListElement>();

  const selectedOptionIndexSig = useSignal<number>(-1);

  const defaultListboxOpenSig = useSignal<boolean | undefined>(false);
  const isListboxOpenSig = givenListboxOpenSig || defaultListboxOpenSig;

  const defaultInputFocusedSig = useSignal<boolean | undefined>(false);
  const isInputFocusedSig = givenInputFocusedSig || defaultInputFocusedSig;

  const defaultTriggerFocusedSig = useSignal<boolean | undefined>(false);
  const isTriggerFocusedSig = givenTriggerFocusedSig || defaultTriggerFocusedSig;

  const context: ComboboxContext = {
    selectedOptionIndexSig,
    isListboxOpenSig,
    isInputFocusedSig,
    isTriggerFocusedSig,
    listboxRef
  };

  useContextProvider(ComboboxContextId, context);

  return (
    <div {...rest}>
      <Slot />
    </div>
  );
});
