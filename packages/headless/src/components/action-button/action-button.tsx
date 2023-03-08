import type { JSXChildren } from '@builder.io/qwik';
import { type ActionStore, Form } from '@builder.io/qwik-city';
import { QwikIntrinsicElements } from '@builder.io/qwik';

export type ActionButtonProps = QwikIntrinsicElements['button'] & {
  action: ActionStore<unknown, unknown>;
  children: JSXChildren;
  params?: Record<string, null>;
};

export const ActionButton = ({
  action,
  children,
  params,
  ...props
}: ActionButtonProps) => {
  return (
    <Form action={action}>
      {params &&
        Object.keys(params).map((key) => (
          <input type="hidden" name={key} value={params[key]} />
        ))}
      <button {...props}>{children}</button>
    </Form>
  );
};
