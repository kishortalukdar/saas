# Stage 1: Build stage

FROM node:21.6.1 AS build

WORKDIR /build_folder

COPY package*.json ./
RUN npm install 

# Stage 2: Production stagess

FROM node:21.6.1-slim AS runner

WORKDIR /app

COPY --from=build /build_folder /app

COPY . .

EXPOSE 5003

CMD ["npm", "run", "dev"]