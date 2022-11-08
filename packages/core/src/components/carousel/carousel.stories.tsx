import { Meta } from '@storybook/html';
import { Carousel } from './carousel';
import { CarouselItem } from "./carousel-item";

export default {
  title: 'Data display / Carousel',
  argTypes: {
    images: { control: 'object' },
    withIndicators: { control: 'boolean' }
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

const TemplateWithSlot = (args: any) => <Carousel {...args}>
  <CarouselItem index={1} src="https://placeimg.com/400/300/arch" alt="burger" />
  <CarouselItem index={2} src="https://placeimg.com/400/300/arch" alt="burger" />
  <div q:slot="indicators" class="flex justify-center w-full py-2 gap-2">
    <a href="#item1" className="btn btn-xs">1</a>
    <a href="#item2" className="btn btn-xs">2</a>
  </div>
</Carousel>
export const UsingSlot = TemplateWithSlot.bind({});
