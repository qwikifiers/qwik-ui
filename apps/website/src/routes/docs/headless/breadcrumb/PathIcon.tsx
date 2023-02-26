import { component$, useStylesScoped$ } from '@builder.io/qwik';

export default component$(() => {
  useStylesScoped$(`
    svg { width: 1rem;height:1rem;stroke:currentColor;margin-right:0.5rem; }
  `);

  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
      ></path>
    </svg>
  );
});
