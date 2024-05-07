FROM node:20

ENV DB_HOST=localhost
ENV DB_PORT=5432
ENV DB_USERNAME=postgres
ENV DB_PASSWORD=12345678
ENV DB_NAME=superheroidb
ENV DATABASE_MONGO_URL='mongodb://mongodbteste:12345678asdasd@localhost:27017/superheroidb4'
ENV JWT_SECRET=541a94be6r4b7d6rt4jum14j19fmty54jmft
ENV JWT_EXPIRATION_TIME=3600
ENV JWT_REFRESH_SECRET=t58kq9340bit4m45ers89g47se89r47
ENV JWT_REFRESH_EXPIRATION_TIME=13600

WORKDIR /app

COPY package*.json ./

RUN npm install

EXPOSE 3000

COPY . .

RUN npm run build

CMD [ "npm", "run", "start:dev" ]