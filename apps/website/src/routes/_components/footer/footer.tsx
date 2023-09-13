import { component$ } from '@builder.io/qwik';
import { GitHubIcon } from '../icons/GitHubIcon';
import { DiscordIcon } from '../icons/discord';

export const Footer = component$(() => {
  return (
    <footer class="border-t-[1px] border-slate-100 border-slate-300 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
      <div class="mx-auto max-w-7xl overflow-hidden px-4 py-12 sm:px-6 lg:px-8">
        <nav class="-mx-5 -my-2 flex flex-wrap justify-center" aria-label="Footer">
          <div class="px-5 py-2">
            <a
              href="/about"
              class="text-base text-slate-800 hover:text-slate-900 dark:text-white dark:hover:text-slate-300"
            >
              About
            </a>
          </div>
          <div class="px-5 py-2">
            <a
              href="/docs/headless/introduction"
              class="text-base text-slate-800 hover:text-slate-900 dark:text-white dark:hover:text-slate-300"
            >
              Headless Kit
            </a>
          </div>

          <div class="px-5 py-2">
            <a
              href="https://discord.gg/PVWUUejrez"
              target="_blank"
              class="text-base text-slate-800 hover:text-slate-900 dark:text-white dark:hover:text-slate-300"
            >
              Community
            </a>
          </div>

          <div class="px-5 py-2">
            <a
              href="https://www.w3.org/standards/webdesign/accessibility"
              target="_blank"
              class="text-base text-slate-800 hover:text-slate-900 dark:text-white dark:hover:text-slate-300"
            >
              Accessibility
            </a>
          </div>
          <div class="px-5 py-2">
            <a
              href="https://qwik.builder.io/docs"
              target="_blank"
              class="text-base text-slate-800 hover:text-slate-900 dark:text-white dark:hover:text-slate-300"
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
            class="text-slate-600 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white"
          >
            <GitHubIcon />
          </a>
          <a
            target="_blank"
            href="https://discord.gg/PVWUUejrez"
            aria-label="Qwik-UI Discord server"
            class="text-slate-600 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white"
          >
            <DiscordIcon />
          </a>
        </div>
        <p class="mt-8 text-center text-base text-slate-600 dark:text-slate-400">
          &copy; 2023 Qwik UI. All rights reserved.
        </p>
      </div>
    </footer>
  );
});
