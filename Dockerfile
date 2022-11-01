FROM node:16

ENV PORT=3000

WORKDIR /web

COPY . ./

RUN npm install 
# -g serve
# RUN serve -s build -l 3000
# && npm run-script build

EXPOSE $PORT

# CMD ["npm", "run", "build"]
CMD [ "npm", "start" ]