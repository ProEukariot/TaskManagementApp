# Build image
FROM node:alpine AS build

WORKDIR /app

COPY package.json *.lock ./

RUN yarn install --frozen-lockfile

COPY ./ ./

RUN yarn run build

# Runtime image
FROM nginx:alpine AS runtime

WORKDIR /app

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]