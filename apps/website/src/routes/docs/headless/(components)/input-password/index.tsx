import { component$ } from '@builder.io/qwik';
import { InputPassword, useInputPassword } from '@qwik-ui/headless';

export default component$(() => {
  const input = useInputPassword();

  return (
    <div class="flex flex-col gap-8">
      <div>
        <p>This is the documentation for the Input Password</p>

        <h2>Simple usage of Password Example</h2>

        <ul>
          <li>Password: {input.value.value}</li>
          <li>Visible: {input.visible.value ? 'yes' : 'no'}</li>
        </ul>

        <InputPassword.Root {...input}>
          <InputPassword.Input />
          <InputPassword.Toggler>
            <InputPassword.Icon />
          </InputPassword.Toggler>
        </InputPassword.Root>
      </div>
    </div>
  );
});
