// Implementing the resolver functions for the Dataset type.
module.exports = {
    name: (parent) => {
        if (parent) return parent.name;
        else return "nope"; //TODO
    },
    files: (parent) => {
        if (parent) return parent.files;
        else return []; //TODO
    }
};