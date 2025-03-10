import { component$ } from '@qwik.dev/core';
import { Note } from '../note/note';
import { LuBadge, LuBadgeAlert, LuBadgeCheck } from '@qwikest/icons/lucide';

type FeatureListProps = {
  features: string[];
  roadmap?: string[];
  issues?: string[];
};

export const FeatureList = component$((props: FeatureListProps) => {
  return (
    <>
      <ul class="mb-12 mt-6 !px-0">
        {props.features && (
          <>
            {props.features.map((descriptor, index) => {
              return (
                <li
                  key={descriptor}
                  class={`flex w-full list-none items-center gap-x-2 gap-y-4 ${index === props.features.length - 1 ? '' : 'border-b-[1px]'} border-slate-200 py-2 dark:border-slate-800`}
                >
                  <LuBadgeCheck class="h-5 w-5 text-green-600" />
                  {descriptor}
                </li>
              );
            })}
          </>
        )}
        {props.roadmap && (
          <>
            <h3 class="mb-6 mt-8 scroll-mt-20 text-xl font-semibold">Roadmap</h3>
            {props.roadmap.map((descriptor) => {
              return (
                <>
                  <li
                    key={descriptor}
                    class="flex w-full list-none items-center gap-x-2 gap-y-4 border-b-[1px] border-slate-200 py-2 dark:border-slate-800"
                  >
                    <LuBadge class="h-5 w-5 text-yellow-500" />
                    {descriptor}
                  </li>
                </>
              );
            })}
          </>
        )}
        {props.issues && (
          <>
            {props.issues.map((descriptor) => {
              return (
                <>
                  <li
                    key={descriptor}
                    class="flex w-full list-none items-center gap-x-2 gap-y-4 border-b-[1px] border-slate-200 py-2 dark:border-slate-800"
                  >
                    <LuBadgeAlert class="h-5 w-5 text-red-500" />
                    {descriptor}
                  </li>
                </>
              );
            })}
          </>
        )}
      </ul>
      {!props.issues && (
        <Note>
          Missing a feature? Check out the{' '}
          <a class="font-bold" href="https://qwikui.com/docs/contributing/">
            contributing guide
          </a>{' '}
          and we'd be happy to review any relevant issues or PR's. Feel free to work on
          any of the features listed above.
        </Note>
      )}
    </>
  );
});
