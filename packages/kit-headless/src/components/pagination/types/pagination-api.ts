import { PropsOf, QRL } from '@qwik.dev/core';

export interface PaginationCoreProps {
  selectedPage: number;
  totalPages: number;
  onPageChange$: QRL<(page: number) => void>;
}

export type PaginationStyling = {
  gap?: string;
  defaultClass?: string;
  selectedClass?: string;
  dividerClass?: string;
  nextButtonClass?: string;
  prevButtonClass?: string;
};

export type PaginationConfig = {
  siblingCount?: number;
  // still not supported
  boundaryCount?: number;
  hidePrevButton?: boolean;
  hideNextButton?: boolean;
  disabled?: boolean;
  customArrowTexts?: ArrowLabels;
};

type ArrowLabels = {
  previous: string;
  next: string;
};

export type PaginationProps = PaginationCoreProps &
  PaginationStyling &
  PaginationConfig &
  PropsOf<'nav'>;
