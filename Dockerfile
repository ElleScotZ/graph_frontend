FROM node:16

ENV PORT=3000

WORKDIR /web

COPY . ./

RUN npm install 

EXPOSE $PORT

CMD [ "npm", "run", "build" ]