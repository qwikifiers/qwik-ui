import {
  Component,
  QRL,
  QwikIntrinsicElements,
  component$,
  useSignal,
  useVisibleTask$,
} from '@builder.io/qwik';
import checkpass from 'checkpass';
import { Constraints } from './checkpass-types';

type AnyComponent = Component<QwikIntrinsicElements[any]>;
export type InputPasswordProps = QwikIntrinsicElements['input'] & {
  constraints?: Constraints;
  value?: string;
  disabled?: boolean;
  autoComplete: 'current-password' | 'new-password';
  onPasswordChange$?: QRL<(password: string, message: string) => void>;
  RenderShowIcon?: AnyComponent;
  RenderHideIcon?: AnyComponent;
  buttonShowAriaMessage?: string;
  buttonHideAriaMessage?: string;
};

export const HeadlessShowIcon = component$(
  (props: QwikIntrinsicElements['span']) => {
    return <span {...props}>show</span>;
  }
);
export const HeadlessHideIcon = component$(
  (props: QwikIntrinsicElements['span']) => {
    return <span {...props}>hide</span>;
  }
);

export const InputPassword = component$(
  ({
    value = '',
    disabled = false,
    required = false,
    constraints,
    RenderShowIcon = HeadlessShowIcon,
    RenderHideIcon = HeadlessHideIcon,
    onPasswordChange$,
    buttonShowAriaMessage: buttonShowMessage = 'Show password',
    buttonHideAriaMessage: buttonHideMessage = 'Hide password',
    ...props
  }: InputPasswordProps) => {
    const password = useSignal(value);
    const isHidden = useSignal(true);

    useVisibleTask$(({ track }) => {
      const pass = track(() => password.value);
      const message = checkpass(pass, constraints);
      onPasswordChange$ && onPasswordChange$(pass, message);
    });

    return (
      <div>
        <input
          bind:value={password}
          type={isHidden.value ? 'password' : 'text'}
          aria-required={required}
          required={required}
          aria-disabled={disabled}
          disabled={disabled}
          {...props}
        />
        <button
          type={'button'}
          role="switch"
          aria-label={isHidden.value ? buttonShowMessage : buttonHideMessage}
          aria-checked={isHidden.value}
          aria-disabled={disabled}
          disabled={disabled}
          onClick$={() => {
            isHidden.value = !isHidden.value;
          }}
        >
          {isHidden.value ? (
            <RenderShowIcon aria-hidden={true} />
          ) : (
            <RenderHideIcon aria-hidden={true} />
          )}
        </button>
      </div>
    );
  }
);
