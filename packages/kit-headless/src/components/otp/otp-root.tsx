import {
  component$,
  PropsOf,
  Slot,
  useContextProvider,
  useSignal,
  useStore,
} from '@builder.io/qwik';
import { OTPContextId } from './otp-context';
import { OtpItem } from './otp-item';
import { findComponent, processChildren } from '../../utils/inline-component';

type OtpRootProps = PropsOf<'div'>;

export const OtpRoot = ({ children }: OtpRootProps) => {
  let currItemIndex = 0;

  findComponent(OtpItem, (itemProps) => {
    itemProps._index = currItemIndex;
    currItemIndex++;
  });

  processChildren(children);

  return <OtpBase>{children}</OtpBase>;
};

export const OtpBase = component$((props: OtpRootProps) => {
  const nativeInputRef = useSignal<HTMLInputElement>();

  const context = useStore({
    value: '',
    activeIndex: 0,
    nativeInputRef,
  });

  useContextProvider(OTPContextId, context);
  return (
    <div {...props}>
      <Slot />
    </div>
  );
});
