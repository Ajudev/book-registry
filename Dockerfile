FROM node:16.16

WORKDIR /usr/app
COPY . .

RUN npm i --quiet