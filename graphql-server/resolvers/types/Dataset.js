// Implementing the resolver functions for the Dataset type.
module.exports = {
    name: (parent) => {
        return parent.name;
    },
    files: (parent, args) => {
        let retValue = parent.files;

        if (args.nameContains)
            retValue = retValue.filter((file => file.name.includes(args.nameContains)));

        return retValue;
    }
};