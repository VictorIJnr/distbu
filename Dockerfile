FROM node:latest

WORKDIR /distbu

COPY package.json /distbu
COPY config/ /distbu/config
# COPY graphql-server/ /distbu

RUN npm install
RUN mkdir /tempbu
RUN mv * /tempbu

EXPOSE 20794

# Start the server when the container is invoked
# ENTRYPOINT ["npm", "run", "graphql-docker"]
ENTRYPOINT "bash"