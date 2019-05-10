// Implementing the resolver functions for the Dataset type.
module.exports = {
    name: (parent) => {
        return parent.name;
    },
    files: (parent) => {
        return parent.files;
    }
};