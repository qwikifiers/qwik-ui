import { Meta } from '@storybook/html';
import { Collapse } from './collapse';
import { CollapseTitle } from './collapseTitle';
import { CollapseContent } from './collapseContent';

export default {
  title: 'Collapse',
  argTypes: {
    showArrow: { control: 'boolean'},
    showPlus: { control: 'boolean' }
  }
} as Meta;

const Template = (args: any) => <Collapse {...args}>
  <CollapseTitle>Click on me to show content</CollapseTitle>
  <CollapseContent>
    <p>This content will be shown/hidden</p>
  </CollapseContent>
</Collapse>;

export const Default = Template.bind({});
