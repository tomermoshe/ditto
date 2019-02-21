#!/bin/bash

if [ "$EUID" -ne 0 ]
  then echo "Please run as root"
  exit
fi

if [ $# -eq 0 ]
  then
    echo "Please provide installation folder as an argument"
    exit
fi

INSTALL_FOLDER="$1"

if [ -d "$INSTALL_FOLDER"/ditto ]; then
    rm -rf "$INSTALL_FOLDER"/ditto
fi

mkdir "$INSTALL_FOLDER"/ditto
if [ ! -d "$INSTALL_FOLDER"/ditto-mongo ]; then
  mkdir "$INSTALL_FOLDER"/ditto-mongo
  mkdir "$INSTALL_FOLDER"/ditto-mongo/data
  mkdir "$INSTALL_FOLDER"/ditto-mongo/data/db
fi

docker load --input docker_images/simulations-manager.tar
docker load --input docker_images/web-client.tar
docker load --input docker_images/socat.tar
docker load --input docker_images/mongo.tar

sed -i -e "s:\${INSTALL_FOLDER}:$INSTALL_FOLDER:" scripts/ditto-run
sed -i -e "s:\${INSTALL_FOLDER}:$INSTALL_FOLDER:" scripts/docker-compose-stack.yml


cp scripts/docker-compose-stack.yml "$INSTALL_FOLDER"/ditto
cp -f scripts/ditto-run /usr/local/bin
cp -f scripts/ditto-stop /usr/local/bin

rm -rf docker_images
rm -rf scripts
rm install.sh

chmod -R a+rwX "$INSTALL_FOLDER"/ditto
chmod -R a+rwX "$INSTALL_FOLDER"/ditto-mongo




