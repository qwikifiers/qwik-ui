import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { Badge } from '@qwik-ui/headless';

export default component$(() => {
  useStylesScoped$(`
    h1 { margin: 0.5rem 0 1rem 0; padding-top: 1rem; font-weight: bold; }
    .container { display: flex; gap: 10px; } .customBtnCls { background-color: lightcoral;}
    svg { width: 1rem; height: 1rem; stroke: currentColor }
    .badge-lg {height: 1.5rem;
      font-size: 1rem;
      line-height: 1.5rem;
      padding-left: 0.688rem;
      padding-right: 0.688rem;
    }
  `);
  return (
    <>
      <h2>This is the documentation for the Badge</h2>

      <h1>Badge Example</h1>

      <Badge.Root class="badge">badge</Badge.Root>

      <h1>Color</h1>

      <div class="container">
        <Badge.Root class="badge">neutral</Badge.Root>
        <Badge.Root class="badge" style="background-color: lightblue">
          lightblue
        </Badge.Root>
      </div>

      <h1>Badge sizes</h1>
      <Badge.Root class="badge badge-lg">Badge lg</Badge.Root>

      <h1>Empty badge</h1>
      <Badge.Root class="badge" />

      <h1>Badge with state colors</h1>
      <Badge.Root class="badge">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
        info
      </Badge.Root>

      <h1>Badge in a text</h1>
      <h2>
        Heading
        <Badge.Root class="badge">NEW</Badge.Root>
      </h2>
    </>
  );
});
