#!/bin/bash

# Rebuilds the docker container if any changes are made to the GraphQL server.
# I could rewrite the Dockerfile such that I could use a bind mount instead.
# This way is perfectly fine for now though.
docker stop distQL
docker image build -t victorijnr/distql .
docker image push victorijnr/distql

docker container run -d -p 20794:20794 --name distQL --rm victorijnr/distql
docker container ls --all