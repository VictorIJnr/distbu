const { GraphQLServer} = require("graphql-yoga");
const { Prisma} = require("prisma-binding");

const mutation = require("./resolvers");

let app; //Define this to a graphql server

app.start({port: 20793}, () => "Running on port.");