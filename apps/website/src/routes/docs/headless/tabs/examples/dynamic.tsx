import { component$, useStore, useStyles$ } from '@builder.io/qwik';
import { Tabs } from '@qwik-ui/headless';
import styles from '.././index.css?inline';

export default component$(() => {
  useStyles$(styles);
  const store = useStore({
    tabs: ['Tab 1', 'Tab 2', 'Tab 3'],
  });
  return (
    <>
      <div class="vertical-tabs-example mr-auto">
        <button
          class={cn('mb-4 w-48', buttonVariants({ look: 'outline', size: 'sm' }))}
          onClick$={() => {
            store.tabs.unshift(`Added Tab`);
          }}
        >
          Add Tab before
        </button>
        <br />
        <Tabs.Root vertical class="flex space-x-6">
          <Tabs.List class="flex w-fit flex-col">
            {store.tabs.map((tab, i) => (
              <Tabs.Tab key={i}>
                {tab}{' '}
                <span
                  onClick$={() => {
                    if (store.tabs.length > 1) {
                      store.tabs.splice(i, 1);
                    }
                  }}
                >
                  x
                </span>
              </Tabs.Tab>
            ))}
          </Tabs.List>

          {store.tabs.map((tab, i) => {
            return <Tabs.Panel key={i}>{tab} Panel</Tabs.Panel>;
          })}
        </Tabs.Root>
        <button
          class={cn('w-48', buttonVariants({ look: 'outline', size: 'sm' }))}
          onClick$={() => {
            store.tabs.push(`Added Tab`);
          }}
        >
          Add Tab after
        </button>
      </div>
    </>
  );
});

import { buttonVariants } from '@qwik-ui/styled';
import { cn } from '@qwik-ui/utils';
