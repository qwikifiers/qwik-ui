import { component$, useSignal } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { Collapse, Tabs, Tab, TabPanel } from '@qwik-ui/daisy';

export default component$(() => {
  const tabs = ['Tab 1', 'Tab 2', 'Tab 3'];
  const activeTab = useSignal(0);

  return (
    <div>
      <div style="width: 300px">
        <Collapse label="Hi Glenn and Gil!" showPlus={true}>
          <div class="text-center">QwikUI 🚀</div>
        </Collapse>
      </div>

      <div style="width: 300px">
        <Tabs>
          {tabs.map((tab, index) => {
            return (
              <Tab
                onClick$={(clicked: number) => {
                  activeTab.value = clicked;
                }}
                isLifted={false}
                isBordered={true}
                isActive={index === activeTab.value}
              >
                {tab}
              </Tab>
            );
          })}
          {tabs.map((tab) => {
            return (
              <TabPanel>
                <div>
                  {tab} {tab} {tab}
                </div>
              </TabPanel>
            );
          })}
        </Tabs>
      </div>

      {/* hack to prevent tailwind purge */}
      <div
        style={{ display: 'none' }}
        class="collapse collapse-title text-xl font-medium collapse-content max-h-fit tabs tabs-boxed tab tab-active tab-bordered tab-lifted"
      />
    </div>
  );
});

export const head: DocumentHead = {
  title: 'Welcome to Qwik',
};
