import { PropsOf } from '@builder.io/qwik';

export function CheckIcon(props: PropsOf<'svg'>, key: string) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1.35em"
      height="1.35em"
      viewBox="0 0 256 256"
      {...props}
      key={key}
    >
      <g fill="#16a34a">
        <path d="M224 128a96 96 0 1 1-96-96a96 96 0 0 1 96 96Z" opacity=".2"></path>
        <path d="M173.66 98.34a8 8 0 0 1 0 11.32l-56 56a8 8 0 0 1-11.32 0l-24-24a8 8 0 0 1 11.32-11.32L112 148.69l50.34-50.35a8 8 0 0 1 11.32 0ZM232 128A104 104 0 1 1 128 24a104.11 104.11 0 0 1 104 104Zm-16 0a88 88 0 1 0-88 88a88.1 88.1 0 0 0 88-88Z"></path>
      </g>
    </svg>
  );
}
