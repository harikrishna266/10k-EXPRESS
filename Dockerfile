FROM node:14-alpine


WORKDIR /usr/src/app
COPY ./build/ /usr/src/app

RUN npm ci

CMD ["node", "app.js"]








