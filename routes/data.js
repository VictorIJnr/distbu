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
 * Just an endpoint to test stuff I'm working on with the GraphQL server
 */
router.get("/choochoo", function(req, res) {
    clientQL.query({
        query: gql`{
            allDatasets {
                name
            }
        }`
    })
    .then(response => {
        console.log(response);
        res.send(response);
    });
});

/**
 * Retrieves a specified dataset from the database where it's stored.
 */
router.get("/:dataset/:type", function(req, res) {
    let digiParams = {
        Bucket: myDigiSpace,
        Key: `data/${req.params.dataset}/${req.params.type}`,
        ResponseContentType: "application/json"
    }

    getFile(req.params.dataset, req.params.type)
    .then((data) => {
        /**
        * I don't know what was wrong with me the last time I was working on this.
        * First "choo choo", now "la la". Maybe I was having a breakdown or something.
        * Idk but they're staying here forever now. Why? Because I said so. 
        * 
        * 26th April: Yeah imma comment them out though. Sorry.
        */

        /* console.log("la la");
        console.log(data);
        console.log("transed");
        console.log(data.Body); */
        res.send(JSON.parse(data.Body));
    })
    .catch((err) => res.send(err));
});

function getFile(dataset, file) {
    let digiParams = {
        Bucket: myDigiSpace
    }

    console.log(`Requesting:\t${dataset}/${file}`);
    
    let slippy = new Promise((resolve, reject) => {
        getFileType(dataset, file)
        .then((extension) => {
            /**
            * I stopped working on this for a month and a half. 
            * I came back, ran distbu, requested train.json (standard)
            * then I saw "choo choo" in the console. NGL I thought it was 
            * pretty funny. 
            */
            console.log("choo choo");
            digiParams.Key = `data/${dataset}/${file}.${extension}`;
            s3.getObject(digiParams, (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        })
        .catch((err) => reject(err));
    }); 

    return slippy;
}

/**
* Gets the extension for the requested file.z file from 
* @param {String} fileName the file to be retrieved from that dataset
*/
function getFileType(dataset, fileName) {
    //TODO change this to query the GraphQL server.

    let digiParams = {
        Bucket: myDigiSpace,
        StartAfter: `data/${dataset}`
    };

    let typePromise = new Promise((resolve, reject) => {
        s3.listObjectsV2(digiParams, (err, data) => {
            if (err) res.send(err);
            else {
                let extension;
                data.Contents.forEach(file => {
                    //Omitting folders (also any empty file)
                    if (file.Size != 0) {
                        let name = file.Key.substring(file.Key.lastIndexOf("/") + 1);
                        if (name.substring(0, name.lastIndexOf(".")) === fileName)
                            extension = name.substring(name.lastIndexOf(".") + 1);
                    } 
                });

                // Because j comes after c in the alphabet, I always get the JSON file back
                // That's what I want, but if I have scalability issues with file types somehow
                // just look here. That was accidental btw, I just discovered it after
                // adding CSV to JSON conversion.
                console.log(`File Extension:\t${extension}`);
                if (extension) resolve(extension);
                else reject("File not found");
            }
        });
    });

    
    return typePromise;
}

function sendError(message) {
    let error = {
        msg: message,
        status: 400
    };

    return error;
}

module.exports = router;