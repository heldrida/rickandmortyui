FROM node:lts-alpine3.12

RUN apk update \
 && apk upgrade \
 && apk add git

RUN mkdir -p /var/www/

WORKDIR /var/www/

COPY ./ ./

RUN yarn && yarn install && echo "Done!"

EXPOSE 8080

CMD ["npx", "http-server", "-p", "8080", "./dist"]
