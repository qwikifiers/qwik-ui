import {
  QwikIntrinsicElements,
  Slot,
  component$,
  useSignal,
  useStylesScoped$
} from '@builder.io/qwik';

export const AlphaBanner = component$(() => {
  const ref = useSignal<HTMLElement | undefined>();
  const isClosed = useSignal(false);

  useStylesScoped$(`
    .normal-state {
        transition: margin-top 0.5s ease;
    }

    /* 
        if you see these media queries I'm sorry xd. Normally, you would use a transform here, since it reflects the elements size, but margin-top affects the siblig elements, and is the only way I can animate the upwards slide (without JS) in this component.

        I could do it with JS using RequestAnimationFrame
        -Jack 
    */

    .fade {
        animation: fadeOut 0.5s ease forwards;
        margin-top: -256px;
    }

    @media (min-width: 336px) {
        .fade {
            margin-top: -232px;
        }
    }

    @media (min-width: 365px) {
      .fade {
        margin-top: -208px;
      }
    }

    @media (min-width: 405px) {
        .fade {
            margin-top: -184px;
        }
    }

    @media (min-width: 479px) {
        .fade {
            margin-top: -160px;
        }
    }

    @media (min-width: 812px) {
        .fade {
            margin-top: -112px
        }
    }

    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
  `);

  return (
    <>
      <div
        ref={ref}
        hidden={isClosed.value}
        onAnimationEnd$={() => (isClosed.value = true)}
        class="bg-[#fef1c7] dark:bg-[#92730e] mb-8 px-6 py-4 rounded-xl md:items-center relative md:flex-row normal-state shadow-depth dark:shadow-depth-dark"
      >
        <span class="pr-2">
          <strong>WARNING:</strong> This component is currently in Alpha, and not intended
          to use in production. You may use it for testing purposes, or use a component
          with the <strong>Ready</strong> state
        </span>
        <button
          onClick$={() => ref.value?.classList.toggle('fade')}
          class="scale-150 absolute top-2 right-2"
        >
          <EpCircleCloseFilled />
        </button>
      </div>
    </>
  );
});

export function EpCircleCloseFilled(props: QwikIntrinsicElements['svg'], key: string) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 1024 1024"
      {...props}
      key={key}
    >
      <path
        fill="currentColor"
        d="M512 64a448 448 0 1 1 0 896a448 448 0 0 1 0-896zm0 393.664L407.936 353.6a38.4 38.4 0 1 0-54.336 54.336L457.664 512L353.6 616.064a38.4 38.4 0 1 0 54.336 54.336L512 566.336L616.064 670.4a38.4 38.4 0 1 0 54.336-54.336L566.336 512L670.4 407.936a38.4 38.4 0 1 0-54.336-54.336L512 457.664z"
      ></path>
    </svg>
  );
}
