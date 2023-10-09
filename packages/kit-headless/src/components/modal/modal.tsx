import {
  component$,
  QRL,
  Signal,
  Slot,
  useContextProvider,
  useSignal,
  useTask$,
} from '@builder.io/qwik';
import { modalContextId } from './modal-context-id';
import { ModalContext } from './modal-context.type';

export type ModalProps = {
  onShow$?: QRL<() => void>;
  onHide$?: QRL<() => void>;
  show?: boolean;
  'bind:show'?: Signal<boolean>;
};

export const Modal = component$((props: ModalProps) => {
  const { 'bind:show': givenOpenSig, show: givenShow, onShow$, onHide$ } = props;

  const defaultOpenSig = useSignal(false);
  const showSig = givenOpenSig || defaultOpenSig;

  useTask$(async function syncOpenProp({ track }) {
    const openPropValue = track(() => givenShow);

    showSig.value = openPropValue || false;
  });

  const context: ModalContext = {
    showSig,
    handler: { onShow$, onHide$ },
  };

  useContextProvider(modalContextId, context);

  return <Slot />;
});
