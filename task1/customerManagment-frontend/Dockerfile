FROM node:18.2.0-alpine AS build
RUN mkdir /app
WORKDIR /app
COPY package.json /app
RUN npm install -g npm@9.2.0
COPY . /app
RUN npm run build


# Stage 2
FROM nginx:1.17.1-alpine
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]