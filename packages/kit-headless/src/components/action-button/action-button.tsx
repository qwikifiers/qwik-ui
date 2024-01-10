import { JSXChildren, PropsOf } from '@builder.io/qwik';
import { type ActionStore, Form } from '@builder.io/qwik-city';

export type ActionButtonProps = PropsOf<'button'> & {
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
          <input key={key} type="hidden" name={key} value={params[key]} />
        ))}
      <button {...props}>{children}</button>
    </Form>
  );
};
