import { component$, useStyles$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { headless } from '@qwik-ui/core';
import styles from './index.css?inline';

export const { Tabs, TabList, Tab, TabPanel } = headless;

export default component$(() => {
  useStyles$(styles);
  return (
    <div>
      <Tabs>
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
    </div>
  );
});

export const head: DocumentHead = {
  title: 'Welcome to Qwik',
};
