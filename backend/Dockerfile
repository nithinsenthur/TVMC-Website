FROM node:20
WORKDIR /app
COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
COPY ./api ./api
COPY ./dao ./dao
COPY ./client ./client
COPY ./other ./other
COPY ./schema ./schema
COPY ./index.js ./index.js
COPY ./mail.js ./mail.js
COPY ./server.js ./server.js
COPY ./storage.js ./storage.js
ENV NODE_ENV production
RUN npm install
RUN npm run heroku-postbuild
CMD ["npm","start"]
