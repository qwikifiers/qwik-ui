import type { Meta } from 'storybook-framework-qwik';
import { Button } from '@qwik-ui/theme-daisy';

export default {
  title: 'Daisy/Button',
  tags: ['autodocs'],
  argTypes: {
    type: { type: 'string' },
    disabled: { type: 'boolean' },
  },
} as Meta;

export const Showcase = {
  render(args) {
    return <Button {...args}>Text</Button>;
  },
};
