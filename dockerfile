FROM node:latest

COPY . /app

WORKDIR /app

RUN npm install
RUN npm i -g serve

EXPOSE 5000

CMD ["npm","start"]
