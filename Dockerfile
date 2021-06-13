FROM node:14.17-alpine
USER node
WORKDIR /usr/src/app
COPY package*.json .
RUN npm install
COPY . .
CMD [ "npm", "start"]