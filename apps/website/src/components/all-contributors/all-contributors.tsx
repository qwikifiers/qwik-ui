import { component$, useStyles$ } from '@builder.io/qwik';

export const AllContributors = component$(() => {
  useStyles$(`
    .image-container img {
      min-width: 100px;
      overflow-wrap: break-word;
    }

    @media (max-width: 600px) {
      tr {
        display: flex;
        flex-wrap: wrap;
      }
      td {
        flex: 0 0 50%;
        max-width: 50%; 
      }

      img {
        max-width: 100%;
        height: auto;
      }
    }
  `);

  return (
    <div class="image-container overflow-auto">
      <table>
        <tbody>
          <tr>
            <td align="center" valign="top" width="14.28%">
              <a href="https://hirez.io/?utm_source=github&utm_medium=link&utm_campaign=qwik-ui">
                <img
                  height="460"
                  src="https://avatars1.githubusercontent.com/u/1430726?v=4?s=100"
                  width="460"
                  alt="Shai Reznik"
                />
                <br />
                <sub>
                  <b>Shai Reznik</b>
                </sub>
              </a>
              <br />
              <a
                href="https://github.com/qwikifiers/qwik-ui/commits?author=shairez"
                title="Code"
              >
                💻
              </a>{' '}
              <a
                href="https://github.com/qwikifiers/qwik-ui/commits?author=shairez"
                title="Tests"
              >
                ⚠️
              </a>{' '}
              <a href="#infra-shairez" title="Infrastructure (Hosting, Build-Tools, etc)">
                🚇
              </a>{' '}
              <a
                href="https://github.com/qwikifiers/qwik-ui/commits?author=shairez"
                title="Documentation"
              >
                📖
              </a>{' '}
              <a href="#maintenance-shairez" title="Maintenance">
                🚧
              </a>{' '}
              <a
                href="https://github.com/qwikifiers/qwik-ui/pulls?q=is%3Apr+reviewed-by%3Ashairez"
                title="Reviewed Pull Requests"
              >
                👀
              </a>{' '}
              <a href="#ideas-shairez" title="Ideas, Planning, & Feedback">
                🤔
              </a>
            </td>
            <td align="center" valign="top" width="14.28%">
              <a href="http://www.gilfink.net">
                <img
                  height="460"
                  src="https://avatars.githubusercontent.com/u/1590253?v=4?s=100"
                  width="460"
                  alt="Gil Fink"
                />
                <br />
                <sub>
                  <b>Gil Fink</b>
                </sub>
              </a>
              <br />
              <a href="#infra-gilf" title="Infrastructure (Hosting, Build-Tools, etc)">
                🚇
              </a>{' '}
              <a
                href="https://github.com/qwikifiers/qwik-ui/commits?author=gilf"
                title="Tests"
              >
                ⚠️
              </a>{' '}
              <a
                href="https://github.com/qwikifiers/qwik-ui/commits?author=gilf"
                title="Code"
              >
                💻
              </a>{' '}
              <a
                href="https://github.com/qwikifiers/qwik-ui/commits?author=gilf"
                title="Documentation"
              >
                📖
              </a>{' '}
              <a href="#ideas-gilf" title="Ideas, Planning, & Feedback">
                🤔
              </a>{' '}
              <a
                href="https://github.com/qwikifiers/qwik-ui/pulls?q=is%3Apr+reviewed-by%3Agilf"
                title="Reviewed Pull Requests"
              >
                👀
              </a>
            </td>
            <td align="center" valign="top" width="14.28%">
              <a href="https://it.linkedin.com/in/giorgio-boa">
                <img
                  height="460"
                  src="https://avatars.githubusercontent.com/u/35845425?v=4?s=100"
                  width="460"
                  alt="Giorgio Boa"
                />
                <br />
                <sub>
                  <b>Giorgio Boa</b>
                </sub>
              </a>
              <br />
              <a
                href="https://github.com/qwikifiers/qwik-ui/commits?author=gioboa"
                title="Code"
              >
                💻
              </a>{' '}
              <a
                href="https://github.com/qwikifiers/qwik-ui/commits?author=gioboa"
                title="Tests"
              >
                ⚠️
              </a>{' '}
              <a
                href="https://github.com/qwikifiers/qwik-ui/commits?author=gioboa"
                title="Documentation"
              >
                📖
              </a>{' '}
              <a href="#ideas-gioboa" title="Ideas, Planning, & Feedback">
                🤔
              </a>{' '}
              <a
                href="https://github.com/qwikifiers/qwik-ui/pulls?q=is%3Apr+reviewed-by%3Agioboa"
                title="Reviewed Pull Requests"
              >
                👀
              </a>
            </td>
            <td align="center" valign="top" width="14.28%">
              <a href="https://github.com/reemardelarosa">
                <img
                  height="460"
                  src="https://avatars.githubusercontent.com/u/4918140?v=4?s=100"
                  width="460"
                  alt="John Reemar Dela Rosa"
                />
                <br />
                <sub>
                  <b>John Reemar Dela Rosa</b>
                </sub>
              </a>
              <br />
              <a href="#maintenance-reemardelarosa" title="Maintenance">
                🚧
              </a>
            </td>
            <td align="center" valign="top" width="14.28%">
              <a href="https://github.com/nnelgxorz">
                <img
                  height="460"
                  src="https://avatars.githubusercontent.com/u/9634080?v=4?s=100"
                  width="460"
                  alt="Glenn Becker"
                />
                <br />
                <sub>
                  <b>Glenn Becker</b>
                </sub>
              </a>
              <br />
              <a
                href="https://github.com/qwikifiers/qwik-ui/commits?author=nnelgxorz"
                title="Code"
              >
                💻
              </a>{' '}
              <a
                href="https://github.com/qwikifiers/qwik-ui/commits?author=nnelgxorz"
                title="Tests"
              >
                ⚠️
              </a>{' '}
              <a
                href="https://github.com/qwikifiers/qwik-ui/commits?author=nnelgxorz"
                title="Documentation"
              >
                📖
              </a>{' '}
              <a href="#ideas-nnelgxorz" title="Ideas, Planning, & Feedback">
                🤔
              </a>{' '}
              <a
                href="https://github.com/qwikifiers/qwik-ui/pulls?q=is%3Apr+reviewed-by%3Annelgxorz"
                title="Reviewed Pull Requests"
              >
                👀
              </a>
            </td>
            <td align="center" valign="top" width="14.28%">
              <a href="https://github.com/michalmw">
                <img
                  height="460"
                  src="https://avatars.githubusercontent.com/u/10683327?v=4?s=100"
                  width="460"
                  alt="Michał Wójcik"
                />
                <br />
                <sub>
                  <b>Michał Wójcik</b>
                </sub>
              </a>
              <br />
              <a
                href="https://github.com/qwikifiers/qwik-ui/commits?author=michalmw"
                title="Code"
              >
                💻
              </a>{' '}
              <a
                href="https://github.com/qwikifiers/qwik-ui/commits?author=michalmw"
                title="Documentation"
              >
                📖
              </a>
            </td>
            <td align="center" valign="top" width="14.28%">
              <a href="https://github.com/shiroinegai">
                <img
                  height="460"
                  src="https://avatars.githubusercontent.com/u/88586552?v=4?s=100"
                  width="460"
                  alt="Shiroi Negai"
                />
                <br />
                <sub>
                  <b>Shiroi Negai</b>
                </sub>
              </a>
              <br />
              <a
                href="https://github.com/qwikifiers/qwik-ui/commits?author=shiroinegai"
                title="Code"
              >
                💻
              </a>{' '}
              <a href="#ideas-shiroinegai" title="Ideas, Planning, & Feedback">
                🤔
              </a>{' '}
              <a
                href="https://github.com/qwikifiers/qwik-ui/issues?q=author%3Ashiroinegai"
                title="Bug reports"
              >
                🐛
              </a>{' '}
              <a href="#a11y-shiroinegai" title="Accessibility">
                ️️️️♿️
              </a>
            </td>
          </tr>
          <tr>
            <td align="center" valign="top" width="14.28%">
              <a href="http://www.fabiobiondi.io">
                <img
                  height="460"
                  src="https://avatars.githubusercontent.com/u/1772083?v=4?s=100"
                  width="460"
                  alt="Fabio Biondi"
                />
                <br />
                <sub>
                  <b>Fabio Biondi</b>
                </sub>
              </a>
              <br />
              <a
                href="https://github.com/qwikifiers/qwik-ui/commits?author=fabiobiondi"
                title="Code"
              >
                💻
              </a>{' '}
              <a href="#ideas-fabiobiondi" title="Ideas, Planning, & Feedback">
                🤔
              </a>
            </td>
            <td align="center" valign="top" width="14.28%">
              <a href="https://github.com/Obvio">
                <img
                  height="180"
                  src="https://avatars.githubusercontent.com/u/300232?v=4?s=100"
                  width="180"
                  alt="Obvio"
                />
                <br />
                <sub>
                  <b>Obvio</b>
                </sub>
              </a>
              <br />
              <a
                href="https://github.com/qwikifiers/qwik-ui/commits?author=Obvio"
                title="Code"
              >
                💻
              </a>{' '}
              <a href="#ideas-Obvio" title="Ideas, Planning, & Feedback">
                🤔
              </a>{' '}
              <a
                href="https://github.com/qwikifiers/qwik-ui/commits?author=Obvio"
                title="Documentation"
              >
                📖
              </a>{' '}
              <a
                href="https://github.com/qwikifiers/qwik-ui/issues?q=author%3AObvio"
                title="Bug reports"
              >
                🐛
              </a>{' '}
              <a href="#a11y-Obvio" title="Accessibility">
                ️️️️♿️
              </a>
            </td>
            <td align="center" valign="top" width="14.28%">
              <a href="https://leonardomontini.dev/">
                <img
                  height="460"
                  src="https://avatars.githubusercontent.com/u/7253929?v=4?s=100"
                  width="460"
                  alt="Leonardo Montini"
                />
                <br />
                <sub>
                  <b>Leonardo Montini</b>
                </sub>
              </a>
              <br />
              <a
                href="https://github.com/qwikifiers/qwik-ui/commits?author=Balastrong"
                title="Code"
              >
                💻
              </a>{' '}
              <a
                href="https://github.com/qwikifiers/qwik-ui/issues?q=author%3ABalastrong"
                title="Bug reports"
              >
                🐛
              </a>
            </td>
            <td align="center" valign="top" width="14.28%">
              <a href="https://itai.netlify.app/">
                <img
                  height="460"
                  src="https://avatars.githubusercontent.com/u/37772742?v=4?s=100"
                  width="460"
                  alt="Itai Mizlish"
                />
                <br />
                <sub>
                  <b>Itai Mizlish</b>
                </sub>
              </a>
              <br />
              <a
                href="https://github.com/qwikifiers/qwik-ui/commits?author=itaim18"
                title="Code"
              >
                💻
              </a>{' '}
              <a
                href="https://github.com/qwikifiers/qwik-ui/commits?author=itaim18"
                title="Documentation"
              >
                📖
              </a>
            </td>
            <td align="center" valign="top" width="14.28%">
              <a href="http://www.luisbeqja.com">
                <img
                  height="460"
                  src="https://avatars.githubusercontent.com/u/75300376?v=4?s=100"
                  width="460"
                  alt="Luis Beqja"
                />
                <br />
                <sub>
                  <b>Luis Beqja</b>
                </sub>
              </a>
              <br />
              <a
                href="https://github.com/qwikifiers/qwik-ui/commits?author=luisbeqja"
                title="Code"
              >
                💻
              </a>
            </td>
            <td align="center" valign="top" width="14.28%">
              <a href="https://www.riccardovettore.dev">
                <img
                  height="460"
                  src="https://avatars.githubusercontent.com/u/108279675?v=4?s=100"
                  width="460"
                  alt="Riccardo Vettore"
                />
                <br />
                <sub>
                  <b>Riccardo Vettore</b>
                </sub>
              </a>
              <br />
              <a
                href="https://github.com/qwikifiers/qwik-ui/commits?author=riccardo-vettore"
                title="Code"
              >
                💻
              </a>
            </td>
            <td align="center" valign="top" width="14.28%">
              <a href="https://github.com/KenAKAFrosty">
                <img
                  height="460"
                  src="https://avatars.githubusercontent.com/u/90424167?v=4?s=100"
                  width="460"
                  alt="Ken aka Frosty"
                />
                <br />
                <sub>
                  <b>Ken aka Frosty</b>
                </sub>
              </a>
              <br />
              <a
                href="https://github.com/qwikifiers/qwik-ui/commits?author=KenAKAFrosty"
                title="Code"
              >
                💻
              </a>{' '}
              <a
                href="https://github.com/qwikifiers/qwik-ui/issues?q=author%3AKenAKAFrosty"
                title="Bug reports"
              >
                🐛
              </a>
            </td>
          </tr>
          <tr>
            <td align="center" valign="top" width="14.28%">
              <a href="https://developers.italia.it">
                <img
                  height="460"
                  src="https://avatars.githubusercontent.com/u/11008116?v=4?s=100"
                  width="460"
                  alt="Alessandro Sebastiani"
                />
                <br />
                <sub>
                  <b>Alessandro Sebastiani</b>
                </sub>
              </a>
              <br />
              <a
                href="https://github.com/qwikifiers/qwik-ui/commits?author=sebbalex"
                title="Code"
              >
                💻
              </a>{' '}
              <a
                href="https://github.com/qwikifiers/qwik-ui/commits?author=sebbalex"
                title="Documentation"
              >
                📖
              </a>{' '}
              <a
                href="https://github.com/qwikifiers/qwik-ui/issues?q=author%3Asebbalex"
                title="Bug reports"
              >
                🐛
              </a>
            </td>
            <td align="center" valign="top" width="14.28%">
              <a href="https://wahyufebrianto.vercel.app">
                <img
                  height="460"
                  src="https://avatars.githubusercontent.com/u/38874570?v=4?s=100"
                  width="460"
                  alt="Wahyu Febrianto"
                />
                <br />
                <sub>
                  <b>Wahyu Febrianto</b>
                </sub>
              </a>
              <br />
              <a
                href="https://github.com/qwikifiers/qwik-ui/commits?author=wahyufeb"
                title="Code"
              >
                💻
              </a>{' '}
              <a
                href="https://github.com/qwikifiers/qwik-ui/issues?q=author%3Awahyufeb"
                title="Bug reports"
              >
                🐛
              </a>
            </td>
            <td align="center" valign="top" width="14.28%">
              <a href="https://github.com/dmitry-stepanenko">
                <img
                  height="460"
                  src="https://avatars.githubusercontent.com/u/33101123?v=4?s=100"
                  width="460"
                  alt="Dmitriy Stepanenko"
                />
                <br />
                <sub>
                  <b>Dmitriy Stepanenko</b>
                </sub>
              </a>
              <br />
              <a href="#maintenance-dmitry-stepanenko" title="Maintenance">
                🚧
              </a>
            </td>
            <td align="center" valign="top" width="14.28%">
              <a href="https://yishay-hazan.netlify.app">
                <img
                  height="460"
                  src="https://avatars.githubusercontent.com/u/50710472?v=4?s=100"
                  width="460"
                  alt="Yishay Hazan"
                />
                <br />
                <sub>
                  <b>Yishay Hazan</b>
                </sub>
              </a>
              <br />
              <a
                href="https://github.com/qwikifiers/qwik-ui/commits?author=yishayhaz"
                title="Code"
              >
                💻
              </a>
            </td>
            <td align="center" valign="top" width="14.28%">
              <a href="https://github.com/rossellamascia">
                <img
                  height="460"
                  src="https://avatars.githubusercontent.com/u/42215075?v=4?s=100"
                  width="460"
                  alt="Rossella Mascia"
                />
                <br />
                <sub>
                  <b>Rossella Mascia</b>
                </sub>
              </a>
              <br />
              <a
                href="https://github.com/qwikifiers/qwik-ui/commits?author=rossellamascia"
                title="Code"
              >
                💻
              </a>
            </td>
            <td align="center" valign="top" width="14.28%">
              <a href="https://ssd7.vercel.app">
                <img
                  height="460"
                  src="https://avatars.githubusercontent.com/u/80447788?v=4?s=100"
                  width="460"
                  alt="Sai Srikar Dumpeti"
                />
                <br />
                <sub>
                  <b>Sai Srikar Dumpeti</b>
                </sub>
              </a>
              <br />
              <a
                href="https://github.com/qwikifiers/qwik-ui/commits?author=the-r3aper7"
                title="Code"
              >
                💻
              </a>
            </td>
            <td align="center" valign="top" width="14.28%">
              <a href="https://github.com/tleperou">
                <img
                  height="350"
                  src="https://avatars.githubusercontent.com/u/8383972?v=4?s=100"
                  width="350"
                  alt="Thomas Lepérou"
                />
                <br />
                <sub>
                  <b>Thomas Lepérou</b>
                </sub>
              </a>
              <br />
              <a
                href="https://github.com/qwikifiers/qwik-ui/commits?author=tleperou"
                title="Documentation"
              >
                📖
              </a>{' '}
              <a
                href="https://github.com/qwikifiers/qwik-ui/commits?author=tleperou"
                title="Code"
              >
                💻
              </a>
            </td>
          </tr>
          <tr>
            <td align="center" valign="top" width="14.28%">
              <a href="https://github.com/PatrykGodlewski">
                <img
                  height="460"
                  src="https://avatars.githubusercontent.com/u/81991100?v=4?s=100"
                  width="460"
                  alt="Patryk Godlewski"
                />
                <br />
                <sub>
                  <b>Patryk Godlewski</b>
                </sub>
              </a>
              <br />
              <a
                href="https://github.com/qwikifiers/qwik-ui/issues?q=author%3APatrykGodlewski"
                title="Bug reports"
              >
                🐛
              </a>{' '}
              <a
                href="https://github.com/qwikifiers/qwik-ui/commits?author=PatrykGodlewski"
                title="Code"
              >
                💻
              </a>
            </td>
            <td align="center" valign="top" width="14.28%">
              <a href="https://github.com/pranit-yawalkar">
                <img
                  height="460"
                  src="https://avatars.githubusercontent.com/u/64571514?v=4?s=100"
                  width="460"
                  alt="Pranit Yawalkar"
                />
                <br />
                <sub>
                  <b>Pranit Yawalkar</b>
                </sub>
              </a>
              <br />
              <a
                href="https://github.com/qwikifiers/qwik-ui/issues?q=author%3Apranit-yawalkar"
                title="Bug reports"
              >
                🐛
              </a>{' '}
              <a
                href="https://github.com/qwikifiers/qwik-ui/commits?author=pranit-yawalkar"
                title="Code"
              >
                💻
              </a>
            </td>
            <td align="center" valign="top" width="14.28%">
              <a href="https://github.com/gederer">
                <img
                  height="453"
                  src="https://avatars.githubusercontent.com/u/705111?v=4?s=100"
                  width="453"
                  alt="Greg Ederer"
                />
                <br />
                <sub>
                  <b>Greg Ederer</b>
                </sub>
              </a>
              <br />
              <a
                href="https://github.com/qwikifiers/qwik-ui/commits?author=gederer"
                title="Code"
              >
                💻
              </a>
            </td>
            <td align="center" valign="top" width="14.28%">
              <a href="https://naor.dev">
                <img
                  height="460"
                  src="https://avatars.githubusercontent.com/u/6171622?v=4?s=100"
                  width="460"
                  alt="Naor Peled"
                />
                <br />
                <sub>
                  <b>Naor Peled</b>
                </sub>
              </a>
              <br />
              <a
                href="https://github.com/qwikifiers/qwik-ui/commits?author=naorpeled"
                title="Tests"
              >
                ⚠️
              </a>{' '}
              <a
                href="https://github.com/qwikifiers/qwik-ui/commits?author=naorpeled"
                title="Code"
              >
                💻
              </a>
            </td>
            <td align="center" valign="top" width="14.28%">
              <a href="https://github.com/igalklebanov">
                <img
                  height="460"
                  src="https://avatars.githubusercontent.com/u/14938291?v=4?s=100"
                  width="460"
                  alt="Igal Klebanov"
                />
                <br />
                <sub>
                  <b>Igal Klebanov</b>
                </sub>
              </a>
              <br />
              <a
                href="https://github.com/qwikifiers/qwik-ui/commits?author=igalklebanov"
                title="Tests"
              >
                ⚠️
              </a>{' '}
              <a
                href="https://github.com/qwikifiers/qwik-ui/commits?author=igalklebanov"
                title="Code"
              >
                💻
              </a>
            </td>
            <td align="center" valign="top" width="14.28%">
              <a href="https://github.com/thejackshelton">
                <img
                  height="400"
                  src="https://avatars.githubusercontent.com/u/104264123?v=4?s=100"
                  width="400"
                  alt="Jack Shelton"
                />
                <br />
                <sub>
                  <b>Jack Shelton</b>
                </sub>
              </a>
              <br />
              <a
                href="https://github.com/qwikifiers/qwik-ui/commits?author=thejackshelton"
                title="Code"
              >
                💻
              </a>{' '}
              <a
                href="https://github.com/qwikifiers/qwik-ui/commits?author=thejackshelton"
                title="Documentation"
              >
                📖
              </a>
            </td>
            <td align="center" valign="top" width="14.28%">
              <a href="https://github.com/vasucp1207">
                <img
                  height="460"
                  src="https://avatars.githubusercontent.com/u/85363195?v=4?s=100"
                  width="460"
                  alt="Vasu Singh"
                />
                <br />
                <sub>
                  <b>Vasu Singh</b>
                </sub>
              </a>
              <br />
              <a
                href="https://github.com/qwikifiers/qwik-ui/commits?author=vasucp1207"
                title="Code"
              >
                💻
              </a>
            </td>
          </tr>
          <tr>
            <td align="center" valign="top" width="14.28%">
              <a href="https://github.com/wmertens">
                <img
                  height="460"
                  src="https://avatars.githubusercontent.com/u/54934?v=4?s=100"
                  width="460"
                  alt="Wout Mertens"
                />
                <br />
                <sub>
                  <b>Wout Mertens</b>
                </sub>
              </a>
              <br />
              <a
                href="https://github.com/qwikifiers/qwik-ui/commits?author=wmertens"
                title="Code"
              >
                💻
              </a>{' '}
              <a href="#research-wmertens" title="Research">
                🔬
              </a>{' '}
              <a href="#ideas-wmertens" title="Ideas, Planning, & Feedback">
                🤔
              </a>{' '}
              <a
                href="https://github.com/qwikifiers/qwik-ui/commits?author=wmertens"
                title="Tests"
              >
                ⚠️
              </a>{' '}
              <a
                href="https://github.com/qwikifiers/qwik-ui/commits?author=wmertens"
                title="Documentation"
              >
                📖
              </a>
            </td>
            <td align="center" valign="top" width="14.28%">
              <a href="http://zankel-engineering.de">
                <img
                  height="460"
                  src="https://avatars.githubusercontent.com/u/43412711?v=4?s=100"
                  width="460"
                  alt="Zankel-Engineering"
                />
                <br />
                <sub>
                  <b>Zankel-Engineering</b>
                </sub>
              </a>
              <br />
              <a
                href="https://github.com/qwikifiers/qwik-ui/commits?author=Zankel-Engineering"
                title="Code"
              >
                💻
              </a>{' '}
              <a
                href="https://github.com/qwikifiers/qwik-ui/commits?author=Zankel-Engineering"
                title="Tests"
              >
                ⚠️
              </a>{' '}
              <a
                href="https://github.com/qwikifiers/qwik-ui/issues?q=author%3AZankel-Engineering"
                title="Bug reports"
              >
                🐛
              </a>{' '}
              <a href="#a11y-Zankel-Engineering" title="Accessibility">
                ️️️️♿️
              </a>
            </td>
            <td align="center" valign="top" width="14.28%">
              <a href="https://github.com/adamgen">
                <img
                  height="460"
                  src="https://avatars.githubusercontent.com/u/7424209?v=4?s=100"
                  width="460"
                  alt="Adam"
                />
                <br />
                <sub>
                  <b>Adam</b>
                </sub>
              </a>
              <br />
              <a
                href="https://github.com/qwikifiers/qwik-ui/commits?author=adamgen"
                title="Documentation"
              >
                📖
              </a>{' '}
              <a
                href="https://github.com/qwikifiers/qwik-ui/issues?q=author%3Aadamgen"
                title="Bug reports"
              >
                🐛
              </a>
            </td>
            <td align="center" valign="top" width="14.28%">
              <a href="https://github.com/gparlakov">
                <img
                  height="460"
                  src="https://avatars.githubusercontent.com/u/3482199?v=4?s=100"
                  width="460"
                  alt="Georgi Parlakov"
                />
                <br />
                <sub>
                  <b>Georgi Parlakov</b>
                </sub>
              </a>
              <br />
              <a
                href="https://github.com/qwikifiers/qwik-ui/commits?author=gparlakov"
                title="Code"
              >
                💻
              </a>{' '}
              <a
                href="https://github.com/qwikifiers/qwik-ui/issues?q=author%3Agparlakov"
                title="Bug reports"
              >
                🐛
              </a>{' '}
              <a href="#maintenance-gparlakov" title="Maintenance">
                🚧
              </a>
            </td>
            <td align="center" valign="top" width="14.28%">
              <a href="https://www.linkedin.com/in/noeliadonato">
                <img
                  height="400"
                  src="https://avatars.githubusercontent.com/u/7875216?v=4?s=100"
                  width="400"
                  alt="Noelia"
                />
                <br />
                <sub>
                  <b>Noelia</b>
                </sub>
              </a>
              <br />
              <a
                href="https://github.com/qwikifiers/qwik-ui/commits?author=nsdonato"
                title="Code"
              >
                💻
              </a>{' '}
              <a href="#ideas-nsdonato" title="Ideas, Planning, & Feedback">
                🤔
              </a>{' '}
              <a href="#maintenance-nsdonato" title="Maintenance">
                🚧
              </a>
            </td>
            <td align="center" valign="top" width="14.28%">
              <a href="https://ueuie.dev">
                <img
                  height="400"
                  src="https://avatars.githubusercontent.com/u/65486851?v=4?s=100"
                  width="400"
                  alt="Alex Tocar"
                />
                <br />
                <sub>
                  <b>Alex Tocar</b>
                </sub>
              </a>
              <br />
              <a
                href="https://github.com/qwikifiers/qwik-ui/commits?author=uceumice"
                title="Code"
              >
                💻
              </a>{' '}
              <a href="#ideas-uceumice" title="Ideas, Planning, & Feedback">
                🤔
              </a>{' '}
              <a href="#maintenance-uceumice" title="Maintenance">
                🚧
              </a>
            </td>
            <td align="center" valign="top" width="14.28%">
              <a href="http://maieulchevalier.com">
                <img
                  height="460"
                  src="https://avatars.githubusercontent.com/u/45822175?v=4?s=100"
                  width="460"
                  alt="Maïeul"
                />
                <br />
                <sub>
                  <b>Maïeul</b>
                </sub>
              </a>
              <br />
              <a
                href="https://github.com/qwikifiers/qwik-ui/commits?author=maiieul"
                title="Code"
              >
                💻
              </a>{' '}
              <a href="#ideas-maiieul" title="Ideas, Planning, & Feedback">
                🤔
              </a>{' '}
              <a href="#maintenance-maiieul" title="Maintenance">
                🚧
              </a>
            </td>
          </tr>
          <tr>
            <td align="center" valign="top" width="14.28%">
              <a href="https://github.com/TheMcnafaha">
                <img
                  height="460"
                  src="https://avatars.githubusercontent.com/u/102767512?v=4?s=100"
                  width="460"
                  alt="TheMcnafaha"
                />
                <br />
                <sub>
                  <b>TheMcnafaha</b>
                </sub>
              </a>
              <br />
              <a
                href="https://github.com/qwikifiers/qwik-ui/commits?author=TheMcnafaha"
                title="Code"
              >
                💻
              </a>{' '}
              <a href="#ideas-TheMcnafaha" title="Ideas, Planning, & Feedback">
                🤔
              </a>{' '}
              <a href="#maintenance-TheMcnafaha" title="Maintenance">
                🚧
              </a>
            </td>
            <td align="center" valign="top" width="14.28%">
              <a href="https://ilteoood.xyz/">
                <img
                  height="434"
                  src="https://avatars.githubusercontent.com/u/6383527?v=4?s=100"
                  width="434"
                  alt="Matteo Pietro Dazzi"
                />
                <br />
                <sub>
                  <b>Matteo Pietro Dazzi</b>
                </sub>
              </a>
              <br />
              <a
                href="https://github.com/qwikifiers/qwik-ui/commits?author=ilteoood"
                title="Documentation"
              >
                📖
              </a>{' '}
              <a href="#maintenance-ilteoood" title="Maintenance">
                🚧
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
});
