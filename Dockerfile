FROM mcr.microsoft.com/playwright:v1.43.0-jammy

WORKDIR /dev

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN npm i -g pnpm
RUN pnpm install --frozen-lockfile

RUN pnpm playwright install --with-deps

COPY packages/kit-headless ./packages/kit-headless
COPY packages/kit-styled ./packages/kit-styled
COPY apps/component-tests ./packages/component-tests

CMD ["pnpm", "test.pw.visual-headless"]