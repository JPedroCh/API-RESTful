FROM node:lts-alpine

WORKDIR /app

COPY . /app

RUN npm install

EXPOSE 4001

CMD ["npm", "start"]