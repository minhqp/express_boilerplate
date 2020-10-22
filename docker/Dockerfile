FROM node:12.19.0
WORKDIR /app
RUN ls
COPY package.json .
RUN npm i
COPY . .
RUN ls
CMD ["npm", "start"]
