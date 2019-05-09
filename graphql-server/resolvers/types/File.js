// Implementation for resolvers of attributes on the field type.
module.exports = {
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