import { component$, useStyles$ } from '@builder.io/qwik';
import { Tab, TabList, TabPanel, Tabs } from '@qwik-ui/headless';
import styles from '.././index.css?inline';

export default component$(() => {
  useStyles$(styles);
  return (
    <>
      <div class="tabs-example mr-auto">
        <h3>Danish Composers</h3>
        <Tabs behavior="automatic">
          <TabList>
            <Tab>Maria</Tab>
            <Tab>Carl</Tab>
            <Tab>Ida</Tab>
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
      </div>
    </>
  );
});
