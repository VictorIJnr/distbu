const express = require("express");
const router = express.Router();
const AWS = require("aws-sdk");

const { ApolloClient, InMemoryCache } = require("apollo-boost");
const { createHttpLink } = require("apollo-link-http");
const gql = require("graphql-tag");

const config = require("../config/docean.json")

let myDigiRegion = config.digiRegion;
let myDigiSpace = config.digiSpace;
let myDigiOceanKey = config.digiKey;
let myDigiSecret = config.digiSecret;
let myDigiPoint = new AWS.Endpoint(`${myDigiRegion}.digitaloceanspaces.com/`);

/**
* For some reason it doesn't work directly with the properties in config.
* And, no, they're not different. I checked, they're exactly identical.
*/
let s3 = new AWS.S3({
    endpoint: myDigiPoint,
    accessKeyId: myDigiOceanKey,
    secretAccessKey: myDigiSecret
});

// Need to use the IP of the container, it's not localhost. 
const endpointQL = "http://172.17.0.2:20794/";
const link = createHttpLink({
    uri: endpointQL,
    fetch: require("node-fetch"),
});

let clientQL = new ApolloClient({
    uri: endpointQL,
    cache: new InMemoryCache(),
    link
});

/**
* Index to yeet back a list of files stored on DigitalOcean
* It's actually a little bit more than that because I don't do any pre-processing
* but it's fine. Trust me. You know what, I'm getting rid of that useless loop.
*
* UPDATE: It's Friday the 26th of April 2019, I haven't worked on this in a while
* but it looks like I got rid of "that useless loop". 
*/
router.get("/", function(req, res) {
    let digiParams = {
        Bucket: myDigiSpace
    }

    s3.listObjectsV2(digiParams, (err, data) => {
        if (err) res.send(err);
        else res.send(data);
    });
});

/**
* Retrieves a specified dataset from the database where it's stored.
*/
router.get("/:dataset/:type", function(req, res) {    
    clientQL.query({
        query: gql`{
            datasets(myName: ${JSON.stringify(req.params.dataset)}) {
                files(matchName: ${JSON.stringify(req.params.type)}) {
                    records(skip: 100, trainSplit: 0.75)
                }
            }
        }`
    })
    .then(response => {
        res.send(response.data.datasets.files[0].records);
    });
});

module.exports = router;