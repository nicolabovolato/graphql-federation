FROM node:16-alpine
WORKDIR /usr/app

COPY package.json .
COPY package-lock.json .
RUN npm ci

COPY . .
RUN npx prisma generate

EXPOSE 3000
ENTRYPOINT ["npm", "start"]
