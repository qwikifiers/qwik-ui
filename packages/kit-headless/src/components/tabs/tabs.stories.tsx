import { Meta, StoryObj } from 'storybook-framework-qwik';
import { Tab, TabList, TabPanel, Tabs, TabsProps } from './';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<TabsProps> = {
  component: Tabs,
};

export default meta;

type Story = StoryObj<TabsProps>;

export const Primary: Story = {
  render: () => (
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
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const tabs = await canvas.findAllByRole('tab');
    await userEvent.click(tabs[1]);

    const tabPanel = await canvas.findByRole('tabpanel');

    await expect(tabPanel).toHaveTextContent('Panel 2');
  },
};
