import { component$, useSignal, useStyles$ } from '@builder.io/qwik';
import { Modal } from '@qwik-ui/headless';
import styles from './headless-css.css?inline';

export default component$(() => {
  const showSig = useSignal(false);
  useStyles$(styles);

  return <Modal.Panel class="modal" bind:show={showSig}></Modal.Panel>;
});
