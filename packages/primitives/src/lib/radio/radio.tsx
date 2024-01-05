import { QwikIntrinsicElements, component$ } from '@builder.io/qwik';

export type RadioProps = QwikIntrinsicElements['input'];

export const Radio = component$<RadioProps>((props) => <input type="radio" {...props} />);
