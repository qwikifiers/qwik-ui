import { Meta, StoryObj } from 'storybook-framework-qwik';
import { Tab, TabList, TabPanel, Tabs, TabsProps } from './tabs';
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

    const tab2 = canvas.getByRole('tab', { name: 'Tab 2' });
    await userEvent.click(tab2);

    // const tabPanel2 = canvas.getByRole('tabpanel');
    // await expect(tabPanel2).toContain('Panel 2');
  },
};
