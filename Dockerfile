FROM node:20-alpine as build

WORKDIR /bot

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml .env ./

RUN pnpm install

COPY . .

RUN pnpm run build

FROM node:20-alpine as production

WORKDIR /bot

COPY --from=build /bot/dist ./dist

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml .env ./

RUN pnpm install -P

CMD [ "pnpm", "start" ]