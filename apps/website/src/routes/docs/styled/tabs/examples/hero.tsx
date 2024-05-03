import { component$ } from '@builder.io/qwik';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  Label,
  TabsRoot,
  TabsList,
  TabsPanel,
  Tab,
} from '@qwik-ui/styled';

export default component$(() => {
  return (
    <TabsRoot class="max-w-[400px]">
      <TabsList class="grid w-full grid-cols-2">
        <Tab>Account</Tab>
        <Tab>Password</Tab>
      </TabsList>
      <TabsPanel>
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              Make changes to your account here. Click save when you're done.
            </CardDescription>
          </CardHeader>
          <CardContent class="space-y-2">
            <div class="space-y-1">
              <Label for="name">Name</Label>
              <Input id="name" value="Pedro Duarte" />
            </div>
            <div class="space-y-1">
              <Label for="username">Username</Label>
              <Input id="username" value="~peduarte" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save changes</Button>
          </CardFooter>
        </Card>
      </TabsPanel>
      <TabsPanel>
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, you'll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent class="space-y-2">
            <div class="space-y-1">
              <Label for="current">Current password</Label>
              <Input id="current" type="password" />
            </div>
            <div class="space-y-1">
              <Label for="new">New password</Label>
              <Input id="new" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsPanel>
    </TabsRoot>
  );
});
