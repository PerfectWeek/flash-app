FROM node:latest

COPY . /app

WORKDIR /app

RUN npm install
RUN npm i -g serve
RUN npm run build

EXPOSE 5000

CMD ["npm","start"]
