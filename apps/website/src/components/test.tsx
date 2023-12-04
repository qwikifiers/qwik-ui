import { component$ } from '@builder.io/qwik';

export default component$(() => {
  return (
    <div>
      <div class="space-y-2">
        <p class="bg-background text-foreground">Primary</p>
        <p class="bg-primary text-primary-foreground hover:bg-primary/90 border-primary-foreground focus:ring-ring hover:ring-ring rounded-full border-2 px-2 hover:ring focus:ring">
          Primary
        </p>
        <p class="bg-secondary text-secondary-foreground hover:bg-secondary/90">
          Secondary
        </p>
        <p class="bg-muted text-muted-foreground">Muted</p>
        <p class="bg-accent text-accent-foreground">Accent</p>
        <p class="bg-destructive text-destructive-foreground">Destructive</p>
        <p class="border-8">Border</p>
        <p class="bg-card text-card-foreground rounded-full border-2 px-2">Card</p>
        <p class="bg-popover text-popover-foreground">Popover</p>
        <p class="border-input rounded-xl border-4 px-2">Input</p>
        <br />
        <p class="hover:ring-ring rounded-full px-2 hover:ring">Ring</p>
        <p class="text-muted-foreground hover:bg-accent hover:text-accent-foreground m-2 rounded-full px-2">
          Complex
        </p>
        <br />
      </div>
    </div>
  );
});
