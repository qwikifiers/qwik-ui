// import { Meta, StoryObj } from 'storybook-framework-qwik';
// import { within, userEvent, waitFor } from '@storybook/testing-library';
// import {
//   SelectRoot,
//   SelectListBox,
//   SelectTrigger,
//   SelectOption,
//   TriggerProps,
//   SelectValue,
//   SelectMarker,
//   SelectGroup,
//   SelectLabel,
// } from './select';
// import { expect } from '@storybook/jest';

// const meta: Meta<TriggerProps> = {
//   component: SelectTrigger,
// };

// export default meta;

// type Story = StoryObj<TriggerProps>;

// interface TVSeries {
//   title: string;
//   disabled?: boolean;
// }

// const comedies: TVSeries[] = [
//   { title: 'The Office' },
//   { title: 'Brooklyn 99' },
//   { title: 'Superstore' },
//   { title: 'The Good Place' },
//   { title: 'Parks and Recreation' },
//   { title: 'Community' },
//   { title: 'Arrested Development' },
//   { title: '30 Rock' },
//   { title: 'The Simpsons' },
//   { title: 'Futurama' },
//   { title: 'Family Guy' },
//   { title: 'South Park', disabled: true },
// ];

// const dramas: TVSeries[] = [
//   { title: 'The Wire' },
//   { title: 'Law & Order' },
//   { title: 'The Sopranos' },
//   { title: 'Breaking Bad' },
// ];

// export const Primary: Story = {
//   render: () => (
//     <SelectRoot>
//       <SelectLabel style="margin-right: 12px">
//         What's your favorite TV show?
//       </SelectLabel>

//       <SelectTrigger>
//         <SelectValue data-testid="select-value" placeholder="Pick an option" />

//         <SelectMarker>
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             stroke-width="2"
//             stroke-linecap="round"
//             stroke-linejoin="round"
//             style="width: 20px; height: 20px;"
//           >
//             <polyline points="6 9 12 15 18 9"></polyline>
//           </svg>
//         </SelectMarker>
//       </SelectTrigger>

//       <SelectListBox>
//         <SelectGroup>
//           <SelectLabel>Comedies</SelectLabel>
//           {comedies.map((comedy, index) => (
//             <SelectOption
//               key={`comedy-${index}`}
//               value={comedy.title}
//               disabled={comedy.disabled}
//             />
//           ))}
//         </SelectGroup>

//         <SelectGroup>
//           <SelectLabel>Dramas</SelectLabel>
//           {dramas.map((drama, index) => (
//             <SelectOption
//               key={`drama-${index}`}
//               value={drama.title}
//               disabled={drama.disabled}
//             />
//           ))}
//         </SelectGroup>
//       </SelectListBox>
//     </SelectRoot>
//   ),
//   play: async ({ canvasElement }) => {
//     const canvas = within(canvasElement);

//     await userEvent.click(canvas.getByText('Pick an option'));
//     await userEvent.click(canvas.getByText('The Office'));

//     await waitFor(() => {
//       return expect(canvas.getByTestId('select-value')).toHaveTextContent(
//         'The Office'
//       );
//     });
//   },
// };
