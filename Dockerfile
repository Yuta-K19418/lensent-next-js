FROM node:16-alpine3.14

WORKDIR /app
COPY . .
RUN yarn install --network-timeout 120000
RUN yarn add next
ENV NEXT_PUBLIC_AUDIENCE https://backend.lensent.tk/api
ENV NEXT_PUBLIC_TRANSLATION_API_URL https://script.google.com/macros/s/AKfycbyzmZMNyYMo17YU-mf18_4SwoS7OlI3SjQddlSw4PycGGt_Ms8LHCYSI8AddZjTWEdFMA/exec
RUN yarn next build

EXPOSE 3000
CMD ["yarn", "start"]
