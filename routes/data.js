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

router.get("/", function(req, res) {
    let digiParams = {
        Bucket: myDigiSpace
    }

    s3.listObjectsV2(digiParams, (err, data) => {
        if (err) res.send(err);
        else {
            files = [];
            data.Contents.forEach(file => {
                //Omitting folders (also any empty file)
                if (file.Size != 0) {
                    let fileName = file.Key.substring(file.Key.lastIndexOf("/") + 1);
                    console.log(fileName);
                } 
            });

            res.send(data);
        }
    });
});

router.get("/:dataset/:type", function(req, res) {
    let digiParams = {
        Bucket: myDigiSpace,
        Key: `data/${req.params.dataset}/${req.params.type}`,
        ResponseContentType: "application/json"
    }

    s3.getObject(digiParams, (err, data) => {
        if (err) res.send(err);
        else {
            console.log(JSON.parse(data.Body));
            res.send(data)};
    });

   /*  getFile(req.params.dataset, req.params.type)
    .then((data) => {
        console.log("la la")
        res.send(data)
    })
    .catch((err) => res.send(err)); */
});

function getFile(dataset, file) {
    let digiParams = {
        Bucket: myDigiSpace
    }
    
    let slippy = new Promise((resolve, reject) => {
        getFileType(dataset, file)
        .then((extension) => {
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

                        console.log(name.substring(0, name.lastIndexOf(".")));

                        if (name.substring(0, name.lastIndexOf(".")) === fileName)
                            extension = name.substring(name.lastIndexOf(".") + 1);
                    } 
                });

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