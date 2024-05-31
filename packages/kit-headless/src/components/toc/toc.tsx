import { component$ } from '@builder.io/qwik';
import { type ContentHeading } from '@builder.io/qwik-city';
type TableOfContentProps = { headings: ContentHeading[] };
export const TableOfContent = component$<TableOfContentProps>((props) => {
  return <div>Hello Qwik!</div>;
});
