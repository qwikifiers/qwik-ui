import { component$, Slot } from '@builder.io/qwik';
import { PreviewCodeExample } from '../../../../../components/preview-code-example/preview-code-example';
import {
  Card,
  CardTitle,
  CardBody,
  CardActions,
  Button,
  CardImage,
} from '@qwik-ui/tailwind';

export const Example01 = component$(() => {
  return (
    <PreviewCodeExample>
      <div q:slot="actualComponent">
        <Card>
          <CardBody>
            <p>
              Qwik is a new kind of web framework that can deliver instant
              loading web applications at any size or complexity. Your sites and
              apps can boot with about 1kb of JS.
            </p>
          </CardBody>
        </Card>
      </div>

      <div q:slot="codeExample">
        <Slot />
      </div>
    </PreviewCodeExample>
  );
});

export const Example02 = component$(() => {
  return (
    <PreviewCodeExample>
      <div q:slot="actualComponent">
        <Card>
          <CardBody>
            <CardTitle>Qwik City</CardTitle>
            <p>
              Qwik is a new kind of web framework that can deliver instant
              loading web applications at any size or complexity. Your sites and
              apps can boot with about 1kb of JS.
            </p>
          </CardBody>
        </Card>
      </div>

      <div q:slot="codeExample">
        <Slot />
      </div>
    </PreviewCodeExample>
  );
});

export const Example03 = component$(() => {
  return (
    <PreviewCodeExample>
      <div q:slot="actualComponent">
        <Card>
          <CardImage
            src="https://external-preview.redd.it/YDalr3TrTBvTphj7eSESSYgG3adrSJAFcyETYJls_6s.jpg?width=640&crop=smart&auto=webp&s=829b513a6d4f8252985b000f86809b317b0cbc94"
            alt="qwik logo"
          />
          <CardBody>
            <CardTitle>Qwik City</CardTitle>
            <p>
              Qwik is a new kind of web framework that can deliver instant
              loading web applications at any size or complexity. Your sites and
              apps can boot with about 1kb of JS.
            </p>
          </CardBody>
        </Card>
      </div>

      <div q:slot="codeExample">
        <Slot />
      </div>
    </PreviewCodeExample>
  );
});

export const Example04 = component$(() => {
  return (
    <PreviewCodeExample>
      <div q:slot="actualComponent">
        <Card>
          <CardImage
            src="https://external-preview.redd.it/YDalr3TrTBvTphj7eSESSYgG3adrSJAFcyETYJls_6s.jpg?width=640&crop=smart&auto=webp&s=829b513a6d4f8252985b000f86809b317b0cbc94"
            alt="qwik logo"
          />
          <CardBody>
            <CardTitle>Qwik City</CardTitle>
            <p>
              Qwik is a new kind of web framework that can deliver instant
              loading web applications at any size or complexity. Your sites and
              apps can boot with about 1kb of JS.
            </p>
            <CardActions>
              <Button>Learn More</Button>
            </CardActions>
          </CardBody>
        </Card>
      </div>

      <div q:slot="codeExample">
        <Slot />
      </div>
    </PreviewCodeExample>
  );
});
