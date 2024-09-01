import { JSXOutput, component$, $, QRL, useTask$, useSignal } from '@builder.io/qwik';
import {
  PublicType,
  type ComponentParts,
  type SubComponent,
} from 'apps/website/auto-api';
type Config = {
  topHeader?: QRL<(text: string) => JSXOutput>;
  subHeader?: (text: string) => string;
};

type AnatomyTableProps = {
  api?: ComponentParts;
  config: Config;
};

type SubComponentProps = {
  subComponent: SubComponent;
  config: Config;
};
type ParsedCommentsProps = {
  parsedProps: PublicType;
  config: Config;
};
const currentHeader = $((_: string) => {
  return (
    <h2 class="mb-8 mt-20 scroll-mt-24 border-b-2 pb-2 text-2xl font-extrabold">API</h2>
  );
});

function currentSubHeader(header: string) {
  return <h3 class="mb-6 mt-8 scroll-mt-20 text-xl font-semibold">header</h3>;
}
const defaultConfig: Config = {
  topHeader: currentHeader,
};
export const AutoAPI = component$<AnatomyTableProps>(
  ({ api, config = defaultConfig }) => {
    if (api === undefined) {
      return null;
    }
    const key = Object.keys(api)[0];
    const topHeaderSig = useSignal<string | JSXOutput>(key);
    const subComponents = api[key].filter((e) => e[Object.keys(e)[0]].length > 0);
    useTask$(async () => {
      if (config.topHeader) {
        topHeaderSig.value = await config.topHeader(key as string);
      }
    });
    return (
      <>
        {topHeaderSig.value}
        {subComponents.map((e) => (
          <SubComponent subComponent={e} config={config} />
        ))}
      </>
    );
  },
);

const SubComponent = component$<SubComponentProps>(({ subComponent, config }) => {
  const subComponentKey = Object.keys(subComponent)[0];
  const comments = subComponent[subComponentKey];
  return (
    <>
      {comments.map((e, i) => (
        <>
          <ParsedComments parsedProps={e} config={config} />
        </>
      ))}
    </>
  );
});

const ParsedComments = component$<ParsedCommentsProps>(({ parsedProps }) => {
  let subheader = Object.keys(parsedProps)[0];

  return (
    <>
      <p>{subheader}</p>
      {parsedProps[subheader].map((e) => {
        return (
          <p>
            {e.prop} : {e.type} : {`${e.comment}`}
          </p>
        );
      })}
    </>
  );
});
