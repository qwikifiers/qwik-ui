import { Meta, StoryObj } from 'storybook-framework-qwik';
import { Tab, TabList, TabPanel, Tabs, TabsProps } from './';
import { userEvent, within, screen } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<TabsProps> = {
  component: Tabs,
  args: {
    behavior: 'automatic',
  },
  argTypes: {
    behavior: {
      control: {
        type: 'select',
      },
      options: ['automatic', 'manual'],
    },
  },
};

export default meta;

type Story = StoryObj<TabsProps>;

const createThreeTabs = () => (
  <Tabs>
    <TabList>
      <Tab>Tab 1</Tab>
      <Tab>Tab 2</Tab>
      <Tab>Tab 3</Tab>
    </TabList>

    <TabPanel>Panel 1</TabPanel>
    <TabPanel>Panel 2</TabPanel>
    <TabPanel>Panel 3</TabPanel>
  </Tabs>
);

export const Primary: Story = {
  render: () => createThreeTabs(),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const secondTab = await canvas.findByRole('tab', { name: /Tab 2/i });
    screen.debug(canvasElement);
    await userEvent.click(secondTab);

    const activeTabPanel = await canvas.findByRole('tabpanel');

    await expect(activeTabPanel).toHaveTextContent('Panel 2');
  },
};
