FROM node

RUN mkdir -p /home/app

COPY ./src /home/app
COPY ./node_modules /home/app/node_modules

CMD [ "node", "/home/app/server.js" ]
