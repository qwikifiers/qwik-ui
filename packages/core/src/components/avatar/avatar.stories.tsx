import { Meta } from '@storybook/html';
import { Avatar, AvatarGroup } from './';


export default {
  title: 'Data Display / Avatar',
  argTypes: {
    size: { control: 'select', options: ['w-8', 'w-16', 'w-20', 'w-24', 'w-32'] },
    hasRoundedCorners: { control: 'boolean'},
    hasRing: { control: 'boolean'},
    isCircle: { control: 'boolean'}
  },
} as Meta;

const Template = (args: any) => <Avatar {...args}>
  <img src="https://placeimg.com/192/192/people" />
</Avatar>;

export const Default = Template.bind({});

const GroupTemplate = (args: any) => <AvatarGroup {...args}>
  <Default {...args} />
  <Default {...args} />
</AvatarGroup>;

export const GroupDefault = GroupTemplate.bind({});

