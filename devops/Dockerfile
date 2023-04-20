FROM node:18 as video_party_client
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
RUN yarn
COPY ./ ./
RUN yarn build && yarn prod

FROM nginx:1.23.1-alpine as edu_start_app
COPY --from=video_party_client /app/build /usr/share/nginx/html
COPY ./docker/nginx/nginx-custom.conf /etc/nginx/conf.d/default.conf
COPY ./docker/nginx/nginx.conf /etc/nginx/nginx.conf

EXPOSE 3000
