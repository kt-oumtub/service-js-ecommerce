FROM node:20-alpine

RUN mkdir -p /usr/src/app/src
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
COPY ./src /usr/src/app/src
COPY ./.env /usr/src/app/
RUN npm install

USER node
EXPOSE 9000

CMD ["npm","run","startprd"]
