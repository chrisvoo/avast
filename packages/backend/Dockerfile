FROM node:lts-jessie-slim

RUN mkdir /srv/backend
WORKDIR /srv/backend

COPY package*.json /srv/backend/

RUN npm i

COPY . /srv/backend

CMD ["npm", "run", "dev"]