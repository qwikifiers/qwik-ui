import { component$, useSignal } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import {
  Collapse,
  Drawer,
  Tab,
  TabPanel,
  Tabs,
  Toggle,
  Tooltip,
} from '@qwik-ui/theme-daisy';

export default component$(() => {
  const tabs = ['Tab 1', 'Tab 2', 'Tab 3'];
  const activeTab = useSignal(0);
  const toggleChecked = useSignal(false);

  return (
    <div>
      <div>
        Hey I am a text and you can &nbsp;
        <Tooltip
          inline={true}
          position="bottom"
          content="Hi this is the message"
        >
          hover on me
          <div q:slot="tooltip-content">Custom thing</div>
        </Tooltip>
      </div>

      <hr />

      <Tooltip content="Hi this is the message">
        <div style="width: 100px; height: 100px; background-color: red;"></div>
        <div q:slot="tooltip-content">Custom thing</div>
      </Tooltip>

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
                key={index}
                onClick$={(clicked: number) => {
                  activeTab.value = clicked;
                }}
                isLifted={false}
                isBordered={true}
              >
                {tab}
              </Tab>
            );
          })}
          {tabs.map((tab, index) => {
            return (
              <TabPanel key={index}>
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

      

      {/* hack to prevent tailwind purge */}
      <div
        style={{ display: 'none' }}
        class={`collapse border border-base-300 rounded-box collapse-arrow collapse-plus 
                collapse-title text-xl font-medium collapse-content max-h-fit tabs tabs-boxed 
                tab tab-active tab-bordered tab-lifted form-control abel cursor-pointer toggle label-text
                drawer
                bg-black
                text-white
                rounded-lg
                p-2
                drawer-toggle
                btn btn-primary drawer-button
                drawer-side
                drawer-overlay
                tooltip
                `}
      />
    </div>
  );
});

export const head: DocumentHead = {
  title: 'Welcome to Qwik',
};
