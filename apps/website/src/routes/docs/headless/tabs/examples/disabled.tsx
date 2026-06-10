import { component$, useStore, useStyles$ } from '@qwik.dev/core';
import { Tabs } from '@qwik-ui/headless';
import styles from '.././index.css?inline';

export default component$(() => {
  useStyles$(styles);

  const store = useStore({
    tabs: [
      { tab: 'Tab 1', disabled: true },
      { tab: 'Tab 2' },
      { tab: 'Tab 3', disabled: true },
      { tab: 'Tab 4' },
    ],
  });
  return (
    <>
      <div class="four-tabs-example mr-auto w-full">
        <h3>Dad jokes</h3>
        <Tabs.Root>
          <Tabs.List>
            {store.tabs.map((tab, i) => (
              <Tabs.Tab key={i} disabled={tab.disabled}>
                {tab.tab}
              </Tabs.Tab>
            ))}
          </Tabs.List>
          {store.tabs.map((tab, i) => (
            <Tabs.Panel key={i}>{tab.tab} Panel</Tabs.Panel>
          ))}
        </Tabs.Root>
      </div>
    </>
  );
});
