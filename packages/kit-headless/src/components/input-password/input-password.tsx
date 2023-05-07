import {
  $,
  QwikIntrinsicElements,
  Slot,
  component$,
  createContextId,
  useComputed$,
  useContext,
  useContextProvider,
} from '@builder.io/qwik';
import type { Context, Params } from './use/input-password';
import { useInputPassword } from './use/input-password';
import { IconHidden, IconVisible } from './icons';

export const QuiInputPasswordContext = createContextId<Context>(
  'input-password-root'
);

// Root

type RootProps = Partial<Params>;

export const Root = component$((props: RootProps) => {
  const service = useInputPassword(props);
  useContextProvider(QuiInputPasswordContext, service);

  return <Slot />;
});

// Input

type InputProps = Omit<QwikIntrinsicElements['input'], 'value' | 'type'>;

export const Input = component$((props: InputProps) => {
  const { visible, value } = useContext(QuiInputPasswordContext);
  const type = useComputed$(() => (visible.value ? 'text' : 'password'));

  return <input {...props} bind:value={value} type={type.value} />;
});

// Toggler

type TogglerProps = QwikIntrinsicElements['button'];

export const Toggler = component$(({ onClick$, ...props }: TogglerProps) => {
  const { visible } = useContext(QuiInputPasswordContext);
  const toggle$ = $(() => (visible.value = !visible.value));

  return (
    <button
      {...props}
      aria-pressed={visible.value}
      type="button"
      onClick$={[toggle$, onClick$]}
    >
      <Slot />
    </button>
  );
});

// Icon

type IconProps = QwikIntrinsicElements['svg'];

export const Icon = component$((props: IconProps) => {
  const { visible } = useContext(QuiInputPasswordContext);

  return visible.value ? (
    <IconVisible {...props} aria-hidden={true} />
  ) : (
    <IconHidden {...props} aria-hidden={true} />
  );
});
