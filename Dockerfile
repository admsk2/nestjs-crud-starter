# node LTS alpine (10.15.3)
FROM node:10.15.3-alpine

# copy app source
COPY . /app

# set workdir
WORKDIR /app

# install pm2
RUN npm install pm2 -g

# install yarn
RUN npm install yarn -g

# install deps
RUN yarn install

# run
CMD ["npm", "run", "start:dev"]