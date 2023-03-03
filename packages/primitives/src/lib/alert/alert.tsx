import { HTMLAttributes, JSXChildren } from '@builder.io/qwik';

export type AlertProps = HTMLAttributes<HTMLDivElement> & {
  children: JSXChildren;
};

export const Alert = ({ children, ...props }: AlertProps) => {
  return <div {...props}>{children}</div>;
};
