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

import ChangeValue from './examples/change-value';
import ChangeValueRawCode from './examples/change-value.tsx?raw';
export const ShowcaseChangeValue = component$(() => {
  return (
    <Showcase rawCode={ChangeValueRawCode}>
      <ChangeValue />
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

import Description from './examples/description';
import DescriptionRawCode from './examples/description.tsx?raw';
export const ShowcaseDescription = component$(() => {
  return (
    <Showcase rawCode={DescriptionRawCode}>
      <Description />
    </Showcase>
  );
});

import Uncontrolled from './examples/uncontrolled';
import UncontrolledRawCode from './examples/uncontrolled.tsx?raw';
export const ShowcaseUncontrolled = component$(() => {
  return (
    <Showcase rawCode={UncontrolledRawCode}>
      <Uncontrolled />
    </Showcase>
  );
});

import Controlled from './examples/controlled';
import ControlledRawCode from './examples/controlled.tsx?raw';
export const ShowcaseControlled = component$(() => {
  return (
    <Showcase rawCode={ControlledRawCode}>
      <Controlled />
    </Showcase>
  );
});

import BindOpen from './examples/bind-open';
import BindOpenRawCode from './examples/bind-open.tsx?raw';
export const ShowcaseBindOpen = component$(() => {
  return (
    <Showcase rawCode={BindOpenRawCode}>
      <BindOpen />
    </Showcase>
  );
});

import ControlledValue from './examples/controlled-value';
import ControlledValueRawCode from './examples/controlled-value.tsx?raw';
export const ShowcaseControlledValue = component$(() => {
  return (
    <Showcase rawCode={ControlledValueRawCode}>
      <ControlledValue />
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

import AddUsers from './examples/add-users';
import AddUsersRawCode from './examples/add-users.tsx?raw';
export const ShowcaseAddUsers = component$(() => {
  return (
    <Showcase rawCode={AddUsersRawCode}>
      <AddUsers />
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

import MultiplePill from './examples/multiple-pill';
import MultiplePillRawCode from './examples/multiple-pill.tsx?raw';
export const ShowcaseMultiplePill = component$(() => {
  return (
    <Showcase rawCode={MultiplePillRawCode}>
      <MultiplePill />
    </Showcase>
  );
});

import Typeahead from './examples/typeahead';
import TypeaheadRawCode from './examples/typeahead.tsx?raw';
export const ShowcaseTypeahead = component$(() => {
  return (
    <Showcase rawCode={TypeaheadRawCode}>
      <Typeahead />
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

import Csr from './examples/csr';
import CsrRawCode from './examples/csr.tsx?raw';
export const ShowcaseCsr = component$(() => {
  return (
    <Showcase rawCode={CsrRawCode}>
      <Csr />
    </Showcase>
  );
});

import FirstValueSelected from './examples/first-value-selected';
import FirstValueSelectedRawCode from './examples/first-value-selected.tsx?raw';
export const ShowcaseFirstValueSelected = component$(() => {
  return (
    <Showcase rawCode={FirstValueSelectedRawCode}>
      <FirstValueSelected />
    </Showcase>
  );
});
