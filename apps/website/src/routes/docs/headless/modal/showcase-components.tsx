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

import AutoFocus from './examples/auto-focus';
import AutoFocusRawCode from './examples/auto-focus.tsx?raw';
export const ShowcaseAutoFocus = component$(() => {
  return (
    <Showcase rawCode={AutoFocusRawCode}>
      <AutoFocus />
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

import Backdrop from './examples/backdrop';
import BackdropRawCode from './examples/backdrop.tsx?raw';
export const ShowcaseBackdrop = component$(() => {
  return (
    <Showcase rawCode={BackdropRawCode}>
      <Backdrop />
    </Showcase>
  );
});

import BackdropClose from './examples/backdrop-close';
import BackdropCloseRawCode from './examples/backdrop-close.tsx?raw';
export const ShowcaseBackdropClose = component$(() => {
  return (
    <Showcase rawCode={BackdropCloseRawCode}>
      <BackdropClose />
    </Showcase>
  );
});

import AlertDialog from './examples/alert-dialog';
import AlertDialogRawCode from './examples/alert-dialog.tsx?raw';
export const ShowcaseAlertDialog = component$(() => {
  return (
    <Showcase rawCode={AlertDialogRawCode}>
      <AlertDialog />
    </Showcase>
  );
});

import Animatable from './examples/animatable';
import AnimatableRawCode from './examples/animatable.tsx?raw';
export const ShowcaseAnimatable = component$(() => {
  return (
    <Showcase rawCode={AnimatableRawCode}>
      <Animatable />
    </Showcase>
  );
});

import Transition from './examples/transition';
import TransitionRawCode from './examples/transition.tsx?raw';
export const ShowcaseTransition = component$(() => {
  return (
    <Showcase rawCode={TransitionRawCode}>
      <Transition />
    </Showcase>
  );
});

import BackdropAnimatable from './examples/backdrop-animatable';
import BackdropAnimatableRawCode from './examples/backdrop-animatable.tsx?raw';
export const ShowcaseBackdropAnimatable = component$(() => {
  return (
    <Showcase rawCode={BackdropAnimatableRawCode}>
      <BackdropAnimatable />
    </Showcase>
  );
});

import Sheet from './examples/sheet';
import SheetRawCode from './examples/sheet.tsx?raw';
export const ShowcaseSheet = component$(() => {
  return (
    <Showcase rawCode={SheetRawCode}>
      <Sheet />
    </Showcase>
  );
});

import BottomSheet from './examples/bottom-sheet';
import BottomSheetRawCode from './examples/bottom-sheet.tsx?raw';
export const ShowcaseBottomSheet = component$(() => {
  return (
    <Showcase rawCode={BottomSheetRawCode}>
      <BottomSheet />
    </Showcase>
  );
});

import Stacked from './examples/stacked';
import StackedRawCode from './examples/stacked.tsx?raw';
export const ShowcaseStacked = component$(() => {
  return (
    <Showcase rawCode={StackedRawCode}>
      <Stacked />
    </Showcase>
  );
});
