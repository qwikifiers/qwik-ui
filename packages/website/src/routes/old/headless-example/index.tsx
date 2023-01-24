import { component$, useStyles$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import {
  Collapse,
  Drawer,
  DrawerContent,
  DrawerTrigger,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  Tooltip,
} from '@qwik-ui/headless';
import styles from './index.css?inline';

export default component$(() => {
  useStyles$(styles);
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

      <Drawer class="drawer">
        <DrawerTrigger>
          <input id="my-drawer" type="checkbox" class="drawer-toggle" />
          <div class="drawer-content">
            <label for="my-drawer" class="btn btn-primary drawer-button">
              Open drawer
            </label>
          </div>
        </DrawerTrigger>
        <DrawerContent class="drawer-side">
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
        </DrawerContent>
      </Drawer>

      <hr />
      
      <hr />
    </div>
  );
});

export const head: DocumentHead = {
  title: 'Welcome to Qwik',
};
