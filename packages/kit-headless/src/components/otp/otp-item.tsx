import { component$, PropsOf, useContext, useSignal, useTask$ } from '@builder.io/qwik';
import { OTPContextId } from './otp-context';

type OTPProps = {
  _index?: number;
} & PropsOf<'input'>;

export const OtpItem = component$(({ _index, ...props }: OTPProps) => {
  const context = useContext(OTPContextId);
  const inputRef = useSignal<HTMLInputElement>();

  if (_index === undefined) {
    throw new Error('Qwik UI: Otp Item must have an index. This is a bug in Qwik UI');
  }

  useTask$(() => {
    console.log('I AM INSTANCE NUMBER: ', _index);
  });

  return (
    <input
      ref={inputRef}
      {...props}
      type="text"
      data-qui-otp-item={_index}
      value={context.value[_index]}
      size={1}
      onFocus$={() => {
        context.nativeInputRef.value?.focus();
      }}
      maxLength={1}
      readOnly
    />
  );
});
