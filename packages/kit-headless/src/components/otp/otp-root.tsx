import {
  component$,
  PropsOf,
  Slot,
  useContextProvider,
  useSignal,
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
  const value = useSignal<string | number>('');
  const activeIndex = useSignal(0);
  const nativeInputRef = useSignal<HTMLInputElement>();

  const context = {
    value: value,
    activeIndex: activeIndex.value,
    nativeInputRef: nativeInputRef,
  };

  useContextProvider(OTPContextId, context);
  return (
    <div {...props}>
      <Slot />
    </div>
  );
});
