import { Meta, StoryObj } from 'storybook-framework-qwik';
import { Pagination, PaginationProps } from './pagination';

import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<PaginationProps> = {
  component: Pagination,
};

type Story = StoryObj<PaginationProps>;

export default meta;

export const Default: Story = {
  args: {
    pages: 10,
    page: 5,
  },
  render: (args) => (
    <>
      <Pagination
        pages={args.pages}
        page={args.page}
        onPaging$={(newValue: number) => {
          console.log('value', newValue);
        }}
        showFirstButton={args.showFirstButton}
        showLastButton={args.showLastButton}
        hideNextButton={args.hideNextButton}
        hidePrevButton={args.hidePrevButton}
        siblingCount={args.siblingCount}
        boundaryCount={args.boundaryCount}
      />
    </>
  ),
  play: ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const values = ['1', '4', '5', '6', '10'];
    values.forEach((value) => {
      expect(canvas.getByText(value)).toBeVisible();
    });
    expect(canvas.queryByText('first')).toBeNull();
    expect(canvas.queryByText('last')).toBeNull();
    expect(canvas.getByText('prev')).toBeVisible();
    expect(canvas.getByText('next')).toBeVisible();
  },
};

export const AllButtons: Story = {
  args: {
    pages: 10,
    page: 5,
    showFirstButton: true,
    showLastButton: true,
    hideNextButton: false,
    hidePrevButton: false,
    siblingCount: 1,
    boundaryCount: 1,
  },
  render: (args) => (
    <>
      <Pagination
        pages={args.pages}
        page={args.page}
        onPaging$={(newValue: number) => {
          console.log('value', newValue);
        }}
        showFirstButton={args.showFirstButton}
        showLastButton={args.showLastButton}
        hideNextButton={args.hideNextButton}
        hidePrevButton={args.hidePrevButton}
        siblingCount={args.siblingCount}
        boundaryCount={args.boundaryCount}
      />
    </>
  ),
  play: ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const values = ['1', '4', '5', '6', '10'];
    values.forEach((value) => {
      expect(canvas.getByText(value)).toBeVisible();
    });
    expect(canvas.getByText('first')).toBeVisible();
    expect(canvas.getByText('last')).toBeVisible();
    expect(canvas.getByText('prev')).toBeVisible();
    expect(canvas.getByText('next')).toBeVisible();
  },
};

export const HideButtons: Story = {
  args: {
    pages: 10,
    page: 5,
    showFirstButton: false,
    showLastButton: false,
    hideNextButton: true,
    hidePrevButton: true,
    siblingCount: 1,
    boundaryCount: 1,
  },
  render: (args) => (
    <>
      <Pagination
        pages={args.pages}
        page={args.page}
        onPaging$={(newValue: number) => {
          console.log('value', newValue);
        }}
        showFirstButton={args.showFirstButton}
        showLastButton={args.showLastButton}
        hideNextButton={args.hideNextButton}
        hidePrevButton={args.hidePrevButton}
        siblingCount={args.siblingCount}
        boundaryCount={args.boundaryCount}
      />
    </>
  ),
  play: ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const values = ['1', '4', '5', '6', '10'];
    values.forEach((value) => {
      expect(canvas.getByText(value)).toBeVisible();
    });
    expect(canvas.queryByText('first')).toBeNull();
    expect(canvas.queryByText('last')).toBeNull();
    expect(canvas.queryByText('prev')).toBeNull();
    expect(canvas.queryByText('next')).toBeNull();
  },
};
