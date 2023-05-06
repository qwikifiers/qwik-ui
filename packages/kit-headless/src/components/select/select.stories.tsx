import { Meta, StoryObj } from 'storybook-framework-qwik';
import { within, userEvent, waitFor } from '@storybook/testing-library';
import {
  Root,
  ListBox,
  Trigger,
  Option,
  TriggerProps,
  Value,
  Marker,
  Group,
  Label,
} from './select';
import { expect } from '@storybook/jest';

const meta: Meta<TriggerProps> = {
  component: Trigger,
};

export default meta;

type Story = StoryObj<TriggerProps>;

interface TVSeries {
  title: string;
  disabled?: boolean;
}

const comedies: TVSeries[] = [
  { title: 'The Office' },
  { title: 'Brooklyn 99' },
  { title: 'Superstore' },
  { title: 'The Good Place' },
  { title: 'Parks and Recreation' },
  { title: 'Community' },
  { title: 'Arrested Development' },
  { title: '30 Rock' },
  { title: 'The Simpsons' },
  { title: 'Futurama' },
  { title: 'Family Guy' },
  { title: 'South Park', disabled: true },
];

const dramas: TVSeries[] = [
  { title: 'The Wire' },
  { title: 'Law & Order' },
  { title: 'The Sopranos' },
  { title: 'Breaking Bad' },
];

export const Primary: Story = {
  render: () => (
    <Root>
      <Label style="margin-right: 12px">What's your favorite TV show?</Label>

      <Trigger>
        <Value data-testid="select-value" placeholder="Pick an option" />

        <Marker>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            style="width: 20px; height: 20px;"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </Marker>
      </Trigger>

      <ListBox>
        <Group>
          <Label>Comedies</Label>
          {comedies.map((comedy, index) => (
            <Option
              key={`comedy-${index}`}
              value={comedy.title}
              disabled={comedy.disabled}
            />
          ))}
        </Group>

        <Group>
          <Label>Dramas</Label>
          {dramas.map((drama, index) => (
            <Option
              key={`drama-${index}`}
              value={drama.title}
              disabled={drama.disabled}
            />
          ))}
        </Group>
      </ListBox>
    </Root>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByText('Pick an option'));
    await userEvent.click(canvas.getByText('The Office'));

    await waitFor(() => {
      return expect(canvas.getByTestId('select-value')).toHaveTextContent(
        'The Office'
      );
    });
  },
};
