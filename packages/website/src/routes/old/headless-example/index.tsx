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

    </div>
  );
});

export const head: DocumentHead = {
  title: 'Welcome to Qwik',
};
