import { Meta } from '@storybook/html';
import { Table } from './table';

export default {
  title: 'Navigation / Table',
  argTypes: {
    cols: { control: 'object' },
    rows: { control: 'object' },
  },
} as Meta;

const Template = (args: any) => <Table {...args} />;

export const Default = Template.bind({});
Default.args = {
  cols: ['', 'Name', 'Job', 'Favorite Color'],
  rows: [
    {
      id: '1',
      name: 'Cy Ganderton',
      job: 'Quality Control Specialist',
      color: 'Blue',
    },
    {
      id: '2',
      name: 'Hart Hagerty',
      job: 'Desktop Support Technician',
      color: 'Purple',
    },
    { id: '3', name: 'Brice Swyre', job: 'Tax Accountant', color: 'Red' },
  ],
};
