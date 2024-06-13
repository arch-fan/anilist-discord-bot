FROM oven/bun:alpine as base

WORKDIR /bot

FROM base as build

COPY package.json bun.lockb .env ./

RUN bun install

COPY . .

RUN bun run build

FROM base as production

COPY --from=build /bot/dist ./dist
COPY package.json .env ./

CMD [ "bun", "run", "start" ]