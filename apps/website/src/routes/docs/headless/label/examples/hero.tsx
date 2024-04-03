import { component$, useStyles$ } from '@builder.io/qwik';
import { Label } from '@qwik-ui/headless';
import styles from './label.css?inline';

export default component$(() => {
  useStyles$(styles);

  return (
    <div
      style={{
        display: 'flex',
        padding: '0 20px',
        flexWrap: 'wrap',
        gap: 15,
        alignItems: 'center',
      }}
      data-testid="root"
    >
      <Label class="LabelRoot" for="firstName" data-testid="label">
        First name
      </Label>
      <input
        class="Input"
        type="text"
        id="firstName"
        placeholder="John Doe"
        data-testid="input"
      />
    </div>
  );
});
