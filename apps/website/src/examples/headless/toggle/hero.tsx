import { component$, type JSXNode } from '@builder.io/qwik';

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

export default component$(({ example }: ShowExampleProps) => {
  const { component, cssClasses = '' } = examples[example];
  return (
    <>
      <div class={['tabs-example mr-auto', cssClasses]}>{component}</div>
    </>
  );
});
