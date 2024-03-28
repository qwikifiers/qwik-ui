import { PropsOf } from '@builder.io/qwik';

export function IssueIcon(props: PropsOf<'svg'>, key: string) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1.35em"
      height="1.35em"
      viewBox="0 0 256 256"
      {...props}
      key={key}
    >
      <g fill="hsl(var(--alert))">
        <path d="M224 128a96 96 0 1 1-96-96a96 96 0 0 1 96 96" opacity=".2"></path>
        <path d="M176 128a8 8 0 0 1-8 8H88a8 8 0 0 1 0-16h80a8 8 0 0 1 8 8m56 0A104 104 0 1 1 128 24a104.11 104.11 0 0 1 104 104m-16 0a88 88 0 1 0-88 88a88.1 88.1 0 0 0 88-88"></path>
      </g>
    </svg>
  );
}
