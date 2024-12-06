import { component$ } from '@builder.io/qwik';
import { GitHubIcon } from '../icons/GitHubIcon';
import { DiscordIcon } from '../icons/discord';
import { cn } from '@qwik-ui/utils';
import { buttonVariants } from '@qwik-ui/styled';

export const Footer = component$(() => {
  return (
    <footer class="border-t">
      <div class="mx-auto max-w-7xl overflow-hidden px-4 py-12 sm:px-6 lg:px-8">
        <nav class="-mx-5 -my-2 flex flex-wrap justify-center" aria-label="Footer">
          <div class="px-5 py-2">
            <a
              href="/docs/headless/introduction"
              class={cn(buttonVariants({ look: 'link' }))}
            >
              Headless Kit
            </a>
          </div>
          <div class="px-5 py-2">
            <a
              href="/docs/styled/introduction"
              class={cn(buttonVariants({ look: 'link' }))}
            >
              Styled Kit
            </a>
          </div>
          <div class="px-5 py-2">
            <a
              href="https://discord.gg/PVWUUejrez"
              target="_blank"
              class={cn(buttonVariants({ look: 'link' }))}
            >
              Community
            </a>
          </div>

          <div class="px-5 py-2">
            <a
              href="https://www.w3.org/standards/webdesign/accessibility"
              target="_blank"
              class={cn(buttonVariants({ look: 'link' }))}
            >
              Accessibility
            </a>
          </div>
          <div class="px-5 py-2">
            <a
              href="https://qwik.builder.io/docs"
              target="_blank"
              class={cn(buttonVariants({ look: 'link' }))}
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
            class="text-muted-foreground hover:text-accent-foreground"
          >
            <GitHubIcon />
          </a>
          <a
            target="_blank"
            href="https://discord.gg/PVWUUejrez"
            aria-label="Qwik-UI Discord server"
            class="text-muted-foreground hover:text-accent-foreground"
          >
            <DiscordIcon />
          </a>
        </div>
        <p class="mt-8 text-center">&copy; 2023 Qwik UI. All rights reserved.</p>
      </div>
    </footer>
  );
});
