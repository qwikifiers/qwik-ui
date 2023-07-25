import { component$ } from '@builder.io/qwik';
import { GitHubIcon } from '../icons/GitHubIcon';
import { DiscordIcon } from '../icons/discord';

export const Footer = component$(() => {
  return (
    <footer class="bg-gray-300 dark:bg-gray-900">
      <div class="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
        <nav class="-mx-5 -my-2 flex flex-wrap justify-center" aria-label="Footer">
          <div class="px-5 py-2">
            <a
              href="/about"
              class="text-base text-gray-500 hover:text-gray-900 dark:hover:text-gray-300"
            >
              About
            </a>
          </div>
          <div class="px-5 py-2">
            <a
              href="/docs/headless/introduction"
              class="text-base text-gray-500 hover:text-gray-900 dark:hover:text-gray-300"
            >
              Headless Kit
            </a>
          </div>

          <div class="px-5 py-2">
            <a
              href="https://discord.gg/PVWUUejrez"
              target="_blank"
              class="text-base text-gray-500 hover:text-gray-900 dark:hover:text-gray-300"
            >
              Community
            </a>
          </div>

          <div class="px-5 py-2">
            <a
              href="https://www.w3.org/standards/webdesign/accessibility"
              target="_blank"
              class="text-base text-gray-500 hover:text-gray-900 dark:hover:text-gray-300"
            >
              Accessibility
            </a>
          </div>
          <div class="px-5 py-2">
            <a
              href="https://qwik.builder.io/docs"
              target="_blank"
              class="text-base text-gray-500 hover:text-gray-900 dark:hover:text-gray-300"
            >
              Qwik Documentation
            </a>
          </div>
        </nav>
        <div class="mt-8 flex items-center justify-center space-x-6">
          <a
            target="_blank"
            href="https://github.com/qwikifiers/qwik-ui"
            aria-label="Qwik-UI GitHub repository"
            class="text-gray-400 hover:text-gray-500"
          >
            <GitHubIcon />
          </a>
          <a
            target="_blank"
            href="https://discord.gg/PVWUUejrez"
            aria-label="Qwik-UI Discord server"
            class="text-gray-400 hover:text-gray-500"
          >
            <DiscordIcon />
          </a>
        </div>
        <p class="mt-8 text-center text-base dark:text-gray-400 text-gray-600">
          &copy; 2023 Qwik UI. All rights reserved.
        </p>
      </div>
    </footer>
  );
});
