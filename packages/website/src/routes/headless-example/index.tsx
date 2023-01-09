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
  Select,
  SelectOption,
} from '@qwik-ui/headless';
import styles from './index.css?inline';

export default component$(() => {
  useStyles$(styles);
  return (
    <div>

      <Select>
        {[
          { value: 'option 1', label: 'option one', disabled: false },
          { value: 'option 2', label: 'option two', disabled: false },
          { value: 'option 3', label: 'option three', disabled: true },
        ].map((item) => {
          return (
            <SelectOption
              value={item.value}
              label={item.label}
              disabled={item.disabled}
            />
          );
        })}
      </Select>

      <p style="position: relative;">Hey Shai!</p>

      <Tabs behavior="automatic">
        <h3 id="tablist-1">Danish Composers</h3>
        <TabList>
          <Tab>Maria Ahlefeldt</Tab>
          <Tab>Carl Andersen</Tab>
          <Tab>Ida Henriette da Fonseca</Tab>
        </TabList>
        <TabPanel>
          <p>
            Maria Theresia Ahlefeldt (16 January 1755 – 20 December 1810) was a
            Danish, (originally German), composer. She is known as the first
            female composer in Denmark. Maria Theresia composed music for
            several ballets, operas, and plays of the royal theatre. She was
            given good critic as a composer and described as a “
            <span lang="da">virkelig Tonekunstnerinde</span>” ('a True Artist of
            Music').
          </p>
        </TabPanel>
        <TabPanel>
          <p>
            Carl Joachim Andersen (29 April 1847 – 7 May 1909) was a Danish
            flutist, conductor and composer born in Copenhagen, son of the
            flutist Christian Joachim Andersen. Both as a virtuoso and as
            composer of flute music, he is considered one of the best of his
            time. He was considered to be a tough leader and teacher and
            demanded as such a lot from his orchestras but through that style he
            reached a high level.
          </p>
        </TabPanel>
        <TabPanel>
          <p>
            Ida Henriette da Fonseca (July 27, 1802 – July 6, 1858) was a Danish
            opera singer and composer. Ida Henriette da Fonseca was the daughter
            of Abraham da Fonseca (1776–1849) and Marie Sofie Kiærskou
            (1784–1863). She and her sister Emilie da Fonseca were students of
            Giuseppe Siboni, choir master of the Opera in Copenhagen. She was
            given a place at the royal Opera alongside her sister the same year
            she debuted in 1827.
          </p>
        </TabPanel>
      </Tabs>
      <hr />
      <Tabs behavior="automatic">
        <h3 id="tablist-1">Danish Composers</h3>
        <TabList>
          <Tab>Maria Ahlefeldt</Tab>
          <Tab>Carl Andersen</Tab>
          <Tab>Ida Henriette da Fonseca</Tab>
        </TabList>
        <TabPanel>
          <p>
            Maria Theresia Ahlefeldt (16 January 1755 – 20 December 1810) was a
            Danish, (originally German), composer. She is known as the first
            female composer in Denmark. Maria Theresia composed music for
            several ballets, operas, and plays of the royal theatre. She was
            given good critic as a composer and described as a “
            <span lang="da">virkelig Tonekunstnerinde</span>” ('a True Artist of
            Music').
          </p>
        </TabPanel>
        <TabPanel>
          <p>
            Carl Joachim Andersen (29 April 1847 – 7 May 1909) was a Danish
            flutist, conductor and composer born in Copenhagen, son of the
            flutist Christian Joachim Andersen. Both as a virtuoso and as
            composer of flute music, he is considered one of the best of his
            time. He was considered to be a tough leader and teacher and
            demanded as such a lot from his orchestras but through that style he
            reached a high level.
          </p>
        </TabPanel>
        <TabPanel>
          <p>
            Ida Henriette da Fonseca (July 27, 1802 – July 6, 1858) was a Danish
            opera singer and composer. Ida Henriette da Fonseca was the daughter
            of Abraham da Fonseca (1776–1849) and Marie Sofie Kiærskou
            (1784–1863). She and her sister Emilie da Fonseca were students of
            Giuseppe Siboni, choir master of the Opera in Copenhagen. She was
            given a place at the royal Opera alongside her sister the same year
            she debuted in 1827.
          </p>
        </TabPanel>
      </Tabs>
      <hr />

      <h1>HEYYY</h1>

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
      <Collapse>
        <p q:slot="label">Hello from Collapse</p>
        <p q:slot="content">Collapse content</p>
      </Collapse>
      <hr />
    </div>
  );
});

export const head: DocumentHead = {
  title: 'Welcome to Qwik',
};
