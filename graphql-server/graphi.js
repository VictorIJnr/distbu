const { GraphQLServer } = require("graphql-yoga");
const { Prisma } = require("prisma-binding");

const schema = "./schema.graphql"

const queries = require("./resolvers/Query");
const mutations = require("./resolvers/Mutation");
const subscriptions = require("./resolvers/Subscription");

const resovlers = {
    Query: queries,
    Mutation: mutations,
    Subscription: subscriptions
};

let app = new GraphQLServer({
    typeDefs: schema,
    resolvers
});

app.start({port: 20793}, () => "Running on port.");