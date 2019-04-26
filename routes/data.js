let express = require("express");
let router = express.Router();
let path = require("path");
let fs = require("fs");
let request = require("request");
let AWS = require('aws-sdk');

let myDigiRegion = "nyc3";
let myDigiSpace = "distbu";
let myDigiOceanKey = "WVXMXAZGXWSAPE6PNBTU";
let myDigiSecret = "4HhQJtzuam1k9DWF9RY4h8r+BMCLZ29ug1Ki8IQZUCc";
let myDigiPoint = new AWS.Endpoint(`${myDigiRegion}.digitaloceanspaces.com/`);

let s3 = new AWS.S3({
    endpoint: myDigiPoint,
    accessKeyId: myDigiOceanKey,
    secretAccessKey: myDigiSecret
});

/**
* Index to yeet back a list of files stored on DigitalOcean
* It's actually a little bit more than that because I don't do any pre-processing
* but it's fine. Trust me. You know what, I'm getting rid of that useless loop.
*
* UPDATE: It's Friday the 26th of April 2019, I haven't worked on this in a while
* but it looks like I got rid of "that useless loop". 
*/
router.get("/", function(req, res) {
    let digiParams = {
        Bucket: myDigiSpace
    }

    s3.listObjectsV2(digiParams, (err, data) => {
        if (err) res.send(err);
        else res.send(data);
    });
});

/**
 * Retrieves a specified dataset from the database where it's stored.
 */
router.get("/:dataset/:type", function(req, res) {
    let digiParams = {
        Bucket: myDigiSpace,
        Key: `data/${req.params.dataset}/${req.params.type}`,
        ResponseContentType: "application/json"
    }

    getFile(req.params.dataset, req.params.type)
    .then((data) => {
        /**
        * I don't know what was wrong with me the last time I was working on this.
        * First "choo choo", now "la la". Maybe I was having a breakdown or something.
        * Idk but they're staying here forever now. Why? Because I said so. 
        * 
        * 26th April: Yeah imma comment them out though. Sorry.
        */

        /* console.log("la la");
        console.log(data);
        console.log("transed");
        console.log(data.Body); */
        res.send(JSON.parse(data.Body));
    })
    .catch((err) => res.send(err));
});

function getFile(dataset, file) {
    let digiParams = {
        Bucket: myDigiSpace
    }

    console.log(`Requesting:\t${dataset}/${file}`);
    
    let slippy = new Promise((resolve, reject) => {
        getFileType(dataset, file)
        .then((extension) => {
            /**
            * I stopped working on this for a month and a half. 
            * I came back, ran distbu, requested train.json (standard)
            * then I saw "choo choo" in the console. NGL I thought it was 
            * pretty funny. 
            */
            console.log("choo choo");
            digiParams.Key = `data/${dataset}/${file}.${extension}`;
            s3.getObject(digiParams, (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        })
        .catch((err) => reject(err));
    }); 

    return slippy;
}

/**
* Gets the extension for the requested file.
* @param {String} dataset the dataset to pull the file from 
* @param {String} fileName the file to be retrieved from that dataset
*/
function getFileType(dataset, fileName) {
    let digiParams = {
        Bucket: myDigiSpace,
        StartAfter: `data/${dataset}`
    };

    let typePromise = new Promise((resolve, reject) => {
        s3.listObjectsV2(digiParams, (err, data) => {
            if (err) res.send(err);
            else {
                let extension;
                data.Contents.forEach(file => {
                    //Omitting folders (also any empty file)
                    if (file.Size != 0) {
                        let name = file.Key.substring(file.Key.lastIndexOf("/") + 1);
                        if (name.substring(0, name.lastIndexOf(".")) === fileName)
                            extension = name.substring(name.lastIndexOf(".") + 1);
                    } 
                });

                console.log(`File Extension:\t${extension}`);
                if (extension) resolve(extension);
                else reject("File not found");
            }
        });
    });

    
    return typePromise;
}

function sendError(message) {
    let error = {
        msg: message,
        status: 400
    };

    return error;
}

module.exports = router;