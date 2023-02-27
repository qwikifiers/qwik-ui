import type { Meta } from 'storybook-framework-qwik';
import { Button } from '@qwik-ui/headless';

export default {
  title: 'Headless/Button',
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
