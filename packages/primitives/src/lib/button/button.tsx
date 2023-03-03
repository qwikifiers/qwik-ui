import { QwikIntrinsicElements, JSXChildren } from '@builder.io/qwik';

export type ButtonProps = QwikIntrinsicElements['button'] & {
  children: JSXChildren;
};

export const Button = ({ children, ...props }: ButtonProps) => {
  return <button {...props}>{children}</button>;
};
