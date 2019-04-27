# Takes in every CSV file from a folder and converts it to an equivalent JSON
# Ideally, this would instead pull all the CSVs stored in a DigitalOcean folder
# and convert those into JSONs and then dump the JSONs back into DigitalOcean.

#pylint: disable=import-error
import json
import os

import boto3

from pprint import pprint

from botocore.client import Config

serverPath = os.path.dirname(os.path.realpath(__file__))

"""
Runs the conversion of CSVs stored on DigitalOcean into JSONs.
"""
def conversion():
    digiConfig = getConfig()
    digiClient = digiConnect()

    pprint(digiClient.list_objects_v2(Bucket=digiConfig["digiSpace"])["Contents"])

"""
Loads the DigitalOcean config file into memory so I can connect to DigiOcean. 
Well, to my Space in particular
"""
def getConfig():
    with open(os.path.join("..", "..", "config", "docean.json"), "r") as configJSON:
        return json.load(configJSON)

"""
Connects to DigitalOcean and returns the resulting client suitable for requests.
"""
def digiConnect():
    digiConfig = getConfig()
    endpoint = f"https://{digiConfig['digiRegion']}.digitaloceanspaces.com/"
    
    mySession = boto3.session.Session()
    digiClient = mySession.client("s3", 
                    region_name=digiConfig["digiRegion"],
                    endpoint_url=endpoint,
                    aws_access_key_id=digiConfig["digiKey"],
                    aws_secret_access_key=digiConfig["digiSecret"])

    # List all buckets on your account.
    # response = client.list_buckets()
    # spaces = [space['Name'] for space in response['Buckets']]
    # print("Spaces List: %s" % spaces)

    return digiClient

if __name__ == "__main__":
    conversion()