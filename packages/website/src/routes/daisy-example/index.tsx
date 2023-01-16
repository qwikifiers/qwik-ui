import { component$, useSignal } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import {
  Collapse,
  Drawer,
  Tab,
  TabPanel,
  Tabs,
  Toggle,
  Select,
} from '@qwik-ui/daisy';

export default component$(() => {
  const tabs = ['Tab 1', 'Tab 2', 'Tab 3'];
  const toggleChecked = useSignal(false);

  return (
    <div>
      <Select
        placeholder="Select me"
        options={[
          { value: 'option 1', label: 'option one', disabled: false },
          { value: 'option 2', label: 'option two', disabled: false },
          { value: 'option 3', label: 'option three', disabled: true },
        ]}
      />

      <hr className="my-5" />

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
          {tabs.map((tab) => {
            return (
              <Tab isLifted={false} isBordered={true}>
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

      <Drawer drawerId="my-drawer" label="Open it pls!">
        <label for="my-drawer" class="drawer-overlay"></label>
        <ul class="menu p-4 w-80 bg-base-100 text-base-content">
          <li>
            <a href="/" target="_blank">
              Homepage
            </a>
          </li>
          <li>
            <a href="https://github.com/qwikifiers/qwik-ui" target="_blank">
              QwikUI
            </a>
          </li>
          <li>
            <a href="https://qwik.builder.io/" target="_blank">
              Qwik
            </a>
          </li>
        </ul>
      </Drawer>

      {/* hack to prevent tailwind purge */}
      <div
        style={{ display: 'none' }}
        class={`select
                collapse border border-base-300 rounded-box collapse-arrow collapse-plus
                collapse-title text-xl font-medium collapse-content max-h-fit tabs tabs-boxed
                tab tab-active tab-bordered tab-lifted form-control abel cursor-pointer toggle label-text
                drawer
                drawer-toggle
                btn btn-primary drawer-button
                drawer-side
                drawer-overlay
                w-full
                max-w-xs
                dropdown
                dropdown-content
                menu
                p-2 shadow bg-base-100 rounded-box w-52
                `}
      />
    </div>
  );
});

export const head: DocumentHead = {
  title: 'Welcome to Qwik',
};
