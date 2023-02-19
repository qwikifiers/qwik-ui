import { component$, useSignal } from '@builder.io/qwik';
import { Tab, TabPanel, Tabs } from '@qwik-ui/theme-daisy';
import { Wrapper } from '../../../../components/wrapper/wrapper';

export default component$(() => {
  const tabs = ['Tab 1', 'Tab 2', 'Tab 3'];
  const activeTab = useSignal(0);
  return (
    <>
      <h2></h2>

      <Wrapper
        title="Tabs"
        subtitle="Daisy"
        description="This is the documentation for the Tabs"
      >
        <div q:slot="preview">
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
                  <TabPanel key={'panel' + index}>
                    <div>
                      {tab} {tab} {tab}
                    </div>
                  </TabPanel>
                );
              })}
            </Tabs>
          </div>
        </div>
        <div q:slot="code">
          <pre>
            {' <Tabs> '} <br />
            {' <Tab '}
            <br />
            {'     key={index} '}
            <br />
            {'     onClick$={(clicked: number) => { '}
            <br />
            {'     activeTab.value = clicked; '}
            <br />
            {' }} '}
            <br />
            {'  isLifted={false} '}
            <br />
            {'  isBordered={true} '}
            <br />
            {'  > '}
            <br />
            {'   {tab} '}
            <br />
            {' </Tab> '}
            <br />
          </pre>
        </div>
      </Wrapper>
    </>
  );
});
