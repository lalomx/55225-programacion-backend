FROM node:18-slim

WORKDIR /app

COPY package*.json .

RUN npm ci
RUN npm prune --omit=dev

COPY . .

CMD ["node", "./index.js"]