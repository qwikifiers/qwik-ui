import { Meta } from '@storybook/html';
import { Tooltip } from './tooltip';

export default {
  title: 'Data Display / Tooltip',
  argTypes: {
    type: { control: 'select', options: ['primary', 'secondary', 'accent', 'success', 'info', 'warning', 'error']},
    position: { control: 'select', options: ['top', 'bottom', 'left', 'right']}
  }
} as Meta;

const Template = (args: any) => <div style={{ margin: '25px' }}>
  <Tooltip {...args}>
    <button className={`btn ${args.type ? `btn-${args.type}` : ''}`}>Hover me</button>
  </Tooltip>
</div>

export const Default = Template.bind({});
Default.args = {
  tip: 'This is shown in tooltip'
}
