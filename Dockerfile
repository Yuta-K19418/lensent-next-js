FROM node:16-alpine3.14

WORKDIR /app
COPY . .
RUN yarn install --network-timeout 120000
RUN yarn add next
RUN yarn next build

EXPOSE 3000
CMD ["yarn", "start"]
