FROM node:latest

WORKDIR /distbu

COPY package.json /distbu
COPY config/ /distbu/config
COPY graphql-server/ /distbu

RUN ls
RUN npm install

# Start the server when the container is invoked
# ENTRYPOINT ["npm", "run", "graphql-docker"]
ENTRYPOINT "bash"