import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
  return (
    <article>
      <h1 class="text-6xl font-bold">Welcome to Qwik UI 🤩</h1>
      <h2 class="text-3xl font-medium mt-6">
        It's a cozy new component library! 🤗
      </h2>
      <div>
        <p class="mt-8 max-w-prose leading-relaxed">
          A web developer was hired by a company to create a website for their
          new product. He spent weeks designing and coding the website, making
          sure it was responsive, user-friendly, and SEO-optimized. He tested it
          on various browsers and devices, and fixed any bugs he found. He was
          proud of his work and confident that it would impress the client.
        </p>
        <p class="mt-8 max-w-prose leading-relaxed">
          He sent the website link to the client and waited for their feedback.
          A few hours later, he received an email from the client that read:
        </p>
        <p class="mt-8 max-w-prose leading-relaxed">
          "Hi,
          <br />
          Thank you for your hard work on the website. It looks great, but we
          have one small issue. When we open the website on our computer, it
          says 'Hello World' in big letters on the screen. Is this some kind of
          joke? We don't understand what it means. Please remove it as soon as
          possible and replace it with something more appropriate.
          <br />
          Sincerely,
          <br />
          The Client"
        </p>
        <p class="mt-8 max-w-prose leading-relaxed">
          The web developer was confused and shocked. He opened the website on
          his own computer and saw nothing wrong. He checked the code and found
          no trace of 'Hello World'. He tried different browsers and devices,
          but still couldn't reproduce the issue. He wondered if the client was
          playing a prank on him or if they had some kind of virus on their
          computer.
        </p>
        <p class="mt-8 max-w-prose leading-relaxed">
          He replied to the client:
        </p>
        <p class="mt-8 max-w-prose leading-relaxed">
          "Hi,
          <br />
          I'm glad you like the website, but I'm sorry to hear about the 'Hello
          World' problem. I have checked the website on my end and I don't see
          anything like that. Can you please send me a screenshot of what you
          see? Also, can you tell me what browser and operating system you are
          using?
          <br />
          Thank you,
          <br />
          The Web Developer"
        </p>
        <p class="mt-8 max-w-prose leading-relaxed">
          He waited for the client's response, hoping to solve the mystery. A
          few minutes later, he received another email from the client with an
          attachment. He opened it and saw a screenshot of the website with
          'Hello World' in big letters on the screen. He also noticed something
          else that made him facepalm.
        </p>
        <p class="mt-8 max-w-prose leading-relaxed">
          The client was using Internet Explorer 6.
        </p>
      </div>
    </article>
  );
});

export const head: DocumentHead = {
  title: 'Qwik UI',
};
