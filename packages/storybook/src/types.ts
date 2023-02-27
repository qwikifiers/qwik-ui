import { Component } from '@builder.io/qwik';

import type { ViteFinal } from '@storybook/builder-vite';
export type { Args, ArgTypes, Parameters, StrictArgs } from '@storybook/types';
import type {
  AnnotatedStoryFn,
  Args,
  ComponentAnnotations,
  StoryAnnotations,
  DecoratorFunction,
  LoaderFunction,
  StoryContext as GenericStoryContext,
  StrictArgs,
  StorybookConfig as StorybookConfigBase,
  WebRenderer,
} from '@storybook/types';

export interface QwikRenderer<T> extends WebRenderer {
  component: Component<T>;
  storyResult: ReturnType<Component<T>>;
}

/**
 * Metadata to configure the stories for a component.
 *
 * @see [Default export](https://storybook.js.org/docs/formats/component-story-format/#default-export)
 */
export type Meta<TArgs = Args> = ComponentAnnotations<
  QwikRenderer<TArgs>,
  TArgs
>;

/**
 * Story function that represents a CSFv2 component example.
 *
 * @see [Named Story exports](https://storybook.js.org/docs/formats/component-story-format/#named-story-exports)
 */
export type StoryFn<TArgs = Args> = AnnotatedStoryFn<
  QwikRenderer<TArgs>,
  TArgs
>;

/**
 * Story function that represents a CSFv3 component example.
 *
 * @see [Named Story exports](https://storybook.js.org/docs/formats/component-story-format/#named-story-exports)
 */
export type StoryObj<TArgs = Args> = StoryAnnotations<
  QwikRenderer<TArgs>,
  TArgs
>;

export type Decorator<TArgs = StrictArgs> = DecoratorFunction<
  QwikRenderer<TArgs>,
  TArgs
>;
export type Loader<TArgs = StrictArgs> = LoaderFunction<
  QwikRenderer<TArgs>,
  TArgs
>;
export type StoryContext<TArgs = StrictArgs> = GenericStoryContext<
  QwikRenderer<TArgs>,
  TArgs
>;

export type StorybookConfig = Omit<StorybookConfigBase, 'framework'> & {
  framework: '@qwik-ui/storybook' | { name: '@qwik-ui/storybook' };
  viteFinal: ViteFinal;
};
