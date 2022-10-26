import { Meta } from '@storybook/html';
import { Card } from './card';

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

