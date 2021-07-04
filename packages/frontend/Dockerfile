FROM node:lts-jessie-slim

RUN mkdir /srv/frontend
WORKDIR /srv/frontend

COPY package*.json /srv/frontend/

RUN npm i

COPY . /srv/frontend

CMD ["npm", "start"]