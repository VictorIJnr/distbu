const { GraphQLServer } = require("graphql-yoga");
// const { Prisma } = require("prisma-binding");

const schema = "./schema.graphql";
// const schema = "./graphql-server/schema.graphql";

const queries = require("./resolvers/Query");
const mutations = require("./resolvers/Mutation");
const subscriptions = require("./resolvers/Subscription");

const dataset = require("./resolvers/types/Dataset");
const fileQL = require("./resolvers/types/File");

//! Add mutations and subscribtions to the resolvers when they're implemented
let app = new GraphQLServer({
    typeDefs: schema,
    resolvers: {Query: queries, Dataset: dataset, File: fileQL}
});

let myOptions = {
    endpoint: "/api/graphql", 
    port: 20794
};

app.start(myOptions, () => console.log("Running on port 20794."));