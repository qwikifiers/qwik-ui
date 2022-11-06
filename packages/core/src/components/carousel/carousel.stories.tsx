import { Meta } from '@storybook/html';
import { Carousel } from './carousel';

export default {
  title: 'Data display / Carousel',
  argTypes: {
    images: { control: 'object' },
  },
} as Meta;

const Template = (args: any) => <Carousel {...args} />;

export const Default = Template.bind({});
Default.args = {
  images: [
    { src: 'https://placeimg.com/400/300/arch', alt: 'burger' },
    { src: 'https://placeimg.com/400/300/arch', alt: 'burger' },
    { src: 'https://placeimg.com/400/300/arch', alt: 'burger' },
  ],
};
