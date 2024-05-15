FROM mcr.microsoft.com/playwright:v1.43.0-jammy

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /opt

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

RUN pnpm playwright install --with-deps

COPY packages/kit-headless ./packages/kit-headless
COPY packages/kit-styled ./packages/kit-styled
COPY apps/component-tests ./apps/component-tests
COPY . .

#ENV DEBUG="pw:browser"
#ENV NX_VERBOSE_LOGGING=true
CMD ["pnpm", "test.headless.visual"]