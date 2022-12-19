import { component$, useSignal } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { Collapse, Drawer, Tab, TabPanel, Tabs, Toggle } from '@qwik-ui/daisy';

export default component$(() => {
  const tabs = ['Tab 1', 'Tab 2', 'Tab 3'];
  const activeTab = useSignal(0);
  const toggleChecked = useSignal(false);

  return (
    <div>
      <div style="width: 300px">
        <Collapse showArrow={true}>
          <label q:slot="label">Hi Glenn and Gil!</label>
          <div class="text-center" q:slot="content">
            QwikUI 🚀
          </div>
        </Collapse>
      </div>

      <hr class="my-5" />

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

      <hr class="my-5" />

      <div>
        <Toggle
          checked={toggleChecked.value}
          onClick$={() => {
            toggleChecked.value = !toggleChecked.value;
          }}
        />
      </div>

      <hr class="my-5" />

      <div>
        <Drawer label="Open">
          <div q:slot="drawerContent">Drawer Content</div>
        </Drawer>
      </div>

      {/* hack to prevent tailwind purge */}
      <div
        style={{ display: 'none' }}
        class="collapse border border-base-300 rounded-box collapse-arrow collapse-plus collapse-title text-xl font-medium collapse-content max-h-fit tabs tabs-boxed tab tab-active tab-bordered tab-lifted form-control abel cursor-pointer toggle label-text"
      />
    </div>
  );
});

export const head: DocumentHead = {
  title: 'Welcome to Qwik',
};
