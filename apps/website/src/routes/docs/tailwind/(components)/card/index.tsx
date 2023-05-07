import { component$, useStylesScoped$ } from '@builder.io/qwik';
import {
  Card,
  CardTitle,
  CardBody,
  CardActions,
  Button,
  CardImage,
} from '@qwik-ui/tailwind';

export default component$(() => {
  useStylesScoped$(`
    h1 { margin: 2rem 0; padding-top: 1rem; font-weight: bold; border-top: 1px dotted #222}
    .container { width: 300px }
  `);

  return (
    <div class="container">
      <h2>This is the documentation for the Card</h2>

      <h1>Card Example</h1>
      <Card>
        <CardBody>
          <p>If a dog chews shoes whose shoes does he choose?</p>
        </CardBody>
      </Card>

      <h1>Card with Title Example</h1>
      <Card>
        <CardBody>
          <CardTitle>Card Title</CardTitle>
          <p>If a dog chews shoes whose shoes does he choose?</p>
        </CardBody>
      </Card>

      <h1>Card with Image Example</h1>
      <Card>
        <CardImage
          src="https://tailwindui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
          alt="shoes"
        />
        <CardBody>
          <CardTitle>Card Title</CardTitle>
          <p>If a dog chews shoes whose shoes does he choose?</p>
        </CardBody>
      </Card>

      <h1>Card Completed</h1>
      <Card>
        <CardImage
          src="https://tailwindui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
          alt="shoes"
        />
        <CardBody>
          <CardTitle>Card Title</CardTitle>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <CardActions>
            <Button>Button 1</Button>
            <Button>Button 2</Button>
          </CardActions>
        </CardBody>
      </Card>
    </div>
  );
});
