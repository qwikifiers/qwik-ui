import { Meta } from '@storybook/html';
import { ButtonGroup } from './buttonGroup';
import { Button } from '../button/button';

export default {
  title: 'Layout / Button Group',
} as Meta;

const Template = (args: any) => (
  <ButtonGroup {...args}>
    <Button class="btn btn-active">First</Button>
    <Button class="btn">Second</Button>
    <Button class="btn">Third</Button>
  </ButtonGroup>
);

export const Default = Template.bind({});

export const WithVertical = Template.bind({});
WithVertical.args = {
  vertical: true,
};
