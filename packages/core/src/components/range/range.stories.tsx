import { Meta } from '@storybook/html';
import { Range } from './range';
import {$} from "@builder.io/qwik";

export default {
  title: 'Data Input / Range',
  argTypes: {
    min: { control: 'number' },
    max: { control: 'number' },
    value: { control: 'number' }
  }
} as Meta;

const Template = (args: any) => <Range {...args} />;

export const Default = Template.bind({});
Default.args = {
  min: 0,
  max: 100,
  value: 40,
  onChange: $((evt) => console.log(evt.target.value))
}
