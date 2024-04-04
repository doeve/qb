FROM node:14

WORKDIR /home/web/brewise
COPY package*.json ./
RUN npm install
COPY . .

CMD ["npm", "start"]
