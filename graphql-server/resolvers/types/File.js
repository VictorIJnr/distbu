const s3 = require("../../s3");

// Implementation for resolvers of attributes on the field type.
module.exports = {
    dataset: (parent) => {
        return parent.dataset;
    },
    
    name: (parent) => {
        return parent.name;
    },

    /**
    * This is the only place where records should be resolved.
    * Resolving them in a parent would hinder performance too much for my liking.
    */
    records: async (parent) => {
        let myData = [];

        let myPromise = new Promise((resolve, reject) => {

        });

        await myPromise.then(data => myData = data);
        return myData;
    }
}