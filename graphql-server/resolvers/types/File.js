const { s3, myDigiSpace } = require("../../s3");

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
    records: async (parent) => {
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

        await myPromise.then(data => myData = data.Body);
        return JSON.parse(myData);
    }
}