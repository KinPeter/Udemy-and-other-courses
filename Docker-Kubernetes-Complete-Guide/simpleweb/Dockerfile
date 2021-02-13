# set up base image
# :alpine gets the smallest possible build of node
FROM node:alpine

# set working directory on the container file system
# COPY command will be relative to this dir
WORKDIR /usr/app

# first copy only package.json and run npm install, so it will be
# cached to a separate image, and whenever we change source code
# it won't install dependencies again and again
COPY ./package.json ./
RUN npm install

# copy all other files - source code
COPY ./ ./

# default command to start the app
CMD ["npm", "start"]