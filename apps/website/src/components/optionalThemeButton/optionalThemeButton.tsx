import { component$ } from '@builder.io/qwik';
import {
  Card,
  CardBody,
  CardTitle,
  CardActions,
  CardImage,
} from '@qwik-ui/headless';
import { Button } from '@qwik-ui/primitives';
export interface ThemeButton {
  theme?: 'Headless' | 'Daisy';
}
export default component$(({ theme }: ThemeButton) => {
  return (
    <Card
      class={`custom-card bg-slate-900 w-96 rounded-xl overflow-hidden active:rounded-3xl grow ${
        theme === 'Headless' ? 'hover:bg-green-500' : 'hover:bg-yellow-600'
      }`}
    >
      <CardImage
        src={`${
          theme === 'Headless' ? '/qwik-headless.png' : '/qwik-daisy.png'
        }`}
        alt={`${theme === 'Headless' ? 'Headless kit' : 'Daisy kit'}`}
        class="w-full h-48 self-center my-0 mx-auto bg-[url('/Button-bg.svg')] bg-no-repeat bg-cover"
      />
      <CardBody class={`custom-card-body mx-8 my-6`}>
        <CardTitle class="text-xl font-extrabold">{theme}</CardTitle>
        <p>
          Yooo {theme} is the best option 4 u! don't listen to the other box
        </p>
        <CardActions class="custom-card-actions"></CardActions>
      </CardBody>
    </Card>
  );
  // return (
  //   <a href="/docs">
  //     <button
  //       type="button"
  //       class={`border shadow-md hover:shadow-lg w-96 h-72 w text-slate-100 ease-in duration-500 bg-slate-600 transition-transform rounded-xl active:rounded-3xl ${
  //         theme === 'Headless' ? ' hover:bg-yellow-600 ' : ' hover:bg-green-600'
  //       }`}
  //     >
  //       <div class="bg-slate-900 border relative top-0">
  //         <img
  //           src={`${
  //             theme === 'Headless' ? '/qwik-headless.png' : '/qwik-daisy.png'
  //           }`}
  //           class="w-72 h-48 self-center my-0 mx-auto"
  //         />
  //       </div>
  //       <div>
  //         <h2>{theme}</h2>
  //         <p>
  //           Yooo {theme} is the best option 4 u! don't listen to the other box
  //           next to me
  //         </p>
  //       </div>
  //     </button>
  //   </a>
  // );
});
