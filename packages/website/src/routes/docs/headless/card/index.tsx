import { component$, useStyles$, useStylesScoped$ } from '@builder.io/qwik';
import { Button, Card, CardBody, CardTitle, CardActions, CardImage } from '@qwik-ui/headless';
import styles from './card.css?inline';

export default component$(() => {
  useStyles$(styles);

  useStylesScoped$(`
   h1 { margin: 2rem 0; padding-top: 1rem; font-weight: bold; border-top: 1px dotted #222}
   .container { width: 300px }
  `)

  return (
    <div class="container">
      <h2>This is the documentation for the Card</h2>

      <h1>Card Example</h1>

      <Card>
        <CardBody>
          <CardTitle>Card Title</CardTitle>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aliquid architecto delectus deleniti dolor</p>
        </CardBody>
      </Card>

      <h1>Card Completed</h1>

      <Card>
        <CardImage src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="shoes"></CardImage>
        <CardBody>
          <CardTitle>Card Title</CardTitle>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aliquid architecto delectus deleniti dolor</p>          <CardActions class="custom-card-actions">
          <Button>Button 1</Button>
          <Button>Button 2</Button>
        </CardActions>
        </CardBody>
      </Card>


      <h1>Skinned Card with custom CSS</h1>

      <Card class="custom-card">
        <CardBody class="custom-card-body">
          <CardTitle class="custom-card-title">Card Title</CardTitle>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aliquid architecto delectus deleniti dolor</p>        </CardBody>
      </Card>


      <h1>Skinned Card with custom CSS</h1>
      <Card class="custom-card">
        <CardImage src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="shoes"></CardImage>
        <CardBody class="custom-card-body">
          <CardTitle>Card Title</CardTitle>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aliquid architecto delectus deleniti dolor</p>          <CardActions class="custom-card-actions">
            <Button>Button 1</Button>
            <Button>Button 2</Button>
          </CardActions>
        </CardBody>
      </Card>


    </div>
  );
});
