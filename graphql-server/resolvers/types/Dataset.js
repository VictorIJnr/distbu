// Implementing the resolver functions for the Dataset type.
module.exports = {
    name: (parent) => {
        return parent.name;
    },
    files: (parent, args) => {
        let retValue = parent.files;

        if (args.nameContains) 
            retValue = retValue.filter((myFile => myFile.name.includes(args.nameContains)));
        
        if (args.matchName) {
            let extensions = [];

            // Adding the period ensures that other files with the same prefix aren't matched
            retValue = retValue.filter((myFile => myFile.name.startsWith(args.matchName + ".")));

            retValue.forEach(myFile => {
                extensions.push(myFile.name.substring(myFile.name.lastIndexOf(".") + 1));
            });

            //? I don't know what I'll do here if there isn't a JSON file stored
            //? I can't send back a CSV can I? I don't think the underlying data
            //? representing a CSV file is equivalent to a JSON object.
            //? You know, because of the schema definition.
            if (extensions.includes("json"))
                retValue = retValue.filter((myFile => myFile.name == (args.matchName + ".json")));

            //// console.log(extensions);
        }

        return retValue;
    }
};