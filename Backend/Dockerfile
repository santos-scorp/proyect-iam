FROM node:latest
RUN mkdir /src
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["nodemon", " src/server.js"]