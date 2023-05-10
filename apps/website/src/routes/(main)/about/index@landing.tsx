// # About Qwik UI

// Qwik UI is the first component library ever created for Qwik, designed exclusively for developers working with the revolutionary Qwik web framework.
// Created by leading members of the Qwik community, including members from the Qwik team, Qwik UI offers an open-source solution for
// building instant loading web applications that achieve top-tier SEO performance.

// ## Target Audience

// Qwik UI is built for developers who want to harness the power of Qwik's innovative JavaScript Streaming technology
// and create highly performant web applications with minimal effort.
// Whether you're developing an e-commerce platform or any search engine-facing application,
// Qwik UI provides the components and tools you need to deliver a seamless user experience.

// ## Ideal for E-commerce and SEO-focused Applications

// Qwik's instant loading capabilities offer a significant advantage for e-commerce and other search engine-facing applications.
// By ensuring the highest Core Web Vitals scores, Qwik UI not only delivers blazing-fast performance but also helps improve
// your site's search engine rankings. Stand out from the competition with a web application that loads instantly, regardless of its size or complexity.

// ## Built by Qwik Experts

// As the only native-to-Qwik component library currently available, Qwik UI benefits from the expertise of the very
// people who are shaping the future of web development. Developed in collaboration with Qwik team members,
// Qwik UI components are designed to work seamlessly with the Qwik framework, ensuring that you can build web applications that are both fast and scalable.

// ## Open Source and Community-Driven

// Qwik UI is an open-source project, which means that it's freely available for developers to use and contribute to.
// By fostering a community-driven approach, we aim to continuously improve and expand the capabilities of Qwik UI,
// making it the go-to component library for developers working with the Qwik web framework.

// Join us in our mission to revolutionize web development and create instant loading web applications that offer unparalleled
// performance and SEO advantages. Get started with Qwik UI today!

import { component$ } from '@builder.io/qwik';
import { DocumentHead, Link } from '@builder.io/qwik-city';

export default component$(() => {
  return (
    <>
      <div class="max-w-3xl  mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 class="text-4xl font-bold  mb-8">About Qwik UI</h1>
        <p class="text-lg mb-16">
          Qwik UI is the first ever component library for the revolutionary Qwik
          web framework. Developed by leading members of the Qwik community,{' '}
          <mark class="text-purple-300 bg-transparent">
            including members from the Qwik team
          </mark>
          , Qwik UI offers an open-source solution for building instant loading
          and accessible web applications that achieve top-tier SEO performance.
        </p>

        <h2 class="text-2xl font-semibold mb-4">Designed for Developers</h2>
        <p class="text-lg mb-16">
          Qwik UI is built for developers who want to harness the power of
          Qwik's innovative{' '}
          <mark class="text-purple-300 bg-transparent">
            JavaScript Streaming
          </mark>{' '}
          technology to create highly performant web applications with minimal
          effort. Whether you're working on an e-commerce platform, a dashboard
          or any scale application, Qwik UI provides the components and tools
          you need to deliver a seamless user experience.
        </p>

        <h2 class="text-2xl font-semibold  mb-4">
          A MUST for E-commerce and SEO-focused Applications
        </h2>
        <p class="text-lg mb-16">
          Qwik's instant loading capabilities offer a significant advantage for
          e-commerce and other search engine-facing applications. By ensuring
          the highest Core Web Vitals scores, Qwik UI not only{' '}
          <mark class="text-purple-300 bg-transparent">
            delivers an amazing user experience
          </mark>{' '}
          but also helps{' '}
          <mark class="text-purple-300 bg-transparent">
            improve your site's search engine rankings
          </mark>
          . Stand out from the competition with a web application that loads
          instantly, regardless of its size or complexity.
        </p>

        <h2 class="text-2xl font-semibold  mb-4">Accessibility Matters</h2>
        <p class="text-lg mb-16">
          In addition to performance and SEO advantages, Qwik UI components are
          designed with accessibility in mind.{' '}
          <mark class="text-purple-300 bg-transparent">
            We believe in creating inclusive web experiences
          </mark>{' '}
          that cater to users of all abilities, and our components are built to
          adhere to the highest accessibility standards.
        </p>
        <h2 class="text-2xl font-semibold  mb-4">
          Open Source and Community-Driven
        </h2>
        <p class="text-lg mb-16">
          Qwik UI is an open-source project, which means that it's freely
          available for developers to use and contribute to. By fostering a{' '}
          <mark class="text-purple-300 bg-transparent">
            community-driven approach
          </mark>
          , we aim to continuously improve and expand the capabilities of Qwik
          UI, making it the go-to component library for developers working the
          Qwik framework.
        </p>
        <p class="text-lg mb-16">
          Join us in our mission to revolutionize web development and create
          instant loading web applications that offer unparalleled performance,
          SEO advantages, and accessibility.
        </p>

        <Link href="/docs/tailwind">
          <h2 class="text-center underline hover:no-underline">
            Get started with Qwik UI today!
          </h2>
        </Link>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: 'Qwik UI | About the project',
};
