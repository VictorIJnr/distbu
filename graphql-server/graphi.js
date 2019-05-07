const { GraphQLServer } = require("graphql-yoga");
// const { Prisma } = require("prisma-binding");

const schema = "./graphql-server/schema.graphql";

const queries = require("./resolvers/Query");
const mutations = require("./resolvers/Mutation");
const subscriptions = require("./resolvers/Subscription");

//! Add mutations and subscribtions to the resolvers when they're implemented
let app = new GraphQLServer({
    typeDefs: schema,
    resolvers: {Query: queries}
});

app.start({port: 20794}, () => console.log("Running on port 20794."));