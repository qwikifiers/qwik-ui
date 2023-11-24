import { component$, type JSXNode } from '@builder.io/qwik';
import { PreviewCodeExampleTabs } from '~/components/preview-code-example/preview-code-example-tabs';

// import styles from './index.css?inline';

export type Example = {
  component: JSXNode;
  code: string;
  cssClasses?: string;
};

export const examples: Record<string, Example> = {};

export type ShowExampleProps = {
  example: string;
};

export const ShowExample = component$(({ example }: ShowExampleProps) => {
  const { component, code, cssClasses = '' } = examples[example];
  return (
    <PreviewCodeExampleTabs code={code}>
      <div q:slot="actualComponent" class={['tabs-example mr-auto', cssClasses]}>
        {component}
      </div>
    </PreviewCodeExampleTabs>
  );
});
