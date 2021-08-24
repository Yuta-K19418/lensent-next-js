FROM node:16-alpine3.14 AS base

WORKDIR /base
COPY . .
RUN yarn install --network-timeout 120000

FROM base AS builder
WORKDIR /build
COPY --from=base /base ./

FROM node:16-alpine3.14
WORKDIR /app
COPY --from=builder /build/package.json /build/yarn.lock ./
COPY --from=builder /build/.next ./.next
COPY --from=builder /build/public ./public
RUN yarn add next

EXPOSE 3000
CMD ["yarn", "start"]