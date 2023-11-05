import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { Input } from '@qwik-ui/headless';

const { Root, Label, Hint, Phone, Message } = Input;

export default component$(() => {
  const { scopeId } = useStylesScoped$(`
    h1 { margin: 2rem 0; padding-top: 1rem; font-weight: bold; border-top: 1px dotted #222}
    h2 { margin-block: 1.15em 0.5em; font-size: xx-large; }
    h3 { margin-block: 0.85em 0.35em; font-size: x-large; }
    h4 { margin-block: 0.85em 0.35em; font-size: x-large; }

    hr {
      margin-block: 2em;
    }
  `);

  return (
    <>
      <p>This is the documentation for the Input</p>

      <h2>Valid input</h2>

      <Root class={[scopeId, 'form-item']}>
        <Label>
          <h3>Delivery phone number</h3>
        </Label>
        <Hint>Shipper will call at this phone number when your parcel is delivered.</Hint>
        <Phone />
        <Message status="resolved">Your phone number is valid</Message>
      </Root>

      <hr />

      <h2>Pending input</h2>

      <Root class={[scopeId, 'form-item']}>
        <Label>
          <h3>Delivery phone number</h3>
        </Label>
        <Hint>Shipper will call at this phone number when your parcel is delivered.</Hint>
        <Phone />
        <Message status="pending">Your phone number is being verified</Message>
      </Root>

      <hr />

      <h2>Valid invalid</h2>

      <Root class={[scopeId, 'form-item']}>
        <Label>
          <h3>Delivery phone number</h3>
        </Label>
        <Hint>Shipper will call at this phone number when your parcel is delivered.</Hint>
        <Phone />
        <Message status="rejected">Your phone number is valid</Message>
      </Root>

      <hr />

      <h3>Part</h3>

      <ul>
        <li>Root</li>
        <li>Hint</li>
        <li>Message</li>
        <li>inputs - tbd</li>
      </ul>

      <hr />

      <h3>Outputs</h3>

      <ul>
        <li>same as any inputs</li>
      </ul>
    </>
  );
});
