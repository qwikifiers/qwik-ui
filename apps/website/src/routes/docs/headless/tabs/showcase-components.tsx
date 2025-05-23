import { component$ } from '@builder.io/qwik';
import { Showcase } from '~/components/showcase/showcase';

import First from './examples/first';
import FirstRawCode from './examples/first.tsx?raw';
export const ShowcaseFirst = component$(() => {
  return (
    <Showcase rawCode={FirstRawCode}>
      <First />
    </Showcase>
  );
});

import Vertical from './examples/vertical';
import VerticalRawCode from './examples/vertical.tsx?raw';
export const ShowcaseVertical = component$(() => {
  return (
    <Showcase rawCode={VerticalRawCode}>
      <Vertical />
    </Showcase>
  );
});

import Disabled from './examples/disabled';
import DisabledRawCode from './examples/disabled.tsx?raw';
export const ShowcaseDisabled = component$(() => {
  return (
    <Showcase rawCode={DisabledRawCode}>
      <Disabled />
    </Showcase>
  );
});

import Automatic from './examples/automatic';
import AutomaticRawCode from './examples/automatic.tsx?raw';
export const ShowcaseAutomatic = component$(() => {
  return (
    <Showcase rawCode={AutomaticRawCode}>
      <Automatic />
    </Showcase>
  );
});

import Manual from './examples/manual';
import ManualRawCode from './examples/manual.tsx?raw';
export const ShowcaseManual = component$(() => {
  return (
    <Showcase rawCode={ManualRawCode}>
      <Manual />
    </Showcase>
  );
});

import Dynamic from './examples/dynamic';
import DynamicRawCode from './examples/dynamic.tsx?raw';
export const ShowcaseDynamic = component$(() => {
  return (
    <Showcase rawCode={DynamicRawCode}>
      <Dynamic />
    </Showcase>
  );
});

import OnSelectedIndexChange from './examples/on-selected-index-change';
import OnSelectedIndexChangeRawCode from './examples/on-selected-index-change.tsx?raw';
export const ShowcaseOnSelectedIndexChange = component$(() => {
  return (
    <Showcase rawCode={OnSelectedIndexChangeRawCode}>
      <OnSelectedIndexChange />
    </Showcase>
  );
});

import SelectedTabId from './examples/selected-tab-id';
import SelectedTabIdRawCode from './examples/selected-tab-id.tsx?raw';
export const ShowcaseSelectedTabId = component$(() => {
  return (
    <Showcase rawCode={SelectedTabIdRawCode}>
      <SelectedTabId />
    </Showcase>
  );
});

import SelectedProp from './examples/selected-prop';
import SelectedPropRawCode from './examples/selected-prop.tsx?raw';
export const ShowcaseSelectedProp = component$(() => {
  return (
    <Showcase rawCode={SelectedPropRawCode}>
      <SelectedProp />
    </Showcase>
  );
});

import OnClick from './examples/on-click';
import OnClickRawCode from './examples/on-click.tsx?raw';
export const ShowcaseOnClick = component$(() => {
  return (
    <Showcase rawCode={OnClickRawCode}>
      <OnClick />
    </Showcase>
  );
});

import Reusable from './examples/reusable';
import ReusableRawCode from './examples/reusable.tsx?raw';
export const ShowcaseReusable = component$(() => {
  return (
    <Showcase rawCode={ReusableRawCode}>
      <Reusable />
    </Showcase>
  );
});
