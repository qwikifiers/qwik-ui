import { component$, useSignal, useStyles$ } from '@builder.io/qwik';
import { Tabs } from '@qwik-ui/headless';
import styles from '.././index.css?inline';

export default component$(() => {
  useStyles$(styles);

  const selectedIndex = useSignal(0);

  return (
    <>
      <div class="tabs-example">
        <h3>Danish Composers</h3>
        <Tabs.Root behavior="automatic" selectedIndex={selectedIndex.value}>
          <Tabs.List>
            <Tabs.Tab>Maria</Tabs.Tab>
            <Tabs.Tab>Carl</Tabs.Tab>
            <Tabs.Tab>Ida</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel>
            <p>Maria Theresia Ahlefeldt (16 January 1755 - 20 December 1810) ...</p>
          </Tabs.Panel>
          <Tabs.Panel>
            <p>Carl Joachim Andersen (29 April 1847 - 7 May 1909) ...</p>
          </Tabs.Panel>
          <Tabs.Panel>
            <p>Ida Henriette da Fonseca (July 27, 1802 - July 6, 1858) ...</p>
          </Tabs.Panel>
        </Tabs.Root>
        <br />
        <button onClick$={() => (selectedIndex.value = 0)}>Select Tab 0</button>
        <br />
        <button onClick$={() => (selectedIndex.value = 1)}>Select Tab 1</button>
        <br />
        <button onClick$={() => (selectedIndex.value = 2)}>Select Tab 2</button>
      </div>
    </>
  );
});
