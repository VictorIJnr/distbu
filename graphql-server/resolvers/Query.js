let AWS = require('aws-sdk');

let config = require("../config/docean.json")

let s3 = new AWS.S3({
    endpoint: myDigiPoint,
    accessKeyId: myDigiOceanKey,
    secretAccessKey: myDigiSecret
});

//Implementing the resolver functions for the Dataset type.
const Dataset = {
    name: (parent) => {

    },
    files: (parent) => {

    }
}

//Implementation for resolvers of attributes on the field type.
const Files = {
    dataset: (parent) => {

    },
    name: (parent) => {

    },
    //djaslf
    records: (parent) => {

    }
}

module.exports = {
    datasets: (parent, args, context) => {

    },
    allDatasets: () => {
        //List objects in Digi
        let digiParams = {
            Bucket: myDigiSpace
        }
    
        s3.listObjectsV2(digiParams, (err, data) => {
            if (err) return {}; //TODO make a suitable error object
            else {
                //Parse the response to form all the dataset objects. 
                res.send(data);
            }
        });
    },
    Dataset,
    Files
};