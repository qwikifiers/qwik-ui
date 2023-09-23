import {
  component$,
  QwikIntrinsicElements,
  Slot,
  useSignal,
  useStore,
  useStyles$,
} from '@builder.io/qwik';
import { Tab, TabList, TabPanel, Tabs } from '@qwik-ui/headless';
import { PreviewCodeExample } from '../../../_components/preview-code-example/preview-code-example';
import { Example01 as Example1 } from './example';
// import example1Code from './example?raw';
import styles from './index.css?inline';

// import hljs from 'highlight.js/lib/core';
// import css from 'highlight.js/lib/languages/css';
// import javascript from 'highlight.js/lib/languages/javascript';
// import typescript from 'highlight.js/lib/languages/typescript';
// import xml from 'highlight.js/lib/languages/xml';
// import 'highlight.js/styles/atom-one-dark.css';
import type { OmitSignalClass } from '@qwik-ui/type-utils';
// hljs.registerLanguage('javascript', javascript);
// hljs.registerLanguage('typescript', typescript);
// hljs.registerLanguage('xml', xml);
// hljs.registerLanguage('css', css);

export const Highlight = ({
  code,
  ...props
}: OmitSignalClass<QwikIntrinsicElements['pre']> & { code: string }) => (
  <pre
    {...props}
    class={[
      'theme-atom-one-dark shadow-3xl tab-size relative h-full max-w-full overflow-hidden text-sm',
      props.class,
    ]}
  >
    {/* <code
      dangerouslySetInnerHTML={hljs.highlight(code, { language: 'typescript' }).value}
    /> */}
  </pre>
);

export const Example01 = component$(() => {
  // console.log('example1Code', example1Code);
  useStyles$(styles);

  return (
    <PreviewCodeExample>
      <div q:slot="actualComponent" class="tabs-example">
        <Example1 />
      </div>

      {/* <Highlight q:slot="codeExample" code={example1Code} /> */}
    </PreviewCodeExample>
  );
});

export const VerticalTabsExample = component$(() => {
  return (
    <PreviewCodeExample>
      <div q:slot="actualComponent" class="tabs-example mr-auto">
        <h3>Danish Composers</h3>

        <Tabs vertical class="flex flex-wrap gap-5">
          <TabList class="flex w-fit flex-col">
            <Tab>Maria Ahlefeldt</Tab>
            <Tab>Carl Andersen</Tab>
            <Tab>Ida Henriette da Fonseca</Tab>
          </TabList>
          <TabPanel>
            <p>Maria Theresia Ahlefeldt (16 January 1755 - 20 December 1810) was a ...</p>
          </TabPanel>
          <TabPanel>
            <p>Carl Joachim Andersen (29 April 1847 - 7 May 1909) was a ...</p>
          </TabPanel>
          <TabPanel>
            <p>Ida Henriette da Fonseca (July 27, 1802 - July 6, 1858) was a ...</p>
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
      <div q:slot="actualComponent" class="tabs-example mr-auto w-full">
        <h3>Dad jokes</h3>
        <Tabs>
          <TabList>
            <Tab
              class="aria-disabled:cursor-not-allowed"
              style="width: 25%"
              disabled={true}
            >
              Disabled Tab
            </Tab>
            <Tab style="width: 25%">Joke 2</Tab>
            <Tab style="width: 25%">Joke 3</Tab>
            <Tab style="width: 25%">Joke 4</Tab>
          </TabList>
          <TabPanel>"What did the coffee report to the police", " A mugging."</TabPanel>
          <TabPanel>"What's brown and sticky", " A stick."</TabPanel>
          <TabPanel>"How do the trees get on the internet?", "They log on."</TabPanel>
          <TabPanel>"What did the fish say when he hit the wall", " Dam."</TabPanel>
        </Tabs>
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
        <h3>Danish Composers</h3>
        <h4 class="text-white">(Hover over the tabs)</h4>
        <Tabs behavior="automatic">
          <TabList>
            <Tab>Maria Ahlefeldt</Tab>
            <Tab>Carl Andersen</Tab>
            <Tab>Ida Henriette da Fonseca</Tab>
          </TabList>
          <TabPanel>
            <p>Maria Theresia Ahlefeldt (16 January 1755 - 20 December 1810) was a ...</p>
          </TabPanel>
          <TabPanel>
            <p>Carl Joachim Andersen (29 April 1847 - 7 May 1909) was a ...</p>
          </TabPanel>
          <TabPanel>
            <p>Ida Henriette da Fonseca (July 27, 1802 - July 6, 1858) was a ...</p>
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
        <Tabs behavior="manual">
          <h3>Danish Composers</h3>
          <h4>(Hover over the tabs - they should not be selected)</h4>
          <TabList>
            <Tab>Maria Ahlefeldt</Tab>
            <Tab>Carl Andersen</Tab>
            <Tab>Ida Henriette da Fonseca</Tab>
          </TabList>
          <TabPanel>
            <p>Maria Theresia Ahlefeldt (16 January 1755 - 20 December 1810) was a ...</p>
          </TabPanel>
          <TabPanel>
            <p>Carl Joachim Andersen (29 April 1847 - 7 May 1909) was a ...</p>
          </TabPanel>
          <TabPanel>
            <p>Ida Henriette da Fonseca (July 27, 1802 - July 6, 1858) was a ...</p>
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
  const tabsState = useStore(['Dynamic Tab 1', 'Dynamic Tab 2', 'Dynamic Tab 3']);

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
          class="mt-4 font-bold text-red-600"
          onClick$={() => {
            if (tabsState.length > 1) {
              tabsState.splice(0, 1);
            }
          }}
        >
          Remove First Tab
        </button>
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
          onSelectedIndexChange$={(index: number) => {
            selectedIndexSig.value = index;
          }}
        >
          <h3>Danish Composers</h3>
          <TabList>
            <Tab>Maria Ahlefeldt</Tab>
            <Tab>Carl Andersen</Tab>
            <Tab>Ida Henriette da Fonseca</Tab>
          </TabList>
          <TabPanel>
            <p>Maria Theresia Ahlefeldt (16 January 1755 - 20 December 1810) was a ...</p>
          </TabPanel>
          <TabPanel>
            <p>Carl Joachim Andersen (29 April 1847 - 7 May 1909) was a ...</p>
          </TabPanel>
          <TabPanel>
            <p>Ida Henriette da Fonseca (July 27, 1802 - July 6, 1858) was a ...</p>
          </TabPanel>
        </Tabs>

        <p class="mt-4 text-white">Selected Index: {selectedIndexSig.value}</p>
      </div>

      <div q:slot="codeExample">
        <Slot />
      </div>
    </PreviewCodeExample>
  );
});

