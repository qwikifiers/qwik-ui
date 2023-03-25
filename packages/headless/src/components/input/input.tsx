import {
  component$,
  JSXNode,
  QRL,
  QwikIntrinsicElements,
  type Signal,
  Slot,
  useSignal,
  useId,
  createContextId,
  useContextProvider,
  useContext,
} from '@builder.io/qwik';
import { Switch as InputSwitch } from '../switch/switch';
import { InputPhone, type InputPhoneProps } from '../input-phone';

type InputContextService = {
  ref: Signal<HTMLInputElement | undefined>;
  id: string;
};

const inputContext = createContextId<InputContextService>(
  'input-context-service'
);

/**
 *
 */

type ControlProps = QwikIntrinsicElements['div'] & {
  resolve$?: QRL<(ref: Signal<HTMLInputElement | undefined>) => JSXNode>;
};

export const Root = component$((props: ControlProps) => {
  const contextService: InputContextService = {
    ref: useSignal<HTMLInputElement>(),
    id: props.id || useId(),
  };
  useContextProvider(inputContext, contextService);

  return (
    <div role="presentation" {...props}>
      <Slot />
    </div>
  );
});

/**
 *
 */

type LabelProps = QwikIntrinsicElements['label'];

export const Label = component$((props: LabelProps) => {
  const context = useContext(inputContext);
  const id = props.id || context.id;

  return (
    <label {...props} for={id}>
      <Slot />
    </label>
  );
});

/**
 *
 */

type HintProps = QwikIntrinsicElements['small'];

export const Hint = component$((props: HintProps) => {
  const context = useContext(inputContext);
  const id = props.id || context.id;

  return (
    <div {...props} id={`hint-${id}`}>
      <Slot />
    </div>
  );
});

/**
 *
 */

type InputMessage = QwikIntrinsicElements['div'] & {
  status?: 'rejected' | 'pending' | 'resolved';
};

export const Message = component$((props: InputMessage) => {
  const context = useContext(inputContext);
  const id = props.id || context.id;

  return (
    <div aria-live="polite" id={`message-${id}`} {...props}>
      <Slot />
    </div>
  );
});

/**
 *
 */

type InputSwtichProps = QwikIntrinsicElements['input'];

export const Switch = component$((props: InputSwtichProps) => {
  const context = useContext(inputContext);
  const id = props.id || context.id;

  return (
    <InputSwitch
      {...props}
      aria-describedby={`hint-${id} message-${id}`}
      id={id}
    />
  );
});

/**
 *
 */

// type InputPhone = QwikIntrinsicElements['input'];

export const Phone = component$((props: InputPhoneProps) => {
  const context = useContext(inputContext);
  const id = props.id || context.id;

  return (
    <InputPhone
      {...props}
      aria-describedby={`hint-${id} message-${id}`}
      id={id}
    />
  );
});
