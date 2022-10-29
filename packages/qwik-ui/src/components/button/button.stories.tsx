import { Meta } from '@storybook/html';
import { Button } from './button';

export default {
  title: 'Actions / Button',
} as Meta;

const Template = () => <Button className="btn btn-primary">Click Me!</Button>;

export const Default = Template.bind({});
