import { component$, Slot, useSignal } from '@builder.io/qwik';
import { Button, Dialog } from '@qwik-ui/tailwind';
import { PreviewCodeExample } from '../../../../../components/preview-code-example/preview-code-example';

export const Example01 = component$(() => {
  const dialogRef = useSignal<Dialog.DialogRef>();

  return (
    <PreviewCodeExample>
      <div q:slot="actualComponent">
        <Button onClick$={() => dialogRef.value?.open()}>Open Dialog</Button>

        <Dialog.Root ref={dialogRef}>
          <Dialog.Header>
            <h2 id="dialog-heading">Hello 👋</h2>
          </Dialog.Header>
          <Dialog.Content>
            <p id="dialog-text">I am a simple Dialog.</p>
          </Dialog.Content>
          <Dialog.Footer>
            <Button onClick$={() => dialogRef.value?.close()}>Close</Button>
          </Dialog.Footer>
        </Dialog.Root>
      </div>

      <div q:slot="codeExample">
        <Slot />
      </div>
    </PreviewCodeExample>
  );
});

export const Example02 = component$(() => {
  const dialogRef = useSignal<Dialog.DialogRef>();

  return (
    <PreviewCodeExample>
      <div q:slot="actualComponent">
        <Button autoFocus onClick$={() => dialogRef.value?.open()}>
          Open Dialog
        </Button>

        <Dialog.Root ref={dialogRef}>
          <Dialog.Header>
            <h2 id="dialog-heading">Hello 👋</h2>
          </Dialog.Header>
          <Dialog.Content>
            <p id="dialog-text">Do you agree to the terms our services?</p>
          </Dialog.Content>
          <Dialog.Footer>
            <button onClick$={() => dialogRef.value?.close()}>Disagree</button>
            <Button onClick$={() => dialogRef.value?.close()}>Agree</Button>
          </Dialog.Footer>
        </Dialog.Root>
      </div>

      <div q:slot="codeExample">
        <Slot />
      </div>
    </PreviewCodeExample>
  );
});

export const Example_FullScreen = component$(() => {
  const dialogRef = useSignal<Dialog.DialogRef>();

  return (
    <PreviewCodeExample>
      <div q:slot="actualComponent">
        <Button onClick$={() => dialogRef.value?.open()}>Open Dialog</Button>

        <Dialog.Root ref={dialogRef} fullScreen={true}>
          <Dialog.Header>
            <h2 id="dialog-heading">Hello 👋</h2>
          </Dialog.Header>
          <Dialog.Content>
            <p id="dialog-text">I am a simple Dialog.</p>
          </Dialog.Content>
          <Dialog.Footer>
            <Button onClick$={() => dialogRef.value?.close()}>Close</Button>
          </Dialog.Footer>
        </Dialog.Root>
      </div>

      <div q:slot="codeExample">
        <Slot />
      </div>
    </PreviewCodeExample>
  );
});

export const Example_ScrollingLongContent = component$(() => {
  const dialogRef = useSignal<Dialog.DialogRef>();

  return (
    <PreviewCodeExample>
      <div q:slot="actualComponent">
        <Button onClick$={() => dialogRef.value?.open()}>Open Dialog</Button>

        <Dialog.Root ref={dialogRef}>
          <Dialog.Header>
            <h2>Poems</h2>
            <small>By ELIZABETH BISHOP</small>
          </Dialog.Header>
          <Dialog.Content>
            <h3>One Art</h3>
            <p>
              The art of losing isn't hard to master; so many things seem filled
              with the intent to be lost that their loss is no disaster.
            </p>
            <p>
              Lose something every day. Accept the fluster of lost door keys,
              the hour badly spent. The art of losing isn't hard to master.
            </p>
            <p>
              Then practice losing farther, losing faster: places, and names,
              and where it was you meant to travel. None of these will bring
              disaster.
            </p>
            I lost my mother's watch. And look! my last, or next-to-last, of
            three loved houses went. The art of losing isn't hard to master.
            <p>
              I lost two cities, lovely ones. And, vaster, some realms I owned,
              two rivers, a continent. I miss them, but it wasn't a disaster.
            </p>
            <p>
              —Even losing you (the joking voice, a gesture I love) I shan't
              have lied. It's evident the art of losing's not too hard to master
              though it may look like (Write it!) like disaster.
            </p>
            <hr />
            <h3>A Miracle for Breakfast</h3>
            <p>
              At six o'clock we were waiting for coffee, waiting for coffee and
              the charitable crumb that was going to be served from a certain
              balcony --like kings of old, or like a miracle. It was still dark.
              One foot of the sun steadied itself on a long ripple in the river.
            </p>
            <p>
              The first ferry of the day had just crossed the river. It was so
              cold we hoped that the coffee would be very hot, seeing that the
              sun was not going to warm us; and that the crumb would be a loaf
              each, buttered, by a miracle. At seven a man stepped out on the
              balcony.
            </p>
            <p>
              He stood for a minute alone on the balcony looking over our heads
              toward the river. A servant handed him the makings of a miracle,
              consisting of one lone cup of coffee and one roll, which he
              proceeded to crumb, his head, so to speak, in the clouds--along
              with the sun.
            </p>
            <p>
              Was the man crazy? What under the sun was he trying to do, up
              there on his balcony! Each man received one rather hard crumb,
              which some flicked scornfully into the river, and, in a cup, one
              drop of the coffee. Some of us stood around, waiting for the
              miracle.
            </p>
            <p>
              I can tell what I saw next; it was not a miracle. A beautiful
              villa stood in the sun and from its doors came the smell of hot
              coffee. In front, a baroque white plaster balcony added by birds,
              who nest along the river, --I saw it with one eye close to the
              crumb--
            </p>
            <p>
              and galleries and marble chambers. My crumb my mansion, made for
              me by a miracle, through ages, by insects, birds, and the river
              working the stone. Every day, in the sun, at breakfast time I sit
              on my balcony with my feet up, and drink gallons of coffee.
            </p>
            <p>
              We licked up the crumb and swallowed the coffee. A window across
              the river caught the sun as if the miracle were working, on the
              wrong balcony.
            </p>
          </Dialog.Content>
          <Dialog.Footer>
            <Button onClick$={() => dialogRef.value?.close()}>Close</Button>
          </Dialog.Footer>
        </Dialog.Root>
      </div>

      <div q:slot="codeExample">
        <Slot />
      </div>
    </PreviewCodeExample>
  );
});
