import {
  component$,
  Slot,
  useSignal,
  useStore,
  useStyles$,
} from '@builder.io/qwik';
import { Tab, TabList, TabPanel, Tabs } from '@qwik-ui/headless';
import { PreviewCodeExample } from '../../../../../components/preview-code-example/preview-code-example';
import styles from './index.css?inline';

export const Example01 = component$(() => {
  useStyles$(styles);

  return (
    <PreviewCodeExample>
      <div q:slot="actualComponent" class="tabs-example">
        <Tabs behavior="automatic">
          <h3 id="tablist-1">Danish Composers</h3>
          <TabList>
            <Tab>Maria Ahlefeldt</Tab>
            <Tab>Carl Andersen</Tab>
            <Tab>Ida Henriette da Fonseca</Tab>
          </TabList>
          <TabPanel>
            <p>
              Maria Theresia Ahlefeldt (16 January 1755 - 20 December 1810) was
              a ...
            </p>
          </TabPanel>
          <TabPanel>
            <p>Carl Joachim Andersen (29 April 1847 - 7 May 1909) was a ...</p>
          </TabPanel>
          <TabPanel>
            <p>
              Ida Henriette da Fonseca (July 27, 1802 - July 6, 1858) was a ...
            </p>
          </TabPanel>
        </Tabs>
      </div>

      <div q:slot="codeExample">
        <Slot />
      </div>
    </PreviewCodeExample>
  );
});

export const VerticalTabsExample = component$(() => {
  return (
    <PreviewCodeExample>
      <div q:slot="actualComponent" class="tabs-example mr-auto">
        <Tabs vertical>
          <h3 id="tablist-1">Danish Composers</h3>
          <TabList class="flex flex-col w-fit">
            <Tab>Maria Ahlefeldt</Tab>
            <Tab>Carl Andersen</Tab>
            <Tab>Ida Henriette da Fonseca</Tab>
          </TabList>
          <TabPanel>
            <p>
              Maria Theresia Ahlefeldt (16 January 1755 - 20 December 1810) was
              a ...
            </p>
          </TabPanel>
          <TabPanel>
            <p>Carl Joachim Andersen (29 April 1847 - 7 May 1909) was a ...</p>
          </TabPanel>
          <TabPanel>
            <p>
              Ida Henriette da Fonseca (July 27, 1802 - July 6, 1858) was a ...
            </p>
          </TabPanel>
        </Tabs>
      </div>

      <div q:slot="codeExample">
        <Slot />
      </div>
    </PreviewCodeExample>
  );
});

export const DisabledTabsExample = component$(() => {
  return (
    <PreviewCodeExample>
      <div q:slot="actualComponent" class="tabs-example mr-auto">
        <Tabs>
          <h3 id="tablist-1">Danish Composers</h3>
          <TabList>
            <Tab disabled={true}>I'm a disabled tab</Tab>
            <Tab>Carl Andersen</Tab>
            <Tab>Ida Henriette da Fonseca</Tab>
          </TabList>
          <TabPanel>
            <p>
              Maria Theresia Ahlefeldt (16 January 1755 - 20 December 1810) was
              a ...
            </p>
          </TabPanel>
          <TabPanel>
            <p>Carl Joachim Andersen (29 April 1847 - 7 May 1909) was a ...</p>
          </TabPanel>
          <TabPanel>
            <p>
              Ida Henriette da Fonseca (July 27, 1802 - July 6, 1858) was a ...
            </p>
          </TabPanel>
        </Tabs>
      </div>

      <div q:slot="codeExample">
        <Slot />
      </div>
    </PreviewCodeExample>
  );
});

export const DynamicTabsExample = component$(() => {
  const tabsState = useStore([
    'Dynamic Tab 1',
    'Dynamic Tab 2',
    'Dynamic Tab 3',
  ]);

  return (
    <PreviewCodeExample>
      <div q:slot="actualComponent" class="tabs-example mr-auto">
        <Tabs>
          <TabList>
            {tabsState.map((tab) => (
              <Tab key={tab}>{tab}</Tab>
            ))}
          </TabList>
          {tabsState.map((tab) => (
            <TabPanel key={tab}>{tab} Panel</TabPanel>
          ))}
        </Tabs>
        <button
          style={{ color: 'red' }}
          onClick$={() => tabsState.splice(0, 1)}
        >
          Remove Tab
        </button>
      </div>

      <div q:slot="codeExample">
        <Slot />
      </div>
    </PreviewCodeExample>
  );
});

