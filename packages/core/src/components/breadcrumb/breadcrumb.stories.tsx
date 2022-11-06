import { Meta } from '@storybook/html';
import { Breadcrumb } from './breadcrumb';
import { BreadcrumbItem } from './breadcrumbItem';

export default {
  title: 'Navigation / Breadcrumb'
} as Meta;

const Template = (args: any) => <Breadcrumb {...args}>
  <BreadcrumbItem navigationUrl="/" label="Home" />
  <BreadcrumbItem navigationUrl="/about" label="About" />
</Breadcrumb>

export const Default = Template.bind({});
