import { component$, useStore, useStyles$ } from '@builder.io/qwik';
import { Tabs } from '@qwik-ui/headless';
import styles from '.././index.css?inline';

export default component$(() => {
  useStyles$(styles);
  const tabsState = useStore(['Dynamic Tab 1', 'Dynamic Tab 2', 'Dynamic Tab 3']);
  return (
    <>
      <div class="tabs-example mr-auto">
        <Tabs.Root>
          <Tabs.List>
            {tabsState.map((tab) => (
              <Tabs.Tab key={tab}>{tab}</Tabs.Tab>
            ))}
          </Tabs.List>
          {tabsState.map((tab) => (
            <Tabs.Panel key={tab}>{tab} Panel</Tabs.Panel>
          ))}
        </Tabs.Root>

        <button
          class="mt-4 font-bold text-red-600"
          onClick$={() => {
            if (tabsState.length > 1) {
              tabsState.splice(0, 1);
            }
          }}
        >
          Remove First Tab
        </button>
      </div>
    </>
  );
});
