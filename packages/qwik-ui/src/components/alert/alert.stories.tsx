import { Meta } from '@storybook/html';
import { Alert } from './alert';

export default {
  title: 'Alert',
} as Meta;

const Template = () => <Alert>An alert</Alert>;

export const Default = Template.bind({});
