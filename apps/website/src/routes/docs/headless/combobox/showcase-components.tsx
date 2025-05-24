import { component$ } from '@builder.io/qwik';
import { Showcase } from '~/components/showcase/showcase';

import Hero from './examples/hero';
import HeroRawCode from './examples/hero.tsx?raw';
export const ShowcaseHero = component$(() => {
  return (
    <Showcase rawCode={HeroRawCode}>
      <Hero />
    </Showcase>
  );
});

import String from './examples/string';
import StringRawCode from './examples/string.tsx?raw';
export const ShowcaseString = component$(() => {
  return (
    <Showcase rawCode={StringRawCode}>
      <String />
    </Showcase>
  );
});

import Object from './examples/object';
import ObjectRawCode from './examples/object.tsx?raw';
export const ShowcaseObject = component$(() => {
  return (
    <Showcase rawCode={ObjectRawCode}>
      <Object />
    </Showcase>
  );
});

import ItemValue from './examples/item-value';
import ItemValueRawCode from './examples/item-value.tsx?raw';
export const ShowcaseItemValue = component$(() => {
  return (
    <Showcase rawCode={ItemValueRawCode}>
      <ItemValue />
    </Showcase>
  );
});

import Change from './examples/change';
import ChangeRawCode from './examples/change.tsx?raw';
export const ShowcaseChange = component$(() => {
  return (
    <Showcase rawCode={ChangeRawCode}>
      <Change />
    </Showcase>
  );
});

import Initial from './examples/initial';
import InitialRawCode from './examples/initial.tsx?raw';
export const ShowcaseInitial = component$(() => {
  return (
    <Showcase rawCode={InitialRawCode}>
      <Initial />
    </Showcase>
  );
});

import Reactive from './examples/reactive';
import ReactiveRawCode from './examples/reactive.tsx?raw';
export const ShowcaseReactive = component$(() => {
  return (
    <Showcase rawCode={ReactiveRawCode}>
      <Reactive />
    </Showcase>
  );
});

import Programmatic from './examples/programmatic';
import ProgrammaticRawCode from './examples/programmatic.tsx?raw';
export const ShowcaseProgrammatic = component$(() => {
  return (
    <Showcase rawCode={ProgrammaticRawCode}>
      <Programmatic />
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

import AddItems from './examples/add-items';
import AddItemsRawCode from './examples/add-items.tsx?raw';
export const ShowcaseAddItems = component$(() => {
  return (
    <Showcase rawCode={AddItemsRawCode}>
      <AddItems />
    </Showcase>
  );
});

import Indicator from './examples/indicator';
import IndicatorRawCode from './examples/indicator.tsx?raw';
export const ShowcaseIndicator = component$(() => {
  return (
    <Showcase rawCode={IndicatorRawCode}>
      <Indicator />
    </Showcase>
  );
});

import Multiple from './examples/multiple';
import MultipleRawCode from './examples/multiple.tsx?raw';
export const ShowcaseMultiple = component$(() => {
  return (
    <Showcase rawCode={MultipleRawCode}>
      <Multiple />
    </Showcase>
  );
});

import Placeholder from './examples/placeholder';
import PlaceholderRawCode from './examples/placeholder.tsx?raw';
export const ShowcasePlaceholder = component$(() => {
  return (
    <Showcase rawCode={PlaceholderRawCode}>
      <Placeholder />
    </Showcase>
  );
});

import Csr from './examples/csr';
import CsrRawCode from './examples/csr.tsx?raw';
export const ShowcaseCsr = component$(() => {
  return (
    <Showcase rawCode={CsrRawCode}>
      <Csr />
    </Showcase>
  );
});

import Inline from './examples/inline';
import InlineRawCode from './examples/inline.tsx?raw';
export const ShowcaseInline = component$(() => {
  return (
    <Showcase rawCode={InlineRawCode}>
      <Inline />
    </Showcase>
  );
});

import CustomInline from './examples/custom-inline';
import CustomInlineRawCode from './examples/custom-inline.tsx?raw';
export const ShowcaseCustomInline = component$(() => {
  return (
    <Showcase rawCode={CustomInlineRawCode}>
      <CustomInline />
    </Showcase>
  );
});

import Filter from './examples/filter';
import FilterRawCode from './examples/filter.tsx?raw';
export const ShowcaseFilter = component$(() => {
  return (
    <Showcase rawCode={FilterRawCode}>
      <Filter />
    </Showcase>
  );
});

import Empty from './examples/empty';
import EmptyRawCode from './examples/empty.tsx?raw';
export const ShowcaseEmpty = component$(() => {
  return (
    <Showcase rawCode={EmptyRawCode}>
      <Empty />
    </Showcase>
  );
});

import OpenChange from './examples/open-change';
import OpenChangeRawCode from './examples/open-change.tsx?raw';
export const ShowcaseOpenChange = component$(() => {
  return (
    <Showcase rawCode={OpenChangeRawCode}>
      <OpenChange />
    </Showcase>
  );
});

import ReactiveOpen from './examples/reactive-open';
import ReactiveOpenRawCode from './examples/reactive-open.tsx?raw';
export const ShowcaseReactiveOpen = component$(() => {
  return (
    <Showcase rawCode={ReactiveOpenRawCode}>
      <ReactiveOpen />
    </Showcase>
  );
});

import Input from './examples/input';
import InputRawCode from './examples/input.tsx?raw';
export const ShowcaseInput = component$(() => {
  return (
    <Showcase rawCode={InputRawCode}>
      <Input />
    </Showcase>
  );
});

import ReactiveInput from './examples/reactive-input';
import ReactiveInputRawCode from './examples/reactive-input.tsx?raw';
export const ShowcaseReactiveInput = component$(() => {
  return (
    <Showcase rawCode={ReactiveInputRawCode}>
      <ReactiveInput />
    </Showcase>
  );
});

import Loop from './examples/loop';
import LoopRawCode from './examples/loop.tsx?raw';
export const ShowcaseLoop = component$(() => {
  return (
    <Showcase rawCode={LoopRawCode}>
      <Loop />
    </Showcase>
  );
});

import Group from './examples/group';
import GroupRawCode from './examples/group.tsx?raw';
export const ShowcaseGroup = component$(() => {
  return (
    <Showcase rawCode={GroupRawCode}>
      <Group />
    </Showcase>
  );
});

import Scrollable from './examples/scrollable';
import ScrollableRawCode from './examples/scrollable.tsx?raw';
export const ShowcaseScrollable = component$(() => {
  return (
    <Showcase rawCode={ScrollableRawCode}>
      <Scrollable />
    </Showcase>
  );
});

import Refs from './examples/refs';
import RefsRawCode from './examples/refs.tsx?raw';
export const ShowcaseRefs = component$(() => {
  return (
    <Showcase rawCode={RefsRawCode}>
      <Refs />
    </Showcase>
  );
});

import Form from './examples/form';
import FormRawCode from './examples/form.tsx?raw';
export const ShowcaseForm = component$(() => {
  return (
    <Showcase rawCode={FormRawCode}>
      <Form />
    </Showcase>
  );
});

import Validation from './examples/validation';
import ValidationRawCode from './examples/validation.tsx?raw';
export const ShowcaseValidation = component$(() => {
  return (
    <Showcase rawCode={ValidationRawCode}>
      <Validation />
    </Showcase>
  );
});
