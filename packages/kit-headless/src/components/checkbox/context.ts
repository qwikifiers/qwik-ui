import { Signal, createContextId } from '@builder.io/qwik';

export type CheckboxContext = {
  localId: string;
  isCheckedSig: Signal<boolean>;
  name?: string;
  value?: string;
  isError?: boolean;
};

export const checkboxContextId = createContextId<CheckboxContext>('qwikui-checkbox');
// waiting implementaion: would require a root component & only applies if
// two checkbox comps are in the same <Form> & have same name strg
export const allInputNames = createContextId<string[]>('qwikui-checbox-input-names');

/**
 *  
  https://github.com/thejackshelton/qwik-ui/blob/feat/carousel/packages/kit-headless/src/components/carousel/slide.tsx#L77
 * 
 */
