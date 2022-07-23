FROM node:16.15.1-alpine3.15 AS BUILDER

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile --ignore-scripts

COPY . .

RUN yarn build

RUN yarn install --production --frozen-lockfile --ignore-scripts --prefer-offline

FROM node:16.15.1-alpine3.15

WORKDIR /app

RUN apk --no-cache add tini

ENV NODE_ENV production

RUN adduser -D node-user -G node
USER node-user

COPY --chown=node-user:node --from=BUILDER /app .

ENTRYPOINT ["/sbin/tini", "--"]

CMD ["node", "/app/dist", "--max-old-space-size=400"]
