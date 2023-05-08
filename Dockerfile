FROM node:18.16-slim as first

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json package.json
COPY yarn.lock yarn.lock

RUN yarn install

COPY . .

RUN yarn compile \
  && yarn install --production --ignore-scripts --prefer-offline \
  && yarn cache clean

FROM node:18.16-slim

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY --from=first /usr/src/app/dist dist
COPY --from=first /usr/src/app/package.json package.json
COPY --from=first /usr/src/app/node_modules node_modules

CMD yarn start