export const SelectedTabIdExample = component$(() => {
  const selectedTabIdSig = useSignal<string | undefined>();

  return (
    <PreviewCodeExample>
      <div q:slot="actualComponent" class="tabs-example mr-auto">
        <Tabs bind:selectedTabId={selectedTabIdSig}>
          <h3>Danish Composers</h3>
          <TabList>
            <Tab tabId="Maria">Maria Ahlefeldt</Tab>
            <Tab tabId="Carl">Carl Andersen</Tab>
            <Tab tabId="Ida">Ida Henriette da Fonseca</Tab>
          </TabList>
          <TabPanel>
            <p>Maria Theresia Ahlefeldt (16 January 1755 - 20 December 1810) was a ...</p>
          </TabPanel>
          <TabPanel>
            <p>Carl Joachim Andersen (29 April 1847 - 7 May 1909) was a ...</p>
          </TabPanel>
          <TabPanel>
            <p>Ida Henriette da Fonseca (July 27, 1802 - July 6, 1858) was a ...</p>
          </TabPanel>
        </Tabs>
        <p class="mt-4 text-white">
          <strong>Selected Tab Id</strong>: {selectedTabIdSig.value}
        </p>
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
        <h3>Danish Composers</h3>
        <h4 class="mt-4 text-white">(watch the counter below)</h4>
        <Tabs
          onClick$={() => {
            tabsClickedCountSig.value++;
          }}
        >
          <TabList>
            <Tab>Maria Ahlefeldt</Tab>
            <Tab>Carl Andersen</Tab>
            <Tab>Ida Henriette da Fonseca</Tab>
          </TabList>
          <TabPanel>
            <p>Maria Theresia Ahlefeldt (16 January 1755 - 20 December 1810) was a ...</p>
          </TabPanel>
          <TabPanel>
            <p>Carl Joachim Andersen (29 April 1847 - 7 May 1909) was a ...</p>
          </TabPanel>
          <TabPanel>
            <p>Ida Henriette da Fonseca (July 27, 1802 - July 6, 1858) was a ...</p>
          </TabPanel>
        </Tabs>

        <p class="mt-4 text-white">Click count: {tabsClickedCountSig.value}</p>
      </div>

      <div q:slot="codeExample">
        <Slot />
      </div>
    </PreviewCodeExample>
  );
});

export const SelectedPropExample = component$(() => {
  return (
    <PreviewCodeExample>
      <div q:slot="actualComponent" class="tabs-example mr-auto">
        <h3>Danish Composers</h3>

        <Tabs>
          <TabList>
            <Tab>Maria Ahlefeldt</Tab>
            <Tab selected>Carl Andersen</Tab>
            <Tab>Ida Henriette da Fonseca</Tab>
          </TabList>
          <TabPanel>
            <p>Maria Theresia Ahlefeldt (16 January 1755 - 20 December 1810) was a ...</p>
          </TabPanel>
          <TabPanel>
            <p>Carl Joachim Andersen (29 April 1847 - 7 May 1909) was a ...</p>
          </TabPanel>
          <TabPanel>
            <p>Ida Henriette da Fonseca (July 27, 1802 - July 6, 1858) was a ...</p>
          </TabPanel>
        </Tabs>
      </div>

      <div q:slot="codeExample">
        <Slot />
      </div>
    </PreviewCodeExample>
  );
});
