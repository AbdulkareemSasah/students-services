FROM oven/bun as build
RUN mkdir -p /app
WORKDIR /app


COPY package.json /app/
RUN bun install

COPY . /app/
RUN bun build

FROM nginx
COPY --from=build /app/dist/ /usr/share/nginx/html




