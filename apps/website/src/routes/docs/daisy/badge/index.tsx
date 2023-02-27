import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { Badge, Button } from '@qwik-ui/theme-daisy';

export default component$(() => {
  useStylesScoped$(`
    h1 { margin: 0.5rem 0 1rem 0; padding-top: 1rem; font-weight: bold; }
    p { margin-bottom: 0.5rem; } .container { display: flex; gap: 5px}
  `);
  return (
    <>
      <h2>This is the documentation for the Spinner</h2>

      <h1>Badge Example</h1>

      <Badge />

      <h1>Variant</h1>
      <p>Set the variant attribute to change the badge's variant.</p>

      <div class="container">
        <Badge>neutral</Badge>
        <Badge variant="primary">primary</Badge>
        <Badge variant="secondary">secondary</Badge>
        <Badge variant="accent">accent</Badge>
        <Badge variant="ghost">ghost</Badge>
        <Badge variant="info">info</Badge>
        <Badge variant="success">success</Badge>
        <Badge variant="warning">warning</Badge>
        <Badge variant="error">error</Badge>
      </div>

      <h1>Outline</h1>
      <div class="container">
        <Badge outline>neutral</Badge>
        <Badge variant="primary" outline>
          primary
        </Badge>
        <Badge variant="secondary" outline>
          secondary
        </Badge>
        <Badge variant="accent" outline>
          accent
        </Badge>
        <Badge variant="ghost" outline>
          ghost
        </Badge>
        <Badge variant="info" outline>
          info
        </Badge>
        <Badge variant="success" outline>
          success
        </Badge>
        <Badge variant="warning" outline>
          warning
        </Badge>
        <Badge variant="error" outline>
          error
        </Badge>
      </div>

      <h1>Badge sizes</h1>
      <div class="container">
        <Badge size="lg">Badge lg</Badge>
        <Badge size="md">Badge md</Badge>
        <Badge size="sm">Badge sm</Badge>
        <Badge size="xs">Badge xs</Badge>
      </div>

      <h1>Badge with state colors</h1>
      <div class="container">
        <Badge variant="info" class="gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-4 h-4 stroke-current"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
          info
        </Badge>

        <Badge variant="success" class="gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-4 h-4 stroke-current"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
          success
        </Badge>
        <Badge variant="warning" class="gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-4 h-4 stroke-current"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
          warning
        </Badge>
        <Badge variant="error" class="gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-4 h-4 stroke-current"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
          error
        </Badge>
      </div>

      <h1>Badge with state colors</h1>
      <h2 class="text-xl">
        Heading
        <Badge size="lg">NEW</Badge>
      </h2>
      <h3 class="text-lg">
        Heading
        <Badge size="md">NEW</Badge>
      </h3>
      <h4 class="text-base">
        Heading
        <Badge size="sm">NEW</Badge>
      </h4>
      <h5 class="text-sm">
        Heading
        <Badge size="xs">NEW</Badge>
      </h5>

      <h1>Badge in a button</h1>
      <div class="container">
        <Button variant="primary" class="gap-2">
          Inbox
          <Badge variant="primary">+4</Badge>
        </Button>
        <Button variant="secondary" class="gap-2">
          Inbox
          <Badge variant="primary">+5</Badge>
        </Button>
      </div>
    </>
  );
});
