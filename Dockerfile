FROM node:18.17-slim
WORKDIR /usr/src/app
ENV DATABASE_URL "postgresql://postgres:passw0rd@host.docker.internal:5432/postgres"
COPY package*.json ./
RUN npm install
ADD .env ./
ADD tsconfig.json ./
ADD tsconfig.server.json ./
ADD tsconfig.build.json ./
COPY . .
RUN npm run build
ADD dist ./
EXPOSE 3001
CMD [ "npm", "run" , "start" ]
