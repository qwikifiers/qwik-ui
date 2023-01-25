import { component$, Slot, useSignal, useStylesScoped$ } from '@builder.io/qwik';
import { Tab, TabPanel, Tabs } from '@qwik-ui/theme-daisy';
import styles from './wrapper.css?inline';

export interface WrapperProps {
  title?: string;
  subtitle?: string;
  description?: string;
}

export const Wrapper = component$(
  ({ title, subtitle, description }: WrapperProps) => {
  useStylesScoped$(styles);

  const options = ['Preview', 'Code'];
  const activeTab = useSignal(0);
  return (
    <>
      <h1>{ title } <small>{subtitle}</small></h1>
      <p class="description">{description}</p>
      <div class="section-wrapper">
        <Tabs class="section-content">
         <div class="section-header">
            {options.map((option, index)  => {
              return (
                  <Tab
                    key={index}
                    onClick$={(clicked: number) => {
                      activeTab.value = clicked;
                    }}
                    >
                    { option }
                  </Tab>
              )
            })}
          </div>
          <div class="section-content">
            <TabPanel key={'panel'}>
              <Slot name="preview" />
            </TabPanel>
            <TabPanel key={'panel1'}>
              <Slot name="code" />
            </TabPanel>
          </div>
        </Tabs>
      </div>
      </>
    );
  });
