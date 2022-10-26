import { Meta } from '@storybook/html';
import { Card } from './card';
import { CardActions } from './cardActions';
import { CardContent } from './cardContent';

export default {
  title: 'Card',
  argTypes: {
    imagePlacement: { control: 'select', options: ['top', 'bottom']}
  }
} as Meta;

const Template = (args: any) => <Card {...args}>
  <p>If a dog chews shoes whose shoes does he choose?</p>
  <div className="card-actions justify-end">
    <button className="btn btn-primary">Buy Now</button>
  </div>
</Card>;

export const Default = Template.bind({});
Default.args = {
  title: 'Qwik!'
}

export const WithImage = Template.bind({});
WithImage.args = {
  title: 'Qwik!',
  imageUrl: 'https://placeimg.com/400/225/arch',
  imagePlacement: 'top',
  imageAsOverlay: false
}

const WithCardComponentsTemplate = (args: any) => <Card {...args}>
  <CardContent>If a dog chews shoes whose shoes does he choose?</CardContent>
  <CardActions class="justify-end">
    <button class="btn btn-primary">Buy Now</button>
  </CardActions>
</Card>;
export const WithCardComponents = WithCardComponentsTemplate.bind({});
WithCardComponents.args = {
  title: 'Qwik!'
}
