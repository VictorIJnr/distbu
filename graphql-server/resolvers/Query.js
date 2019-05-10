let { s3, myDigiSpace } = require("../s3");

/**
* Checks if a file is a directory
* @param {Object} digiFile the file object returned from the query to the distbu DigitalOcean Space
* @returns whether the specified file is a directory
*/
function isDir(digiFile) {
    return digiFile.Size == 0 && digiFile.Key.endsWith("/");
}

/**
 * Creates a Dataset object based on the request returned by Digi. 
 * @param {Object} currFile the current file from Digi being processed
 * @param {Object} resData the data returned from the request to Digi
 */
function makeDataset(currFile, resData) {
    let myDataset = {
        name: currFile.Key,
        files: []
    };

    // Identifying and creating each file for a specific dataset.
    resData.Contents.forEach(subFile => {  
        if (subFile.Key !== currFile.Key && subFile.Key.startsWith(currFile.Key)) {
            let dataFile = {
                dataset: currFile.Key,
                name: subFile.Key.replace(currFile.Key, "")
            };

            myDataset.files.push(dataFile);
        }
    });

    return myDataset;
}

module.exports = {
    /**
    * Retrieves a single dataset parameterised by the name provided as an argument.
    */
    datasets: async (parent, args, context) => {
        let retValue = {};

        // Need to use a Promise so the request to Digi is made and returned
        // as a part of the resolution.
        let myPromise = new Promise((resolve, reject) => {
            let digiParams = {
                Bucket: myDigiSpace,
                Prefix: `data/${args.myName}`
            };
    
            // Getting all the files stored in Digi
            s3.listObjectsV2(digiParams, (err, data) => {
                if (err) reject(err); //TODO make a suitable error object
                else data.Contents.filter(isDir).forEach(myFile => resolve(makeDataset(myFile, data)));
            });
        });

        // Returning the value in the scope of the Promise doesn't work, even if it's awaited
        await myPromise.then(dataset => retValue = dataset);
        return retValue;
    },
    allDatasets: async () => {
        let retValue = [];

        let myPromise = new Promise((resolve, reject) => {
            // Getting all the files stored in Digi
            s3.listObjectsV2({Bucket: myDigiSpace}, async (err, data) => {
                if (err) reject(err); //TODO make a suitable error object
                else {
                    let myDatasets = [];
    
                    // Parse the response to form all the dataset objects. 
                    // Only directories are considered datasets.
                    await data.Contents.filter(isDir)
                        .forEach(myFile => myDatasets.push(makeDataset(myFile, data)));
                    
                    resolve(myDatasets);
                }
            })
        });

        await myPromise.then((myDatasets) => {retValue = myDatasets});
        return retValue;
    }
};