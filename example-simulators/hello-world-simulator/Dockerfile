FROM node

# Create app directory
WORKDIR /hello-world-simulator

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY . . 

EXPOSE 3000/tcp


RUN npm install

CMD [ "npm", "start" ]
