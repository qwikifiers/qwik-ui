import { component$, useSignal } from '@builder.io/qwik';
import { Tab, TabList, TabPanel, Tabs } from '@qwik-ui/headless';

export default component$(() => {
  const tabsClickedCountSig = useSignal(0);
  return (
    <>
      <h3>Danish Composers</h3>
      <h4 class="mt-4 text-white">(watch the counter below)</h4>
      <Tabs
        onClick$={() => {
          tabsClickedCountSig.value++;
        }}
      >
        <TabList>
          <Tab>Maria Ahlefeldt</Tab>
          <Tab>Carl Andersen</Tab>
          <Tab>Ida Henriette da Fonseca</Tab>
        </TabList>
        <TabPanel>
          <p>Maria Theresia Ahlefeldt (16 January 1755 - 20 December 1810) was a ...</p>
        </TabPanel>
        <TabPanel>
          <p>Carl Joachim Andersen (29 April 1847 - 7 May 1909) was a ...</p>
        </TabPanel>
        <TabPanel>
          <p>Ida Henriette da Fonseca (July 27, 1802 - July 6, 1858) was a ...</p>
        </TabPanel>
      </Tabs>

      <p class="mt-4 text-white">Click count: {tabsClickedCountSig.value}</p>
    </>
  );
});
