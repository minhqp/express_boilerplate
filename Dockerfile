FROM node:12.19.0
WORKDIR /app
COPY package.json .
RUN npm i
COPY . .
CMD ["npm", "start"]
