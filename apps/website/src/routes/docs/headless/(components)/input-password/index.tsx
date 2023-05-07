import { component$ } from '@builder.io/qwik';
import { InputPassword, useInputPassword } from '@qwik-ui/headless';

export default component$(() => {
  const input = useInputPassword();
  const input2 = useInputPassword({
    rules: {
      minLength: 6,
      minCapitalLetters: 2,
      minNumbers: 2,
      maxNumbers: 5,
      minSpecialCharacters: 2,
      maxSpecialCharacters: 6,
      minUniqueCharacters: 4,
      disallowCharacters: ['$', '*'],
    },
  });
  const input3 = useInputPassword();

  return (
    <div class="flex flex-col gap-8">
      <div>
        <p>This is the documentation for the Input Password</p>

        <h2>Password Example</h2>

        <ul>
          <li>Password: {input.value.value}</li>
          <li>Visible: {input.visible.value ? 'yes' : 'no'}</li>
          <li>
            Errors:
            <ul>
              {input.errors.value.map((error, i) => (
                <li key={i}>{error.message}</li>
              ))}
            </ul>
          </li>
        </ul>

        <InputPassword.Root {...input}>
          <InputPassword.Input />
          <InputPassword.Toggler>
            <InputPassword.Icon />
          </InputPassword.Toggler>
        </InputPassword.Root>
      </div>

      <div>
        <h2>With constraints</h2>

        <p>
          It uses{' '}
          <a href="https://www.npmjs.com/package/checkpass" target="_blank">
            checkpass
          </a>{' '}
          for the rules validations and errors.
        </p>

        <ul>
          <li>Password: {input2.value.value}</li>
          <li>Visible: {input2.visible.value ? 'yes' : 'no'}</li>
          <li>
            Errors:
            <ul>
              {input2.errors.value.map((error, i) => (
                <li key={i}>{error.message}</li>
              ))}
            </ul>
          </li>
        </ul>

        <InputPassword.Root {...input2}>
          <InputPassword.Input />
          <InputPassword.Toggler>
            <InputPassword.Icon />
          </InputPassword.Toggler>
        </InputPassword.Root>
      </div>

      <div>
        <h2>With confirm</h2>

        <ul>
          <li>Password: {input3.value.value}</li>
          <li>Visible: {input3.visible.value ? 'yes' : 'no'}</li>
          <li>Match: {input3.match.value ? 'yes' : 'no'}</li>
        </ul>

        <InputPassword.Root {...input3}>
          <InputPassword.Input />
          <InputPassword.Toggler>
            <InputPassword.Icon />
          </InputPassword.Toggler>
          <div>confirm</div>
          <InputPassword.InputConfirm />
        </InputPassword.Root>
      </div>
    </div>
  );
});
