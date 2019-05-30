const { s3, myDigiSpace } = require("../../s3");

/**
 * Shuffles array in place.
 * @param {Array} myArray items An array containing the items.
 */
function shuffle(myArray) {
    for (let i = myArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [myArray[i], myArray[j]] = [myArray[j], myArray[i]];
    }
    return myArray;
}

// Implementation for resolvers of attributes on the field type.
module.exports = {
    dataset: (parent) => {
        return parent.dataset;
    },
    
    name: (parent, args) => {
        return parent.name;
    },

    /**
    * This is the only place where records should be resolved.
    * Resolving them in a parent would hinder performance too much for my liking.
    */
    records: async (parent, args) => {
        let myData = [];
        let digiParams = {
            Bucket: myDigiSpace,
            Key: parent.dataset + parent.name
        };

        let myPromise = new Promise((resolve, reject) => {
            s3.getObject(digiParams, (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });

        // Can't progress unless the data has been loaded from the database
        await myPromise.then(data => myData = JSON.parse(data.Body));
        
        // Arranging the data appropriate for pagination
        if (args.skip) {
            let startIndex = args.first ? args.first : 0;
            myData = myData.slice(startIndex, args.skip);
        }

        if (args.shuffle) myData = shuffle(myData);

        // Making sure an appropriate train/test split can be carried out.
        if (args.trainSplit && args.trainSplit > 0 && args.trainSplit < 1) {
            let splitData = {};
            let splitIndex = myData.length * args.trainSplit;

            splitData.train = myData.slice(0, splitIndex);
            splitData.test = myData.slice(splitIndex);

            myData = splitData;
        }

        return myData;
    }
}