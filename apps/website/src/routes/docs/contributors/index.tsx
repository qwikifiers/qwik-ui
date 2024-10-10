import { component$ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import { Badge } from '@qwik-ui/styled';

export const onGet: RequestHandler = async ({ cacheControl }) => {
  cacheControl({
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Don't hit the Github API more than once every 10 minutes
    maxAge: 10 * 60,
  });
};

export const useContributors = routeLoader$<Contributor[]>(async () => {
  const response = await fetch(
    'https://api.github.com/repos/qwikifiers/qwik-ui/contributors',
  );

  if (!response.ok) {
    console.error('Failed to fetch contributors', response);
    return [];
  }

  const contributors: Contributor[] = await response.json();

  return contributors.filter((m) => m.type === 'User');
});

export default component$(() => {
  const contributors = useContributors();

  return (
    <>
      <section class="py-16 text-accent-foreground">
        <div class="mx-auto text-center">
          <h1 class="mb-6 scroll-mt-24 pt-6 text-3xl font-extrabold md:text-5xl">
            Contributors
          </h1>
          <p class="text-xl">
            Our project's success is driven by these incredible contributors.
          </p>
        </div>
      </section>

      <section class="py-12">
        <div class="mx-auto max-w-6xl px-4">
          <div class="grid gap-12 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {contributors.value.map((contributor) => (
              <a
                href={contributor.html_url}
                target="_blank"
                key={contributor.login}
                class="transform rounded-lg bg-accent shadow-lg transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
              >
                <div class="p-6 text-center">
                  <img
                    width={88}
                    height={88}
                    class="mx-auto -mt-12 h-24 w-24 rounded-full border-2 border-foreground/20"
                    src={`${contributor.avatar_url}&s=256`}
                    alt={contributor.login}
                  />
                  <h3 class="mt-2 text-xl font-semibold text-foreground">
                    {contributor.login}
                  </h3>
                  <div class="mt-2 mt-4 flex flex-col items-center gap-2 text-foreground">
                    Contributions <Badge> {contributor.contributions}</Badge>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section class="bg-primary py-12 text-white">
        <div class="mx-auto max-w-3xl text-center">
          <h2 class="mb-4 text-3xl font-bold">Join Our Community</h2>
          <p class="mb-6">
            Ready to make an impact? Contribute to Qwik UI and be part of something great.
          </p>
          <a
            href="https://github.com/qwikifiers/qwik-ui/blob/main/CONTRIBUTING.md"
            class="rounded-full bg-white px-6 py-3 font-semibold text-primary shadow-lg hover:bg-gray-100"
          >
            Get Involved
          </a>
        </div>
      </section>
    </>
  );
});
