FROM node

WORKDIR /app

COPY package.json .

RUN npm i

COPY ./dist .

EXPOSE 3000

CMD ["ls"]

CMD ["node","main.js"]