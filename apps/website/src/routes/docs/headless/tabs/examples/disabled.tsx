import { component$, useStyles$ } from '@builder.io/qwik';
import { Tabs } from '@qwik-ui/headless';
import styles from '.././index.css?inline';

export default component$(() => {
  useStyles$(styles);
  return (
    <>
      <div class="tabs-example mr-auto w-full">
        <h3>Dad jokes</h3>
        <Tabs.Root>
          <TabList>
            <Tab
              style={{ width: '125px' }}
              class="aria-disabled:cursor-not-allowed"
              disabled={true}
            >
              Disabled Tab
            </Tab>
            <Tab style={{ width: '125px' }}>Joke 2</Tab>
            <Tab style={{ width: '125px' }}>Joke 3</Tab>
            <Tab style={{ width: '125px' }}>Joke 4</Tab>
          </TabList>
          <TabPanel>"What did the coffee report to the police", " A mugging."</TabPanel>
          <TabPanel>"What's brown and sticky", " A stick."</TabPanel>
          <TabPanel>"How do the trees get on the internet?", "They log on."</TabPanel>
          <TabPanel>"What did the fish say when he hit the wall", " Dam."</TabPanel>
        </Tabs.Root>
      </div>
    </>
  );
});
