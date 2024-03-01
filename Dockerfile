# Stage 1
FROM node:18-alpine as node
LABEL org.opencontainers.image.source = "https://github.com/UntitleCMS/WebUIService"

WORKDIR /app
COPY package* .
RUN npm install
COPY . .
RUN npm run build:prod
# Stage 2
FROM nginx:alpine
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=node /app/dist/betablog/browser /usr/share/nginx/html
