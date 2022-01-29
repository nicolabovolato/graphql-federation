FROM node:16-alpine
WORKDIR /usr/app

RUN npm i prisma

CMD ["npx", "prisma", "migrate", "deploy"]
