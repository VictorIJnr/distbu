#!/bin/bash

# Before this can be used to run the server the following command has to be run
# mv /tempbu/* .; rm -rf /tempbu
# This is to overcome the fact that the bind mount overwrites the destination directory

docker stop distQL
docker container run -itp 20794:20794 --rm --name distQL \
    --mount type=bind,src=$(pwd)/graphql-server/,dst=/distbu \
    victorijnr/distql:dev