FROM node:lts-alpine3.18 AS base

FROM base AS build
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
COPY tsconfig*.json ./
COPY tsconfig.build.json ./
COPY nest-cli.json ./

# Install app dependencies
RUN npm install --only=production

COPY src src

RUN npm i @nestjs/cli
RUN npm run build

FROM base AS final

WORKDIR /app

# Bundle app source
COPY --from=build node_modules /app/node_modules
COPY --from=build package.json /app/package.json
COPY --from=build dist /app/dist

EXPOSE 3001

# Start the server using the production build
CMD ["npm", "run", "start:prod"]