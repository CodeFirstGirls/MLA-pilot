# Build stage
FROM node:18 AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "start:docker"]
