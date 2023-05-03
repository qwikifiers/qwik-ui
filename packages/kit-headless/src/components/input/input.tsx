import {
  JSXNode,
  QRL,
  QwikIntrinsicElements,
  Slot,
  component$,
  createContextId,
  useContext,
  useContextProvider,
  useId,
  useSignal,
  type Signal,
} from '@builder.io/qwik';
import { InputPassword, InputPasswordProps } from '../input-password';
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
    <div {...props}>
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

export const Password = component$<InputPasswordProps>((props) => {
  const context = useContext(inputContext);
  const id = props.id || context.id;

  return (
    <InputPassword
      {...props}
      aria-describedby={`hint-${id} message-${id}`}
      id={id}
    />
  );
});
