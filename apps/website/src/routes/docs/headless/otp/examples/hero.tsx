import { component$, useStyles$ } from '@builder.io/qwik';
import { Otp } from '@qwik-ui/headless';

export default component$(() => {
  useStyles$(styles);

  return (
    <Otp.Root>
      <Otp.HiddenNativeInput />
      <div class="otp-container">
        <Otp.Item class="border-2" />
        <Otp.Item class="border-2" />
        <Otp.Item class="border-2" />
        <Otp.Item class="border-2" />
        <Otp.Item class="border-2" />
        <Otp.Item class="border-2" />
      </div>
    </Otp.Root>
  );
});

// internal
import styles from '../snippets/otp.css?inline';
