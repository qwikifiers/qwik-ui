import { JSXOutput, component$, $, QRL, useTask$, useSignal } from '@builder.io/qwik';
import {
  PublicType,
  type ComponentParts,
  type SubComponent,
} from 'apps/website/auto-api';
import { APITable, APITableProps } from './api-table';
type Config = {
  topHeader?: QRL<(text: string) => JSXOutput>;
  subHeader?: QRL<(text: string) => JSXOutput>;
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

const currentSubHeader = $((text: string) => {
  return <h3 class="mb-6 mt-8 scroll-mt-20 text-xl font-semibold">{text}</h3>;
});
const defaultConfig: Config = {
  topHeader: currentHeader,
  subHeader: currentSubHeader,
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

const ParsedComments = component$<ParsedCommentsProps>(({ parsedProps, config }) => {
  const key = Object.keys(parsedProps)[0];
  const subHeaderSig = useSignal<string | JSXOutput>(key);

  useTask$(async () => {
    if (config.subHeader) {
      subHeaderSig.value = await config.subHeader(key as string);
    }
  });

  const translation: APITableProps = {
    propDescriptors: parsedProps[key].map((e) => {
      return {
        name: e.prop,
        type: e.type,
        description: e.comment,
      };
    }),
  };
  return (
    <>
      {subHeaderSig.value}
      <APITable propDescriptors={translation.propDescriptors} />
    </>
  );
});
