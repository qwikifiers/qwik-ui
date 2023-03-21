import {
  component$,
  QwikIntrinsicElements,
  useStylesScoped$,
} from '@builder.io/qwik';
import styles from './switch.css?inline';

export type SwitchProps = QwikIntrinsicElements['input'];

export const Switch = component$((props: SwitchProps) => {
  useStylesScoped$(styles);

  return <input {...props} type="checkbox" role="switch" />;
});
