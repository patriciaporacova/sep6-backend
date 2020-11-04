FROM node:14-slim

WORKDIR /usr/src/app

ADD . /usr/src/app

#COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

#COPY . .

RUN npm install -g nodemon

CMD ["npm", "start"]

