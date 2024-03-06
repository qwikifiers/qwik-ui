import { component$ } from '@builder.io/qwik';
import { CheckIcon } from '../icons/Check';
import { Roadmap } from '../icons/Roadmap';

type FeatureListProps = {
  features: string[];
  roadmap?: string[];
};

export const FeatureList = component$((props: FeatureListProps) => {
  return (
    <ul class="mb-12 mt-[-16px] !px-0">
      {props.features.map((descriptor) => {
        return (
          <li
            key={descriptor}
            class="flex w-full list-none items-center gap-x-2 gap-y-4 border-b-[1px] border-slate-200 py-2 dark:border-slate-800"
          >
            <CheckIcon class="min-w-[21px]" />
            {descriptor}
          </li>
        );
      })}
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
                  <Roadmap class="min-w-[21px]" />
                  {descriptor}
                </li>
              </>
            );
          })}
        </>
      )}
    </ul>
  );
});
