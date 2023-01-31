FROM node:18

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

ENV PORT=3500

ENV DATABASE_URL="file:./dev.db"

RUN npx prisma generate

RUN npx prisma migrate deploy

CMD ["node", "build"]
