FROM node:18-slim

WORKDIR /app
COPY package*.json ./
RUN npm ci
RUN npm prune --omit=dev

COPY . .
EXPOSE 8080

CMD ["npm", "start"]