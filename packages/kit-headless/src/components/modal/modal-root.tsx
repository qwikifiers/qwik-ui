import {
  PropsOf,
  QRL,
  Signal,
  Slot,
  component$,
  useContext,
  useContextProvider,
  useId,
  useSignal,
} from '@builder.io/qwik';
import { ModalContext, modalContextId } from './modal-context';

type ModalRootProps = {
  onShow$?: QRL<() => void>;
  onClose$?: QRL<() => void>;
  'bind:show'?: Signal<boolean>;
  closeOnBackdropClick?: boolean;
  alert?: boolean;
} & PropsOf<'div'>;

export const HModalRoot = component$((props: ModalRootProps) => {
  const localId = useId();

  const {
    'bind:show': givenShowSig,
    closeOnBackdropClick,
    onShow$,
    onClose$,
    alert,
  } = props;

  const defaultShowSig = useSignal<boolean>(false);
  const showSig = givenShowSig ?? defaultShowSig;

  // Track nesting so only the root modal restores page scroll when closed.
  const parentContext = useContext(modalContextId, null);
  const level = (parentContext?.level ?? 0) + 1;

  const context: ModalContext = {
    localId,
    level,
    showSig,
    closeOnBackdropClick,
    onShow$,
    onClose$,
    alert,
  };

  useContextProvider(modalContextId, context);

  return (
    <div {...props}>
      <Slot />
    </div>
  );
});
