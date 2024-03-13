FROM node:17
WORKDIR /usr/app
COPY package.json .
RUN npm install\
    && npm install typescript -g
COPY . .
RUN npm run test
RUN npm run prisma:generate
RUN npm run build
CMD ["npm", "run", "start"]