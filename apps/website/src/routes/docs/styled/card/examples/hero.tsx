import { PropsOf, component$ } from '@builder.io/qwik';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@qwik-ui/styled';
import { cn } from '@qwik-ui/utils';
import { LuBell, LuCheck } from '@qwikest/icons/lucide';

const notifications = [
  {
    title: 'Your call has been confirmed.',
    description: '1 hour ago',
  },
  {
    title: 'You have a new message!',
    description: '1 hour ago',
  },
  {
    title: 'Your subscription is expiring soon!',
    description: '2 hours ago',
  },
];

type CardProps = PropsOf<typeof Card>;

export default component$<CardProps>(({ ...props }) => {
  return (
    <Card class={cn('w-[380px]', props.class)} {...props}>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>You have 3 unread messages.</CardDescription>
      </CardHeader>
      <CardContent class="grid gap-4">
        <div class=" flex items-center space-x-4 rounded-md border p-4">
          <LuBell />
          <div class="flex-1 space-y-1">
            <p class="text-sm font-medium leading-none">Push Notifications</p>
            <p class="text-sm text-muted-foreground">Send notifications to device.</p>
          </div>
          {/* <Switch /> */}
        </div>
        <div>
          {notifications.map((notification, index) => (
            <div
              key={index}
              class="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
            >
              <span class="flex h-2 w-2 translate-y-1 rounded-full bg-primary" />
              <div class="space-y-1">
                <p class="text-sm font-medium leading-none">{notification.title}</p>
                <p class="text-sm text-muted-foreground">{notification.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button class="w-full">
          <LuCheck class="mr-2 h-4 w-4" /> Mark all as read
        </Button>
      </CardFooter>
    </Card>
  );
});
