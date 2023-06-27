# syntax=docker/dockerfile:1.2

ARG NODE_VERSION=18.12-bullseye

# ----------------------------------------
FROM node:18.12-bullseye as dev

ENV HOME /home/node
WORKDIR $HOME/app

# ----------------------------------------
FROM node:18.12-bullseye as dev_packages

ENV HOME /home/node
WORKDIR $HOME/app

COPY package.json yarn.lock .npmrc $HOME/app/

RUN --mount=type=secret,id=npmrc,dst=/home/node/.npmrc,mode=0444 \
    yarn install --frozen-lockfile

# ----------------------------------------
FROM node:18.12-bullseye as prod_packages

ENV HOME /home/node
WORKDIR $HOME/app

COPY package.json yarn.lock .npmrc $HOME/app/
RUN chown -R node:node $HOME
USER node

RUN --mount=type=secret,id=npmrc,dst=/home/node/.npmrc,mode=0444 \ 
    yarn install --frozen-lockfile --production=true

RUN chown node:node $HOME/app/node_modules

# ----------------------------------------
FROM node:18.12-bullseye as builder

ENV HOME /home/node
WORKDIR $HOME/app

COPY --from=dev_packages $HOME/app/node_modules $HOME/app/node_modules

COPY package.json tsconfig.json tsconfig.base.json tsconfig.build.json $HOME/app/
ADD src $HOME/app/src/

RUN yarn build

RUN chown -R node:node $HOME/app/build

# ----------------------------------------
FROM node:18.12-bullseye-slim as prod

ARG SENTRY_RELEASE

ENV HOME /home/node
ENV NODE_ENV production

WORKDIR $HOME/app

COPY package.json yarn.lock $HOME/app/
ADD migrations $HOME/app/migrations/

RUN chown -R node:node $HOME

COPY --from=prod_packages $HOME/app/node_modules $HOME/app/node_modules
COPY --from=builder $HOME/app/build $HOME/app/build

RUN chown node:node $HOME/app/node_modules
RUN chown node:node $HOME/app/build

ENV SENTRY_RELEASE ${SENTRY_RELEASE}

USER node
