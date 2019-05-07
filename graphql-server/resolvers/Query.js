let AWS = require('aws-sdk');

let config = require("../config/docean.json");
// let config = require("../../config/docean.json");

let myDigiRegion = config.digiRegion;
let myDigiSpace = config.digiSpace;
let myDigiOceanKey = config.digiKey;
let myDigiSecret = config.digiSecret;
let myDigiPoint = new AWS.Endpoint(`${myDigiRegion}.digitaloceanspaces.com/`);

let s3 = new AWS.S3({
    endpoint: myDigiPoint,
    accessKeyId: myDigiOceanKey,
    secretAccessKey: myDigiSecret
});

/**
* Checks if a file is a directory
* @param {Object} digiFile the file object returned from the query to the distbu DigitalOcean Space
* @returns whether the specified file is a directory
*/
function isDir(digiFile) {
    return digiFile.Size == 0 && digiFile.Key.endsWith("/");
}

// TODO move this to its own file, not a subset of the Query resolvers 
// Implementing the resolver functions for the Dataset type.
const Dataset = {
    name: (parent) => {

    },
    files: (parent) => {

    }
}

// TODO move this to its own file, not a subset of the Query resolvers
// Implementation for resolvers of attributes on the field type.
const Files = {
    dataset: (parent) => {
        if (parent) return parent.dataset;
        else {
            // Resolve this using a request to the distbu Digi Space
        }
    },
    
    name: (parent) => {
        if (parent) return parent.name;
        else {
            // Resolve this using a request to the distbu Digi Space
        }
    },

    /**
    * This is the only place where records should be resolved.
    * Resolving them in a parent would hinder performance too much for my liking.
    */
    records: (parent) => {

    }
}

module.exports = {
    /**
    * Retrieves a single dataset parameterised by the name provided as an argument.
    */
    datasets: (parent, args, context) => {

    },
    allDatasets: () => {
        // Getting all the files stored in Digi
        s3.listObjectsV2({Bucket: myDigiSpace}, (err, data) => {
            if (err) return {}; //TODO make a suitable error object
            else {
                let myDatasets = [];

                // Parse the response to form all the dataset objects. 
                // Only directories are considered datasets.
                data.Contents.filter(isDir).forEach(myFile => {
                    let myDataset = {
                        name: myFile.Key,
                        files: []
                    };

                    // Identifying and creating each file for a specific dataset.
                    data.Contents.forEach(subFile => {  
                        if (subFile.Key.startsWith(myFile.Key)) {
                            let dataFile = {
                                dataset: myFile.Key,
                                name: subFile.Key.replace(myFile.Key, "")
                            };

                            myDataset.files.push(dataFile);
                        }
                    });

                    myDatasets.push(myDataset);
                });

                return myDatasets;
            }
        });
    }
};