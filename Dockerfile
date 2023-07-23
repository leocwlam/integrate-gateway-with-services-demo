FROM node

RUN mkdir -p /home/app

COPY ./.env /home/app/.env
COPY ./src /home/app
COPY ./node_modules /home/app/node_modules

EXPOSE 4000

CMD [ "node", "/home/app/server.js" ]
