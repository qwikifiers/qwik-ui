// File: otp-native-input.tsx
import { component$, useContext } from '@builder.io/qwik';
import { OTPContextId } from './otp-context';

export const OTPNativeInput = component$(() => {
  const context = useContext(OTPContextId);

  return (
    <div class="flex flex-col gap-2">
      <label>This field will be Hidden</label>

      <input
        ref={context.nativeInputRef}
        type="text"
        data-qui-otp-native-input
        value={context.value}
        class="border border-gray-300 "
        onInput$={(event: InputEvent) => {
          const input = event.target as HTMLInputElement;
          context.value = input.value;
          // context.activeIndex = (context.activeIndex + 1) % context.numInputs;
        }}
      />
    </div>
  );
});
