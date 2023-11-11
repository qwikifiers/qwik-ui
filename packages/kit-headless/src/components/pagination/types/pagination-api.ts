import { PropFunction, QwikIntrinsicElements } from '@builder.io/qwik';

export interface PaginationCoreProps {
  selectedPage: number;
  totalPages: number;
  onPageChange$: PropFunction<(page: number) => void>;
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
  QwikIntrinsicElements['nav'];
