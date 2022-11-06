import { Meta } from '@storybook/html';
import { Alert } from './alert';

export default {
  title: 'Data Display / Alert',
} as Meta;

const Template = () => <Alert>An alert</Alert>;

export const Default = Template.bind({});
