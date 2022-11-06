import { Meta } from '@storybook/html';
import { Steps } from './steps';
import {Step} from "./step";

export default {
  title: 'Navigation / Steps',
  argTypes: {
    isVertical: {control: 'boolean'}
  }
} as Meta;

const Template = (args: any) => <Steps {...args}>
    <Step isPrimary={true}>step 1</Step>
    <Step dataContent={'●'}>step 2</Step>
    <Step>step 2</Step>
</Steps>;

export const Default = Template.bind({});


