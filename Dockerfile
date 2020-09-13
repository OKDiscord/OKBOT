FROM node:12

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN yarn

COPY . .

CMD ["yarn", "start"]
