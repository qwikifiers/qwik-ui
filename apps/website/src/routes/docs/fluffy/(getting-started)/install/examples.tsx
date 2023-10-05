/* eslint-disable @nx/enforce-module-boundaries */

import rootCssCode from '../../../../../../../../packages/kit-fluffy/src/templates/root.css_template?raw';
import tailwindConfigCode from '../../../../../../../../packages/kit-fluffy/src/templates/tailwind.config.js_template?raw';
import { Highlight } from '../../../_components/highlight/highlight';

export const InstallExample = () => (
  <Highlight
    class="border p-6 shadow-md"
    copyCodeClass="top-3"
    code="pnpm i -D @qwik-ui/headless"
  />
);

export const TailwindConfigExample = () => <Highlight code={tailwindConfigCode} />;
export const RootCssExample = () => <Highlight code={rootCssCode} language="css" />;
