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
          <Tabs.List>
            <Tabs.Tab
              style={{ width: '110px' }}
              class="aria-disabled:cursor-not-allowed"
              disabled={true}
            >
              Disabled Tab
            </Tabs.Tab>
            <Tabs.Tab style={{ width: '110px' }}>Joke 2</Tabs.Tab>
            <Tabs.Tab style={{ width: '110px' }}>Joke 3</Tabs.Tab>
            <Tabs.Tab style={{ width: '110px' }}>Joke 4</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel>
            "What did the coffee report to the police", " A mugging."
          </Tabs.Panel>
          <Tabs.Panel>"What's brown and sticky", " A stick."</Tabs.Panel>
          <Tabs.Panel>"How do the trees get on the internet?", "They log on."</Tabs.Panel>
          <Tabs.Panel>"What did the fish say when he hit the wall", " Dam."</Tabs.Panel>
        </Tabs.Root>
      </div>
    </>
  );
});
