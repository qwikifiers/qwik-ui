import { component$ } from '@builder.io/qwik';

export interface ThemeButton {
  theme?: 'Headless' | 'Daisy';
}
export default component$(({ theme }: ThemeButton) => {
  return (
    <a href="/docs">
      <button
        type="button"
        class={` shadow-md hover:shadow-lg w-96 h-72 w text-slate-100 ease-in duration-500 bg-slate-600 transition-transform rounded-xl active:rounded-3xl ${
          theme === 'Headless' ? ' hover:bg-yellow-600 ' : ' hover:bg-green-600'
        }`}
      >
        <div class="bg-slate-900">
          <img
            src={`${
              theme === 'Headless' ? '/qwik-headless.png' : '/qwik-daisy.png'
            }`}
            class="w-72 h-48 self-center  mx-auto"
          />
        </div>
        <div>
          <h2>{theme}</h2>
          <p>
            Yooo {theme} is the best option 4 u! don't listen to the other box
            next to me
          </p>
        </div>
      </button>
    </a>
  );
});
