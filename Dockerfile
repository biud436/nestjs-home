FROM node:alpine
WORKDIR /usr/src/nestjs-app
COPY package*.json ./
RUN npm install
COPY . .
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 3002
CMD [ "node", "run", "start:prod" ]