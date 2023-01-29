import {
  component$,
  Slot,
  useClientEffect$,
} from '@builder.io/qwik';

export const MaterialTheme = component$(() => {
  useClientEffect$(() => {
    const link = document.createElement('link');

    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.setAttribute('theme-placeholder', 'material');
    link.href = '/materialize.css';

    document.head.appendChild(link);

    return () => link.remove();
  });

  return <Slot />;
});
