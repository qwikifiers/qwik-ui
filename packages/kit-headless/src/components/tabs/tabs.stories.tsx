import { expect } from '@storybook/jest';
import { screen, userEvent, within } from '@storybook/testing-library';
import { Meta, StoryObj } from 'storybook-framework-qwik';
import { Tab, TabList, TabPanel, Tabs, TabsProps } from './';

const meta: Meta<TabsProps> = {
  component: Tabs,
  args: {
    behavior: 'automatic'
  },
  argTypes: {
    behavior: {
      control: {
        type: 'select'
      },
      options: ['automatic', 'manual']
    }
  }
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

    screen.debug(canvasElement);
    const activeTabPanel = await canvas.findByRole('tabpanel');

    await expect(activeTabPanel).toHaveTextContent('Panel 2');
  }
};

// export const TabsWithMiddleDisabled: Story = {
//   render: () =>

// const DynamicTabsComponent = component$(() => {
//   const tabsState = useStore(['Dynamic Tab 1', 'Dynamic Tab 2', 'Dynamic Tab 3']);

//     return (
//       <>
//         <Tabs>
//           <TabList>
//           {tabsState.map((tab) => (
//             <Tab key={tab}>{tab}</Tab>
//           ))
//             }
//           </TabList>
//           {tabsState.map((tab) => (
//             <TabPanel key={tab}>{tab} Panel</TabPanel>
//           ))}
//         </Tabs>
//         <button onClick$={()=> tabsState.splice(0,1)}>Remove Tab</button>
//       </>
//     )
// })

// export const DynamicTabsRemoveFirst: Story = {
//   render: () => <DynamicTabsComponent/>,
//   play: async ({ canvasElement }) => {
//     const canvas = within(canvasElement);

//     const removeButton = await canvas.findByRole('button', { name: /remove tab/i });

//     await userEvent.click(removeButton);

//     const activeTabPanel = await canvas.findByRole('tabpanel', {name: /.*2 Panel/i});

//     const remainingTabs = await canvas.findAllByRole('tab');

//     await expect(activeTabPanel).toHaveTextContent(/.*2 Panel/i);
//     await expect(remainingTabs).toHaveLength(2);
//   },

// };
