# Takes in every CSV file from a folder and converts it to an equivalent JSON
# Ideally, this would instead pull all the CSVs stored in a DigitalOcean folder
# and convert those into JSONs and then dump the JSONs back into DigitalOcean.

import boto3
from botocore.client import Config

# Making a Spaces session.
mySession = boto3.session.Session()

# Client needs t
client = mySession.client('s3',
                        region_name='nyc3',
                        endpoint_url='https://nyc3.digitaloceanspaces.com',
                        aws_access_key_id='532SZONTQ6ALKBCU94OU',
                        aws_secret_access_key='zCkY83KVDXD8u83RouEYPKEm/dhPSPB45XsfnWj8fxQ')

# Create a new Space.
client.create_bucket(Bucket='my-new-space')

# List all buckets on your account.
response = client.list_buckets()
spaces = [space['Name'] for space in response['Buckets']]
print("Spaces List: %s" % spaces)

"""
Runs the conversion of CSVs stored on DigitalOcean into JSONs.
"""
def conversion():
    pass

if __name__ == "__main__":
    conversion()