export const AutomaticBehaviorTabsExample = component$(() => {
  return (
    <PreviewCodeExample>
      <div q:slot="actualComponent" class="tabs-example mr-auto">
        <Tabs behavior="automatic">
          <h3 id="tablist-1">Danish Composers</h3>
          <TabList>
            <Tab>Maria Ahlefeldt</Tab>
            <Tab>Carl Andersen</Tab>
            <Tab>Ida Henriette da Fonseca</Tab>
          </TabList>
          <TabPanel>
            <p>
              Maria Theresia Ahlefeldt (16 January 1755 - 20 December 1810) was
              a ...
            </p>
          </TabPanel>
          <TabPanel>
            <p>Carl Joachim Andersen (29 April 1847 - 7 May 1909) was a ...</p>
          </TabPanel>
          <TabPanel>
            <p>
              Ida Henriette da Fonseca (July 27, 1802 - July 6, 1858) was a ...
            </p>
          </TabPanel>
        </Tabs>
      </div>

      <div q:slot="codeExample">
        <Slot />
      </div>
    </PreviewCodeExample>
  );
});

export const ManualBehaviorTabsExample = component$(() => {
  return (
    <PreviewCodeExample>
      <div q:slot="actualComponent" class="tabs-example mr-auto">
        <Tabs behavior="automatic">
          <h3 id="tablist-1">Danish Composers</h3>
          <TabList>
            <Tab>Maria Ahlefeldt</Tab>
            <Tab>Carl Andersen</Tab>
            <Tab>Ida Henriette da Fonseca</Tab>
          </TabList>
          <TabPanel>
            <p>
              Maria Theresia Ahlefeldt (16 January 1755 - 20 December 1810) was
              a ...
            </p>
          </TabPanel>
          <TabPanel>
            <p>Carl Joachim Andersen (29 April 1847 - 7 May 1909) was a ...</p>
          </TabPanel>
          <TabPanel>
            <p>
              Ida Henriette da Fonseca (July 27, 1802 - July 6, 1858) was a ...
            </p>
          </TabPanel>
        </Tabs>
      </div>

      <div q:slot="codeExample">
        <Slot />
      </div>
    </PreviewCodeExample>
  );
});

export const OnSelectedIndexChangeTabsExample = component$(() => {
  const selectedIndexSig = useSignal(0);

  return (
    <PreviewCodeExample>
      <div q:slot="actualComponent" class="tabs-example mr-auto">
        <Tabs
          selectedIndex={selectedIndexSig.value}
          onSelectedIndexChange$={(e) => {
            selectedIndexSig.value = e;
          }}
        >
          <h3 id="tablist-1">Danish Composers</h3>
          <TabList>
            <Tab>Maria Ahlefeldt</Tab>
            <Tab>Carl Andersen</Tab>
            <Tab>Ida Henriette da Fonseca</Tab>
          </TabList>
          <TabPanel>
            <p>
              Maria Theresia Ahlefeldt (16 January 1755 - 20 December 1810) was
              a ...
            </p>
          </TabPanel>
          <TabPanel>
            <p>Carl Joachim Andersen (29 April 1847 - 7 May 1909) was a ...</p>
          </TabPanel>
          <TabPanel>
            <p>
              Ida Henriette da Fonseca (July 27, 1802 - July 6, 1858) was a ...
            </p>
          </TabPanel>
        </Tabs>

        <p>Selected Index: {selectedIndexSig.value}</p>
      </div>

      <div q:slot="codeExample">
        <Slot />
      </div>
    </PreviewCodeExample>
  );
});

export const OnClickTabsExample = component$(() => {
  const tabsClickedCountSig = useSignal(0);

  return (
    <PreviewCodeExample>
      <div q:slot="actualComponent" class="tabs-example mr-auto">
        <Tabs
          onClick$={() => {
            tabsClickedCountSig.value++;
          }}
        >
          <h3 id="tablist-1">Danish Composers</h3>
          <TabList>
            <Tab>Maria Ahlefeldt</Tab>
            <Tab>Carl Andersen</Tab>
            <Tab>Ida Henriette da Fonseca</Tab>
          </TabList>
          <TabPanel>
            <p>
              Maria Theresia Ahlefeldt (16 January 1755 - 20 December 1810) was
              a ...
            </p>
          </TabPanel>
          <TabPanel>
            <p>Carl Joachim Andersen (29 April 1847 - 7 May 1909) was a ...</p>
          </TabPanel>
          <TabPanel>
            <p>
              Ida Henriette da Fonseca (July 27, 1802 - July 6, 1858) was a ...
            </p>
          </TabPanel>
        </Tabs>

        <p>Click count: {tabsClickedCountSig.value}</p>
      </div>

      <div q:slot="codeExample">
        <Slot />
      </div>
    </PreviewCodeExample>
  );
});
