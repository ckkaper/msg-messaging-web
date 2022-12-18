FROM node:14.16.0

ENV NODE_ENV=dev

WORKDIR /

COPY . .

RUN npm install

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
