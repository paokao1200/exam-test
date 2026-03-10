# Build Stage
FROM node:20-alpine as build
WORKDIR /app
COPY react-app/package*.json ./
RUN npm install
COPY react-app .
RUN npm run build

# Runtime Stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
#CMD [ "nginx","-g","daemon off" ]