FROM node:16

WORKDIR /web

COPY . ./

RUN npm install 
# -g serve
# RUN serve -s build -l 3000
# && npm run-script build

EXPOSE 3000

# CMD ["npm", "run", "build"]
CMD [ "npm", "start" ]