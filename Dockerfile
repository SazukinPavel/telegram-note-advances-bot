FROM node

WORKDIR /app

COPY package.json ./
COPY tsconfig.json ./

COPY ./src ./app

RUN npm i
RUN npm run build


EXPOSE 3000

CMD ["node","./dist/main.js"]