import { component$, useComputed$, useSignal } from '@builder.io/qwik';
import { InputPassword } from '@qwik-ui/headless';

export default component$(() => {
  const password = useSignal('');
  const messagePass = useSignal('');

  const passwordCreation = useSignal('');
  const passwordCreationConfirm = useSignal('');
  const messagePassCreation = useSignal('');

  const isMatch = useComputed$(() => {
    if (!passwordCreation.value || !passwordCreationConfirm.value) return false;
    return passwordCreation.value === passwordCreationConfirm.value;
  });

  return (
    <div class="flex flex-col gap-8">
      <div>
        <p>This is the documentation for the Input Password</p>

        <h2>Input Password Example</h2>

        <InputPassword
          autoComplete={'current-password'}
          value={password.value}
          onPasswordChange$={(pass, message) => {
            password.value = pass;
            messagePass.value = message;
          }}
          RenderHideIcon={component$((props) => (
            <span>customHideComponent</span>
          ))}
        />
        <pre>Password value: {password.value}</pre>
        <pre>Password message: {messagePass.value} ( without constrains )</pre>
      </div>

      <div>
        <p>This is the documentation for the Input Password Confirmation</p>

        <h2>Input Password Example</h2>

        <InputPassword
          autoComplete={'new-password'}
          value={passwordCreation.value}
          onPasswordChange$={(pass, message) => {
            passwordCreation.value = pass;
            messagePassCreation.value = message;
          }}
          constraints={{
            minCapitalLetters: 1,
            minNumbers: 1,
            minSpecialCharacters: 1,
            minLength: 8,
          }}
        />
        <InputPassword
          autoComplete={'current-password'}
          value={passwordCreation.value}
          onPasswordChange$={(pass) => {
            passwordCreationConfirm.value = pass;
          }}
        />
        <pre>Password value: {passwordCreation.value}</pre>
        <pre>Password confirm value: {passwordCreationConfirm.value}</pre>
        <pre>Password message: {messagePassCreation.value}</pre>
        <pre>Password match: {String(isMatch.value)}</pre>
      </div>
    </div>
  );
});
