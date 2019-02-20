#!/bin/bash

if [ "$EUID" -ne 0 ]
  then echo "Please run as root"
  exit
fi

if [ -d "~/ditto" ]; then
    rm -rf ~/ditto
fi
mkdir ~/ditto
if [ ! -d "~/ditto-mongo" ]; then
  mkdir ~/ditto-mongo
  mkdir ~/ditto-mongo/data
  mkdir ~/ditto-mongo/data/db
fi

docker load --input docker_images/simulations-manager.tar
docker load --input docker_images/web-client.tar
docker load --input docker_images/socat.tar
docker load --input docker_images/mongo.tar

cp scripts/docker-compose-stack.yml ~/ditto
cp -f scripts/ditto-run /usr/local/bin
cp -f scripts/ditto-stop /usr/local/bin

rm -rf docker_images
rm -rf scripts
rm install.sh

chmod -R a+rwX ~/ditto
chmod -R a+rwX ~/ditto-mongo




