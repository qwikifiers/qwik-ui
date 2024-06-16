import os from 'os';
import decompress from 'decompress';
import fs from 'fs';

let progressValue = 0;

function printProgress(progress: number) {
  if (progress % 5 === 0 && progressValue !== progress) {
    console.log(`Download ${progress}% complete ⏬`);
    progressValue = progress;
  }
}

async function prepareChrome113() {
  const path = `browsers/chrome/108/chrome-${os.platform()}`;

  if (fs.existsSync(path)) {
    console.log('Chrome 108 already exists. Skipping unzip ⏩');
  } else {
    console.log('Creating directory to save the browser 🌐');
    fs.mkdirSync(path, { recursive: true });

    const downloadResponse = await fetch(
      `https://github.com/qwikifiers/qwik-ui-polyfill-browsers/raw/main/chrome/108/chrome-${os.platform()}.zip`,
    );

    const contentLength = downloadResponse.headers.get('content-length');
    const total = parseInt(contentLength ?? '0', 10);
    let loaded = 0;

    const res = new Response(
      new ReadableStream({
        async start(controller) {
          if (!downloadResponse.body) {
            throw new Error(
              'Invalid response received when trying to download Chrome 108',
            );
          }

          const reader = downloadResponse.body.getReader();
          for (;;) {
            const { done, value } = await reader.read();
            if (done) break;
            loaded += value.byteLength;
            printProgress(Math.round((loaded / total) * 100));

            controller.enqueue(value);
          }
          controller.close();
        },
      }),
    );

    await decompress(
      Buffer.from(await res.arrayBuffer()),
      `browsers/chrome/108/chrome-${os.platform()}`,
      { strip: 1 },
    );
  }
}

await prepareChrome113();
