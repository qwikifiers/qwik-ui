import { component$ } from '@builder.io/qwik';
import { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
  return (
    <>
      <div class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 class="mb-8 text-4xl  font-bold">About Qwik UI</h1>
        <p class="mb-16 text-lg">
          Qwik UI is the first ever component library for the revolutionary Qwik web
          framework. Developed by leading members of the Qwik community, including members
          from the Qwik team , Qwik UI offers an open-source solution for building instant
          loading and accessible web applications that achieve top-tier SEO performance.
        </p>

        <h2 class="mb-4 text-2xl font-semibold">Designed for Developers</h2>
        <p class="mb-16 text-lg">
          Qwik UI is built for developers who want to harness the power of Qwik's
          innovative JavaScript Streaming technology to create highly performant web
          applications with minimal effort. Whether you're working on an e-commerce
          platform, a dashboard or any scale application, Qwik UI provides the components
          and tools you need to deliver a seamless user experience.
        </p>

        <h2 class="mb-4 text-2xl  font-semibold">
          A MUST for E-commerce and SEO-focused Applications
        </h2>
        <p class="mb-16 text-lg">
          Qwik's instant loading capabilities offer a significant advantage for e-commerce
          and other search engine-facing applications. By ensuring the highest Core Web
          Vitals scores, Qwik UI not only delivers an amazing user experience but also
          helps improve your site's search engine rankings . Stand out from the
          competition with a web application that loads instantly, regardless of its size
          or complexity.
        </p>

        <h2 class="mb-4 text-2xl  font-semibold">Accessibility Matters</h2>
        <p class="mb-16 text-lg">
          In addition to performance and SEO advantages, Qwik UI components are designed
          with accessibility in mind. We believe in creating inclusive web experiences
          that cater to users of all abilities, and our components are built to adhere to
          the highest accessibility standards.
        </p>
        <h2 class="mb-4 text-2xl  font-semibold">Open Source and Community-Driven</h2>
        <p class="mb-16 text-lg">
          Qwik UI is an open-source project, which means that it's freely available for
          developers to use and contribute to. By fostering a community-driven approach,
          we aim to continuously improve and expand the capabilities of Qwik UI, making it
          the go-to component library for developers working the Qwik framework.
        </p>
        <p class="mb-16 text-lg">
          Join us in our mission to revolutionize web development and create instant
          loading web applications that offer unparalleled performance, SEO advantages,
          and accessibility.
        </p>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: 'Qwik UI | About the project',
};
