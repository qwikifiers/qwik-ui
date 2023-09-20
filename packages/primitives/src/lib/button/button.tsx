import { QwikIntrinsicElements, JSXChildren } from '@builder.io/qwik';
import { JSX } from '@builder.io/qwik/jsx-runtime';

export type ButtonProps = QwikIntrinsicElements['button'] & {
  children: JSXChildren;
};

export const Button = ({ children, ...props }: ButtonProps): JSX.Element => {
  return <button {...props}>{children}</button>;
};
