const { ApolloServer, gql } = require("apollo-server");
const fs = require("fs");

// Reading the schema file because I was too lazy to copy it into a JS file.
// Plus, I kinda wanted to keep the .graphql extension - makes it clear what it is.
const mySchema = fs.readFileSync("./schema.graphql"); 

const queries = require("./resolvers/Query");
const mutations = require("./resolvers/Mutation");
const subscriptions = require("./resolvers/Subscription");

const dataset = require("./resolvers/types/Dataset");
const fileQL = require("./resolvers/types/File");

//! Add mutations and subscribtions to the resolvers when they're implemented
let app = new ApolloServer({
    typeDefs: gql`${mySchema}`,
    resolvers: {Query: queries, Dataset: dataset, File: fileQL}
});

let myOptions = {
    host: "0.0.0.0",
    path: "/api/graphql", // This just gets ignored, fun. I knew it would though, I saw the docs.
    port: 20794
};

app.listen(myOptions).then(({url}) => console.log(`Running at ${url}.`));