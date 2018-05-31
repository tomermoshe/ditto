FROM node

# Create app directory
WORKDIR /simulations-manager

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY . . 



RUN npm install

#COPY docker-entrypoint.sh /usr/local/bin/

#ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]


CMD [ "npm", "start" ]
