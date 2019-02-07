FROM node

# Create app directory
WORKDIR /web-client

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY ./build ./build 

EXPOSE 5000

RUN npm install
RUN npm install -g serve


CMD serve -s build

