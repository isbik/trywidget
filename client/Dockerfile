FROM node:16-alpine

WORKDIR /app

COPY package*.json  ./

RUN npm install --quiet --only=production

COPY . .

RUN npm run --silent build


CMD npm run start
