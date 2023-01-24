import { component$, useSignal } from '@builder.io/qwik';
import { Tab, TabPanel, Tabs } from '@qwik-ui/theme-daisy';

export default component$(() => {
  const tabs = ['Tab 1', 'Tab 2', 'Tab 3'];
  const activeTab = useSignal(0);
  return (
    <>
      <h2>This is the documentation for the Tabs</h2>
      <div style="width: 300px">
        <Tabs>
          {tabs.map((tab, index) => {
            return (
              <Tab
                key={index}
                onClick$={(clicked: number) => {
                  activeTab.value = clicked;
                }}
                isLifted={false}
                isBordered={true}
              >
                {tab}
              </Tab>
            );
          })}
          {tabs.map((tab, index) => {
            return (
              <TabPanel key={'panel' + index}>
                <div>
                  {tab} {tab} {tab}
                </div>
              </TabPanel>
            );
          })}
        </Tabs>
      </div>
    </>
  );
});
