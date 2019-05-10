let AWS = require('aws-sdk');

let config = require("./config/docean.json");
// let config = require("../../config/docean.json");

let myDigiRegion = config.digiRegion;
let myDigiSpace = config.digiSpace;
let myDigiOceanKey = config.digiKey;
let myDigiSecret = config.digiSecret;
let myDigiPoint = new AWS.Endpoint(`${myDigiRegion}.digitaloceanspaces.com/`);

module.exports = {
    s3: new AWS.S3({
            endpoint: myDigiPoint,
            accessKeyId: myDigiOceanKey,
            secretAccessKey: myDigiSecret
        }),
    myDigiSpace
};