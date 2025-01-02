import { component$ } from '@builder.io/qwik';
import { useDocumentHead, useLocation } from '@builder.io/qwik-city';
import codeCave from '../../../public/images/contributing/code-cave.jpg';

/**
 * The RouterHead component is placed inside of the document `<head>` element.
 */
export const RouterHead = component$(() => {
  const head = useDocumentHead();
  const loc = useLocation();

  return (
    <>
      <title>{head.title}</title>

      <link rel="canonical" href={loc.url.href} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

      {/* Theme and color scheme */}
      <meta name="color-scheme" content="dark light" />
      <meta name="theme-color" content="#020617" media="(prefers-color-scheme: dark)" />
      <meta name="theme-color" content="#f8fafc" media="(prefers-color-scheme: light)" />

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />

      {/* Standard meta description for search engines */}
      <meta
        name="description"
        content="A collection of ready-to-use components and primitives for building high-quality, accessible web applications with Qwik."
      />

      <meta property="og:site_name" content="Qwik UI" />
      <meta name="twitter:site" content="@QwikDev" />
      <meta name="twitter:title" content="Qwik UI" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:description"
        content="A collection of ready-to-use components and primitives for building high-quality, accessible web applications with Qwik."
      />

      {/* Full absolute URLs for social media previews */}
      <meta name="twitter:image" content={`${loc.url.origin}${codeCave}`} />
      <meta property="og:image" content={`${loc.url.origin}${codeCave}`} />

      {/* Add additional OpenGraph tags for better Facebook/LinkedIn support */}
      <meta property="og:title" content="Qwik UI" />
      <meta
        property="og:description"
        content="A collection of ready-to-use components and primitives for building high-quality, accessible web applications with Qwik."
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={loc.url.href} />

      {head.meta.map((m, i) => (
        <meta key={i} {...m} />
      ))}

      {head.links.map((l, i) => (
        <link key={i} {...l} />
      ))}

      {head.styles.map((s, i) => (
        <style key={i} {...s.props} dangerouslySetInnerHTML={s.style} />
      ))}
    </>
  );
});
